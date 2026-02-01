const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LOVABLE_API_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

async function callLovableAI(apiKey: string, systemPrompt: string, userPrompt: string): Promise<string> {
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
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Lovable AI error:', errorText);
    throw new Error('AI request failed');
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

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
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = `You are a world-class academic research agent specializing in international university admissions and scholarships.

CRITICAL SOURCE REQUIREMENTS:
- ONLY provide information from OFFICIAL sources: government websites (.gov), educational institutions (.edu), and verified organizational websites (.org)
- ALL URLs must point to official university admissions pages, government scholarship portals, or official program websites
- DO NOT include information from blogs, forums, or unofficial aggregator sites
- Include the OFFICIAL source URL for each scholarship/program

ACCURACY GUIDELINES:
- Provide the most current information you have from official sources
- If deadline dates may have changed, note this clearly
- Include official application portals only
- Mention if users should verify current deadlines on official websites

CRITICAL: Return your response EXACTLY as valid JSON (no markdown, no backticks, just raw JSON).

Use this structure:
{
  "universities": [
    {
      "university": "University Name",
      "country": "Country",
      "website": "https://official-university-website.edu",
      "requirements_url": "https://official-admissions-page.edu/requirements",
      "min_cgpa": "3.0",
      "notes": "Any relevant notes",
      "official_source": "Name of official source (e.g., 'University Admissions Office', 'DAAD Germany')",
      "scholarships": [
        {
          "name": "Scholarship Name",
          "university": "University Name",
          "country": "Country",
          "level": "Masters/PhD/Undergraduate",
          "eligibility": "Brief eligibility criteria",
          "funding": "Fully Funded / Partial / Tuition Only",
          "deadline": "Deadline date or 'Rolling' - verify on official site",
          "url": "https://official-application-portal.edu/apply",
          "intake_cycle": "Fall/Spring",
          "source_type": "gov/edu/org"
        }
      ]
    }
  ],
  "summary": "Brief summary with reminder to verify details on official websites",
  "verification_note": "Data sourced from official .gov/.edu/.org websites. Always verify current deadlines and requirements on official portals."
}

Provide 3-5 relevant results from verified official sources only.`;

    const userPrompt = `Find scholarship opportunities for: ${query}. Focus on current, active opportunities.`;

    console.log('AI Research Query:', query, 'Type:', type);

    const content = await callLovableAI(apiKey, systemPrompt, userPrompt);

    let parsed;
    try {
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
