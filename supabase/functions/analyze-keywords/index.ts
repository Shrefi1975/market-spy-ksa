import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url, description, location } = await req.json();
    
    console.log('Analyzing keywords for:', { url, description, location });

    const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    let websiteContent = '';
    let websiteMetadata = null;
    
    // If URL is provided, scrape the website using Firecrawl
    if (url && FIRECRAWL_API_KEY) {
      console.log('Scraping website with Firecrawl...');
      try {
        let formattedUrl = url.trim();
        if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
          formattedUrl = `https://${formattedUrl}`;
        }

        const scrapeResponse = await fetch('https://api.firecrawl.dev/v1/scrape', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: formattedUrl,
            formats: ['markdown', 'html'],
            onlyMainContent: true,
          }),
        });

        if (scrapeResponse.ok) {
          const scrapeData = await scrapeResponse.json();
          websiteContent = scrapeData.data?.markdown || scrapeData.markdown || '';
          websiteMetadata = scrapeData.data?.metadata || scrapeData.metadata || null;
          console.log('Website scraped successfully, content length:', websiteContent.length);
        } else {
          console.log('Firecrawl scrape failed, continuing with AI analysis only');
        }
      } catch (scrapeError) {
        console.log('Error scraping website:', scrapeError);
      }
    }

    // Enhanced AI Agent for MarketMaw - Specialized in Saudi Market Keywords
    const systemPrompt = `أنت وكيل ذكاء اصطناعي متخصص ومتقدم في توليد واستراتيجيات الكلمات المفتاحية لمنصة MarketMaw (https://marketmaw.lovable.app/).

🎯 هويتك ومهمتك الأساسية:
أنت خبير SEO محترف متخصص في السوق السعودي والخليجي مع خبرة 20+ سنة. تعمل كمستشار استراتيجي لأكبر الشركات السعودية وتفهم سلوك المستهلك السعودي بعمق شديد.

مهمتك: ضمان أن كل عميل يتلقى محتوى كلمات مفتاحية متجدِّد، ذكي، وفعّال يُحسِّن باستمرار ظهور موقعه في نتائج محركات البحث.

📊 استراتيجية توليد الكلمات المفتاحية:

1️⃣ البيانات والاتجاهات:
- استخدم أحدث بيانات البحث واتجاهات السوق السعودي
- تابع الأحداث الحالية والمناسبات القادمة
- راقب تحولات سلوك المستهلك السعودي

2️⃣ نوايا البحث (Search Intent) - ركز على الأعلى تحويلاً:
- 🔵 Informational: يبحث عن معلومات ("كيف", "ما هو", "أفضل طريقة")
- 🟢 Commercial: يقارن قبل الشراء ("أفضل", "مقارنة", "مراجعة")
- 🔴 Transactional: جاهز للشراء الآن ("اشتري", "سعر", "عرض", "احجز")
- 🟡 Navigational: يبحث عن علامة تجارية محددة

3️⃣ تنوع وتجديد الكلمات:
- لا تكرر نفس الاقتراحات أبداً
- قدم كلمات جديدة ومبتكرة في كل تحليل
- امزج بين الكلمات العامة والطويلة والمحلية

4️⃣ مستويات المنافسة المناسبة:
- للمواقع الجديدة: كلمات منافسة منخفضة (Long-tail)
- للمواقع المتوسطة: مزيج من المنخفضة والمتوسطة
- للمواقع الكبيرة: استهداف الكلمات التنافسية العالية

5️⃣ اقتراحات تحسين المحتوى:
- عناوين فرعية مقترحة (H2, H3)
- أسئلة شائعة يجب تغطيتها (FAQ)
- نقاط محورية للمحتوى
- توصيات الروابط الداخلية والخارجية

📈 معايير البيانات الواقعية:

حجم البحث (السوق السعودي - 35 مليون نسمة):
- كلمات رئيسية عامة: 10,000 - 100,000 بحث/شهر
- كلمات متوسطة: 1,000 - 10,000 بحث/شهر
- كلمات طويلة (Long-tail): 100 - 1,000 بحث/شهر
- كلمات متخصصة: 10 - 100 بحث/شهر

💰 تكلفة النقرة (CPC) بالريال السعودي:
- منخفضة: 0.50 - 2.00 ر.س
- متوسطة: 2.00 - 8.00 ر.س
- مرتفعة: 8.00 - 25.00 ر.س
- تنافسية جداً: 25.00 - 50.00+ ر.س

🗓️ المواسم والأحداث السعودية المهمة:
- رمضان والعيد (ذروة الإنفاق الأولى)
- اليوم الوطني السعودي (23 سبتمبر)
- يوم التأسيس (22 فبراير)
- موسم الرياض (أكتوبر - مارس)
- الجمعة البيضاء/السوداء (نوفمبر)
- موسم الحج والعمرة
- العودة للمدارس (أغسطس - سبتمبر)
- رؤية 2030 والمشاريع الكبرى

🔍 تحليل المنافسين الإلزامي:
- حدد أهم 3-5 منافسين في نفس المجال والمنطقة
- اذكر أسماء الشركات/المؤسسات الحقيقية
- حلل نقاط القوة والضعف لكل منافس
- اقترح كيفية التفوق عليهم

⚠️ قواعد صارمة:
- كل تفاعل = خطوة تراكمية نحو تحسين دائم
- لا تقدم قوائم ثابتة، بل استراتيجيات متطورة
- استخدم اللهجة السعودية عند الحاجة
- قدم بيانات واقعية 100% مبنية على السوق الفعلي
- راعِ خصوصية الثقافة والدين في السعودية

قدم النتائج بتنسيق JSON فقط بدون أي نص إضافي.`;

    const userPrompt = `🎯 تحليل استراتيجي متقدم لموقع/نشاط تجاري في السوق السعودي:

📌 معلومات الموقع المستهدف:
${url ? `- رابط الموقع: ${url}` : ''}
${description ? `- وصف النشاط التجاري: ${description}` : ''}
- المنطقة الجغرافية المستهدفة: ${location || 'جميع أنحاء السعودية'}
${websiteMetadata ? `- عنوان الموقع: ${websiteMetadata.title || 'غير متوفر'}` : ''}
${websiteMetadata ? `- وصف الموقع الحالي: ${websiteMetadata.description || 'غير متوفر'}` : ''}

${websiteContent ? `📄 محتوى الموقع المستخرج:\n${websiteContent.substring(0, 6000)}` : ''}

📋 المطلوب - قدم تحليلاً استراتيجياً شاملاً بتنسيق JSON:
{
  "keywords": [
    {
      "keyword": "الكلمة المفتاحية بالعربية (استخدم اللهجة السعودية إن مناسب)",
      "seoTitle": "عنوان SEO جذاب ومحسن (أقل من 60 حرف) يتضمن الكلمة المفتاحية",
      "metaDescription": "وصف ميتا احترافي يحفز النقر (أقل من 155 حرف) مع دعوة واضحة للعمل",
      "searchVolume": 8500,
      "competition": "low|medium|high",
      "cpc": 3.50,
      "trend": "up|down|stable",
      "searchIntent": "commercial|informational|transactional|navigational",
      "difficulty": "beginner|intermediate|advanced",
      "seoNotes": "نصائح SEO تفصيلية: عناوين فرعية مقترحة، أسئلة FAQ، روابط داخلية مقترحة، نوع المحتوى المناسب"
    }
  ],
  "analysis": {
    "marketOverview": "تحليل شامل وعميق للسوق السعودي في هذا المجال مع إحصائيات ورؤى استراتيجية (150-200 كلمة)",
    "opportunities": [
      "فرصة 1: وصف تفصيلي مع كيفية استغلالها",
      "فرصة 2: وصف تفصيلي مع كيفية استغلالها",
      "فرصة 3: وصف تفصيلي مع كيفية استغلالها"
    ],
    "recommendations": [
      "توصية 1: خطوات تنفيذية واضحة",
      "توصية 2: خطوات تنفيذية واضحة",
      "توصية 3: خطوات تنفيذية واضحة"
    ],
    "seasonalTips": [
      "موسم/حدث 1: استراتيجية محددة مع التوقيت",
      "موسم/حدث 2: استراتيجية محددة مع التوقيت"
    ],
    "contentSuggestions": {
      "headings": ["عنوان H2 مقترح 1", "عنوان H2 مقترح 2", "عنوان H2 مقترح 3"],
      "faq": ["سؤال شائع 1؟", "سؤال شائع 2؟", "سؤال شائع 3؟"],
      "keyPoints": ["نقطة محورية 1", "نقطة محورية 2", "نقطة محورية 3"]
    },
    "targetAudience": "وصف دقيق للجمهور المستهدف (العمر، الجنس، الاهتمامات، السلوك الشرائي، المنطقة)",
    "competitors": [
      {
        "name": "اسم الشركة/المؤسسة المنافسة الحقيقية في السعودية",
        "website": "رابط موقعهم",
        "location": "المدينة/المنطقة",
        "strengths": "نقاط القوة التفصيلية",
        "weaknesses": "نقاط الضعف التي يمكن استغلالها",
        "marketShare": "تقدير حصتهم السوقية"
      }
    ],
    "competitorStrategy": "استراتيجية مقترحة للتفوق على المنافسين"
  }
}

⚠️ ملاحظات مهمة:
- قدم 12-18 كلمة مفتاحية متنوعة (رئيسية، طويلة، محلية، نية شراء)
- حدد 3-5 منافسين حقيقيين في السوق السعودي في نفس المجال والمنطقة
- اذكر أسماء شركات/مؤسسات حقيقية ومعروفة
- كل كلمة مفتاحية يجب أن تكون فريدة ومختلفة
- قدم اقتراحات محتوى عملية وقابلة للتنفيذ`;
    console.log('Calling Lovable AI (gemini-2.5-pro) for advanced analysis...');

    // Use the more powerful model for better analysis
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-pro',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'تم تجاوز حد الطلبات، يرجى المحاولة لاحقاً' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'يرجى إضافة رصيد لحسابك' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await aiResponse.text();
      console.error('AI gateway error:', aiResponse.status, errorText);
      throw new Error(`AI gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content || '';
    
    console.log('AI response received, parsing...');

    // Parse JSON from AI response
    let result;
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      console.log('Raw AI response:', content);
      throw new Error('فشل في تحليل نتائج الذكاء الاصطناعي');
    }

    console.log('Analysis completed successfully with', result.keywords?.length || 0, 'keywords');

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: result,
        scrapedUrl: url || null,
        websiteTitle: websiteMetadata?.title || null
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-keywords function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'حدث خطأ غير متوقع' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
