import { corsHeaders, authenticateRequest, checkToolAccess, recordToolUsage } from '../_shared/auth.ts';
import { validateString, sanitizeForPrompt } from '../_shared/validation.ts';

const LOVABLE_API_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
const TOOL_TYPE = 'accreditation';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate user
    const { user, supabaseClient, isPremium } = await authenticateRequest(req);

    // Check tool access
    const accessCheck = await checkToolAccess(supabaseClient, user.id, TOOL_TYPE, isPremium);
    if (!accessCheck.allowed) {
      return new Response(
        JSON.stringify({ error: accessCheck.reason }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse and validate input
    const body = await req.json();
    
    const universityValidation = validateString(body.university, 'university', { maxLength: 200 });
    if (!universityValidation.valid) {
      return new Response(
        JSON.stringify({ error: universityValidation.error?.message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const university = sanitizeForPrompt(universityValidation.value!);

    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = `You are an expert on international university accreditation, specifically for HEC Pakistan (Higher Education Commission) recognition.

Check if the given university is recognized by HEC Pakistan for foreign degree equivalence.

CRITICAL: Return your response as valid JSON only (no markdown, no backticks).

Use this structure:
{
  "university": "Full University Name",
  "country": "Country",
  "status": "Recognized" | "Not Recognized" | "Conditional",
  "category": "W (World Ranking) / X / Y / Z or equivalent",
  "verification_details": "Detailed explanation of recognition status",
  "warning_notes": "Any important warnings or conditions (optional)"
}

Be accurate and provide realistic information about HEC recognition status.`;

    console.log('HEC Check:', university, 'User:', user.id);

    const response = await fetch(LOVABLE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Check HEC Pakistan recognition status for: "${university}". Provide verification details.` }
        ],
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', errorText);
      return new Response(
        JSON.stringify({ error: 'AI service request failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Record usage for non-premium users
    await recordToolUsage(supabaseClient, user.id, TOOL_TYPE, isPremium);

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    let parsed;
    try {
      const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/) || content.match(/```\n?([\s\S]*?)\n?```/);
      const jsonStr = jsonMatch ? jsonMatch[1].trim() : content.trim();
      parsed = JSON.parse(jsonStr);
    } catch {
      parsed = { university, country: 'Unknown', status: 'Not Recognized', verification_details: content };
    }

    return new Response(
      JSON.stringify(parsed),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in hec-verification:', error);
    
    const message = error instanceof Error ? error.message : 'Verification failed';
    const status = message.includes('Unauthorized') ? 401 : 500;
    
    return new Response(
      JSON.stringify({ error: message }),
      { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
