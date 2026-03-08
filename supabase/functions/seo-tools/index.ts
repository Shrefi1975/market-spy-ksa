import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const toolPrompts: Record<string, (body: any) => { system: string; user: string }> = {
  'keyword-generator': (body) => ({
    system: `أنت خبير SEO متخصص في توليد الكلمات المفتاحية. قدم النتائج بتنسيق JSON فقط.`,
    user: `ولّد 20-30 كلمة مفتاحية للموضوع: "${body.topic}"
الدولة: ${body.countryNameAr || body.country}
العملة: ${body.countryCurrencySymbol || '$'}
${body.intent !== 'all' ? `نية البحث المطلوبة: ${body.intent}` : ''}

أرجع JSON بالشكل:
{
  "keywords": [
    {
      "keyword": "الكلمة",
      "searchVolume": 5000,
      "competition": "low|medium|high",
      "cpc": 2.5,
      "trend": "up|down|stable",
      "searchIntent": "informational|commercial|transactional|navigational",
      "difficulty": "سهل|متوسط|صعب"
    }
  ]
}
قدم كلمات متنوعة: رئيسية، طويلة الذيل، أسئلة، دلالية. أرقام البحث تقديرية منطقية.`
  }),

  'keyword-difficulty': (body) => ({
    system: `أنت خبير SEO متخصص في تقييم صعوبة الكلمات المفتاحية. قدم النتائج بتنسيق JSON فقط.`,
    user: `قيّم صعوبة التصدر للكلمة: "${body.keyword}" في ${body.countryNameAr || 'السوق العربي'}

أرجع JSON بالشكل:
{
  "score": 45,
  "factors": [
    { "name": "منافسة SERP", "score": 60 },
    { "name": "قوة المحتوى المنافس", "score": 50 },
    { "name": "صعوبة الباكلينك", "score": 40 },
    { "name": "المنافسة الدلالية", "score": 35 },
    { "name": "طول الكلمة المفتاحية", "score": 20 }
  ],
  "recommendations": ["توصية 1", "توصية 2", "توصية 3"]
}`
  }),

  'search-intent': (body) => ({
    system: `أنت خبير SEO متخصص في تصنيف نية البحث. قدم النتائج بتنسيق JSON فقط.`,
    user: `صنّف نية البحث لهذه الكلمات المفتاحية:
${body.keywords.map((k: string) => `- ${k}`).join('\n')}

أرجع JSON بالشكل:
{
  "results": [
    {
      "keyword": "الكلمة",
      "intent": "informational|commercial|transactional|navigational",
      "explanation": "شرح موجز لسبب التصنيف"
    }
  ]
}`
  }),

  'article-outline': (body) => ({
    system: `أنت كاتب محتوى SEO محترف. قدم النتائج بتنسيق JSON فقط.`,
    user: `أنشئ هيكل مقال محسّن لـ SEO للكلمة: "${body.keyword}" باللغة ${body.language === 'ar' ? 'العربية' : 'الإنجليزية'}

أرجع JSON بالشكل:
{
  "seoTitle": "عنوان SEO أقل من 60 حرف",
  "metaDescription": "وصف ميتا أقل من 155 حرف",
  "sections": [
    {
      "heading": "عنوان H2",
      "subheadings": ["عنوان H3", "عنوان H3"],
      "keyPoints": "ملخص المحتوى المطلوب"
    }
  ],
  "relatedTopics": ["موضوع 1", "موضوع 2"],
  "targetWordCount": 2000
}`
  }),

  'meta-tags': (body) => ({
    system: `أنت خبير SEO on-page. قدم النتائج بتنسيق JSON فقط.`,
    user: `ولّد وسوم ميتا للكلمة/الموضوع: "${body.keyword}"

أرجع JSON بالشكل:
{
  "suggestions": [
    {
      "title": "عنوان SEO (أقل من 60 حرف)",
      "description": "وصف ميتا (أقل من 155 حرف)",
      "slug": "slug-مقترح"
    }
  ],
  "schema": {
    "@context": "https://schema.org",
    "@type": "Article",
    "name": "...",
    "description": "..."
  }
}
قدم 3 اقتراحات مختلفة.`
  }),

  'ecommerce-keywords': (body) => ({
    system: `أنت خبير SEO متخصص في التجارة الإلكترونية. قدم النتائج بتنسيق JSON فقط.`,
    user: `ولّد كلمات مفتاحية للمنتج: "${body.product}"
المنصة: ${body.platform}
الدولة: ${body.countryNameAr || body.country}

أرجع JSON بالشكل:
{
  "productKeywords": [
    { "keyword": "...", "searchVolume": 5000, "competition": "low|medium|high", "intent": "شرائي" }
  ],
  "categoryKeywords": [
    { "keyword": "...", "searchVolume": 3000, "competition": "low|medium|high", "intent": "تصفحي" }
  ],
  "descriptionKeywords": [
    { "keyword": "...", "searchVolume": 1000, "competition": "low|medium|high", "intent": "معلوماتي" }
  ]
}
قدم 8-12 كلمة لكل فئة.`
  }),

  'content-brief': (body) => ({
    system: `أنت استراتيجي محتوى SEO محترف. قدم النتائج بتنسيق JSON فقط.`,
    user: `أنشئ موجز محتوى شامل للكلمة: "${body.keyword}"

أرجع JSON بالشكل:
{
  "primaryKeyword": "...",
  "secondaryKeywords": ["كلمة 1", "كلمة 2", "كلمة 3"],
  "suggestedHeadings": ["عنوان H2 مقترح 1", "عنوان H2 مقترح 2"],
  "competitorTopics": ["موضوع يغطيه المنافسون 1", "موضوع 2"],
  "faqs": ["سؤال شائع 1؟", "سؤال شائع 2؟"],
  "targetWordCount": 2500,
  "readingLevel": "متوسط",
  "contentType": "مقال تعليمي"
}`
  }),

  'seo-strategy': (body) => ({
    system: `أنت استشاري SEO متمرس. قدم النتائج بتنسيق JSON فقط.`,
    user: `أنشئ استراتيجية SEO كاملة:
المجال: ${body.niche}
السوق: ${body.market || 'عام'}
الهدف: ${body.goal}

أرجع JSON بالشكل:
{
  "keywordRoadmap": [
    {
      "phase": "المرحلة 1 - الأساس (الشهر 1-2)",
      "description": "وصف",
      "keywords": ["كلمة 1", "كلمة 2"]
    }
  ],
  "contentCalendar": [
    { "week": "الأسبوع 1", "title": "عنوان المقال", "type": "مقال" }
  ],
  "growthStrategy": ["خطوة 1", "خطوة 2"]
}
قدم 3-4 مراحل و8-12 عنصر في تقويم المحتوى.`
  }),
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY is not configured');

    const body = await req.json();
    const { tool } = body;

    if (!tool || !toolPrompts[tool]) {
      return new Response(
        JSON.stringify({ error: 'أداة غير معروفة' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const prompts = toolPrompts[tool](body);

    console.log(`SEO Tool: ${tool} - Processing...`);

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: prompts.system },
          { role: 'user', content: prompts.user },
        ],
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: 'تم تجاوز حد الطلبات، يرجى المحاولة لاحقاً' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: 'يرجى إضافة رصيد للاستمرار' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
      const errorText = await aiResponse.text();
      console.error('AI error:', aiResponse.status, errorText);
      throw new Error('AI gateway error');
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content || '';

    // Parse JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('No JSON found in AI response:', content.substring(0, 500));
      throw new Error('Failed to parse AI response');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    console.log(`SEO Tool: ${tool} - Success`);

    return new Response(
      JSON.stringify(parsed),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('SEO tools error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'حدث خطأ غير متوقع' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
