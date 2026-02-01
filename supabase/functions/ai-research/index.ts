const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LOVABLE_API_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, type = 'scholarships' } = await req.json();

    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) {
      console.error('LOVABLE_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = `You are a world-class academic research agent specializing in international university admissions and scholarships.
Your task is to provide accurate, helpful data based on the user's query.
Focus on: Fully funded scholarships, CGPA requirements, eligibility criteria, and deadlines.

CRITICAL: Return your response EXACTLY as valid JSON (no markdown, no backticks, just raw JSON).

For scholarship searches, use this structure:
{
  "universities": [
    {
      "university": "University Name",
      "country": "Country",
      "website": "https://...",
      "requirements_url": "https://...",
      "min_cgpa": "3.0",
      "notes": "Any relevant notes",
      "scholarships": [
        {
          "name": "Scholarship Name",
          "university": "University Name",
          "country": "Country",
          "level": "Masters/PhD/Undergraduate",
          "eligibility": "Brief eligibility criteria",
          "funding": "Fully Funded / Partial / Tuition Only",
          "deadline": "Deadline date or 'Rolling'",
          "url": "Application URL",
          "intake_cycle": "Fall/Spring"
        }
      ]
    }
  ],
  "summary": "Brief summary of findings"
}

Provide realistic, helpful information. Include 3-5 relevant results.`;

    console.log('AI Research Query:', query, 'Type:', type);

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
          { role: 'user', content: `Find scholarship opportunities for: ${query}. Focus on current, active opportunities.` }
        ],
        temperature: 0.3,
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

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    // Parse the JSON response
    let parsed;
    try {
      // Handle potential markdown wrapping
      const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/) || content.match(/```\n?([\s\S]*?)\n?```/);
      const jsonStr = jsonMatch ? jsonMatch[1].trim() : content.trim();
      parsed = JSON.parse(jsonStr);
    } catch (e) {
      console.error('JSON parsing error:', e, 'Content:', content);
      parsed = { universities: [], summary: content };
    }

    return new Response(
      JSON.stringify(parsed),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in ai-research:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Research failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
