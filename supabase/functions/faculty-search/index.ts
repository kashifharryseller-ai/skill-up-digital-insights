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
    const { university, topic } = await req.json();

    if (!university || !topic) {
      return new Response(
        JSON.stringify({ error: 'University and topic are required' }),
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

    const systemPrompt = `You are a faculty research and academic networking expert.
Find professors or researchers based on the user's query.

CRITICAL: Return your response as valid JSON only (no markdown, no backticks).

Use this structure:
{
  "professors": [
    {
      "name": "Professor Name",
      "title": "Associate Professor / Full Professor / etc",
      "university": "University Name",
      "department": "Department Name",
      "research_area": "Main research focus",
      "email": "email@university.edu (if typically public)",
      "profile_url": "Faculty profile URL",
      "linkedin_url": "LinkedIn URL if available",
      "summary": "Brief bio and research interests",
      "recent_publications": ["Publication 1", "Publication 2"],
      "active_projects": ["Project 1", "Project 2"]
    }
  ],
  "summary": "Brief overview of findings"
}

Provide 3-5 realistic faculty profiles matching the query.`;

    console.log('Faculty Search:', university, topic);

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
          { role: 'user', content: `Find faculty members at ${university} researching ${topic}. Include their contact info and recent work.` }
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

    let parsed;
    try {
      const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/) || content.match(/```\n?([\s\S]*?)\n?```/);
      const jsonStr = jsonMatch ? jsonMatch[1].trim() : content.trim();
      parsed = JSON.parse(jsonStr);
    } catch (e) {
      console.error('JSON parsing error:', e);
      parsed = { professors: [], summary: content };
    }

    return new Response(
      JSON.stringify(parsed),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in faculty-search:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Search failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
