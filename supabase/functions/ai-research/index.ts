const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

interface AIProvider {
  name: string;
  call: (systemPrompt: string, userPrompt: string) => Promise<string>;
}

async function callGemini(apiKey: string, systemPrompt: string, userPrompt: string): Promise<string> {
  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        { role: 'user', parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }
      ],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 4096,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gemini API error:', errorText);
    throw new Error('Gemini API request failed');
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

async function callDeepSeek(apiKey: string, systemPrompt: string, userPrompt: string): Promise<string> {
  const response = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'deepseek-r1-0528',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('DeepSeek API error:', errorText);
    throw new Error('DeepSeek API request failed');
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, type = 'scholarships', provider = 'gemini' } = await req.json();

    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const geminiKey = Deno.env.get('GEMINI_API_KEY');
    const deepseekKey = Deno.env.get('DEEPSEEK_API_KEY');

    if (!geminiKey && !deepseekKey) {
      console.error('No AI API keys configured');
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

    const userPrompt = `Find scholarship opportunities for: ${query}. Focus on current, active opportunities.`;

    console.log('AI Research Query:', query, 'Type:', type, 'Provider:', provider);

    let content: string;

    // Try DeepSeek first if requested and available, otherwise fall back to Gemini
    if (provider === 'deepseek' && deepseekKey) {
      try {
        content = await callDeepSeek(deepseekKey, systemPrompt, userPrompt);
      } catch (e) {
        console.log('DeepSeek failed, falling back to Gemini');
        if (geminiKey) {
          content = await callGemini(geminiKey, systemPrompt, userPrompt);
        } else {
          throw e;
        }
      }
    } else if (geminiKey) {
      try {
        content = await callGemini(geminiKey, systemPrompt, userPrompt);
      } catch (e) {
        console.log('Gemini failed, falling back to DeepSeek');
        if (deepseekKey) {
          content = await callDeepSeek(deepseekKey, systemPrompt, userPrompt);
        } else {
          throw e;
        }
      }
    } else if (deepseekKey) {
      content = await callDeepSeek(deepseekKey, systemPrompt, userPrompt);
    } else {
      throw new Error('No AI provider available');
    }

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
