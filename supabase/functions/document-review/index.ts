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
    const { document, targetUniversity, documentType = 'SOP' } = await req.json();

    if (!document) {
      return new Response(
        JSON.stringify({ error: 'Document content is required' }),
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

    const systemPrompt = `You are an expert academic advisor specializing in graduate school applications.
Review the submitted ${documentType} (Statement of Purpose / Research Proposal / Personal Statement) and provide detailed feedback.

CRITICAL: Return your response as valid JSON only (no markdown, no backticks).

Use this structure:
{
  "overall_score": 85,
  "academic_strength": "Analysis of academic credentials and achievements mentioned",
  "language_quality": "Assessment of writing quality, grammar, clarity",
  "structure_analysis": "Evaluation of document structure and flow",
  "strategic_recommendations": [
    "Recommendation 1",
    "Recommendation 2",
    "Recommendation 3"
  ],
  "improvement_areas": [
    "Area needing improvement 1",
    "Area needing improvement 2"
  ],
  "summary": "Overall assessment and key takeaways"
}

Be constructive, specific, and helpful. Score out of 100.`;

    console.log('Document Review - Type:', documentType, 'Target:', targetUniversity);

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
          { role: 'user', content: `Review this ${documentType} for application to ${targetUniversity || 'a top university'}:\n\n${document}` }
        ],
        temperature: 0.4,
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
    } catch {
      parsed = { overall_score: 70, summary: content, strategic_recommendations: [], improvement_areas: [] };
    }

    return new Response(
      JSON.stringify(parsed),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in document-review:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Review failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
