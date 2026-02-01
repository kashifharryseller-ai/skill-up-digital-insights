const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

async function callGemini(apiKey: string, systemPrompt: string, userPrompt: string): Promise<string> {
  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }],
      generationConfig: { temperature: 0.4, maxOutputTokens: 4096 },
    }),
  });
  if (!response.ok) throw new Error('Gemini API request failed');
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

async function callDeepSeek(apiKey: string, systemPrompt: string, userPrompt: string): Promise<string> {
  const response = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'deepseek-r1-0528',
      messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userPrompt }],
      temperature: 0.4,
    }),
  });
  if (!response.ok) throw new Error('DeepSeek API request failed');
  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { document, targetUniversity, documentType = 'SOP', provider = 'gemini' } = await req.json();

    if (!document) {
      return new Response(
        JSON.stringify({ error: 'Document content is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const geminiKey = Deno.env.get('GEMINI_API_KEY');
    const deepseekKey = Deno.env.get('DEEPSEEK_API_KEY');

    if (!geminiKey && !deepseekKey) {
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

    const userPrompt = `Review this ${documentType} for application to ${targetUniversity || 'a top university'}:\n\n${document}`;

    console.log('Document Review - Type:', documentType, 'Target:', targetUniversity, 'Provider:', provider);

    let content: string;
    if (provider === 'deepseek' && deepseekKey) {
      try {
        content = await callDeepSeek(deepseekKey, systemPrompt, userPrompt);
      } catch {
        if (geminiKey) content = await callGemini(geminiKey, systemPrompt, userPrompt);
        else throw new Error('DeepSeek failed and Gemini not available');
      }
    } else if (geminiKey) {
      try {
        content = await callGemini(geminiKey, systemPrompt, userPrompt);
      } catch {
        if (deepseekKey) content = await callDeepSeek(deepseekKey, systemPrompt, userPrompt);
        else throw new Error('Gemini failed and DeepSeek not available');
      }
    } else {
      content = await callDeepSeek(deepseekKey!, systemPrompt, userPrompt);
    }

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
