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

    // Enhanced system prompt for more accurate Saudi market analysis
    const systemPrompt = `أنت خبير SEO محترف متخصص في السوق السعودي والخليجي مع خبرة 15+ سنة. أنت تعمل كمستشار لأكبر الشركات السعودية وتفهم سلوك المستهلك السعودي بعمق.

🎯 مهمتك الرئيسية:
تحليل المواقع والأعمال التجارية بدقة عالية واقتراح كلمات مفتاحية مربحة وواقعية 100% للسوق السعودي.

📊 معايير اختيار الكلمات المفتاحية:
1. كلمات يبحث عنها المستخدم السعودي فعلياً (استخدم اللهجة السعودية عند الحاجة)
2. كلمات ذات حجم بحث حقيقي ومنطقي (ليس مبالغ فيه)
3. كلمات تناسب نية الشراء في السوق السعودي
4. كلمات تراعي المنافسة الحقيقية في السوق

🔍 تحليل شامل يتضمن:
1. الكلمات المفتاحية الرئيسية (Main Keywords) - 3-4 كلمات
2. الكلمات المفتاحية الطويلة (Long-tail Keywords) - 4-5 كلمات
3. كلمات نية الشراء (Buying Intent) - 2-3 كلمات
4. كلمات البحث المحلي (Local Search) - 2-3 كلمات

📈 بيانات حجم البحث يجب أن تكون:
- واقعية ومبنية على حجم السوق السعودي (35 مليون نسمة)
- الكلمات العامة: 5,000 - 50,000 بحث/شهر
- الكلمات المتوسطة: 1,000 - 5,000 بحث/شهر
- الكلمات الطويلة: 100 - 1,000 بحث/شهر

💰 تكلفة النقرة (CPC) بالريال السعودي:
- منخفضة: 0.50 - 2.00 ر.س
- متوسطة: 2.00 - 8.00 ر.س
- مرتفعة: 8.00 - 25.00 ر.س

🗓️ المواسم السعودية المهمة للتسويق:
- رمضان والعيد (ذروة الإنفاق)
- اليوم الوطني السعودي (23 سبتمبر)
- يوم التأسيس (22 فبراير)
- موسم الرياض (أكتوبر - مارس)
- الجمعة البيضاء (نوفمبر)
- موسم الحج والعمرة
- العودة للمدارس (أغسطس - سبتمبر)

⚠️ تعليمات صارمة:
- لا تختلق أرقام غير واقعية
- استخدم كلمات يبحث عنها السعوديون فعلياً
- راعِ خصوصية الثقافة السعودية
- قدم اقتراحات عملية وقابلة للتنفيذ

قدم النتائج بتنسيق JSON فقط بدون أي نص إضافي.`;

    const userPrompt = `قم بتحليل متعمق للموقع/النشاط التالي واقترح 10-15 كلمة مفتاحية مربحة وواقعية للسوق السعودي:

🌐 معلومات الموقع:
${url ? `- رابط الموقع: ${url}` : ''}
${description ? `- وصف النشاط: ${description}` : ''}
- الموقع الجغرافي المستهدف: ${location || 'السعودية'}
${websiteMetadata ? `- عنوان الموقع: ${websiteMetadata.title || 'غير متوفر'}` : ''}
${websiteMetadata ? `- وصف الموقع: ${websiteMetadata.description || 'غير متوفر'}` : ''}

${websiteContent ? `📄 محتوى الموقع المستخرج:\n${websiteContent.substring(0, 5000)}` : ''}

📋 المطلوب - أعد النتائج بتنسيق JSON التالي بدقة:
{
  "keywords": [
    {
      "keyword": "الكلمة المفتاحية بالعربية",
      "seoTitle": "عنوان SEO جذاب ومحسن (أقل من 60 حرف) يتضمن الكلمة المفتاحية",
      "metaDescription": "وصف ميتا احترافي يحفز النقر (أقل من 155 حرف) مع دعوة للعمل",
      "searchVolume": 8500,
      "competition": "low|medium|high",
      "cpc": 3.50,
      "trend": "up|down|stable",
      "searchIntent": "commercial|informational|transactional",
      "seoNotes": "نصائح SEO محددة مثل: استخدم الكلمة في H1، أضف 3 صور محسنة، اربط بـ 5 صفحات داخلية، أضف FAQ schema"
    }
  ],
  "analysis": {
    "marketOverview": "تحليل شامل للسوق السعودي في هذا المجال مع إحصائيات (100-150 كلمة)",
    "opportunities": ["فرصة واضحة ومحددة 1", "فرصة واضحة ومحددة 2", "فرصة واضحة ومحددة 3"],
    "recommendations": ["توصية عملية قابلة للتنفيذ 1", "توصية عملية قابلة للتنفيذ 2", "توصية عملية قابلة للتنفيذ 3"],
    "seasonalTips": ["نصيحة موسمية مع التوقيت المحدد 1", "نصيحة موسمية مع التوقيت المحدد 2"],
    "competitorInsights": "تحليل المنافسين المحتملين في هذا المجال",
    "targetAudience": "وصف الجمهور المستهدف بدقة (العمر، الجنس، الاهتمامات)"
  }
}`;

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
