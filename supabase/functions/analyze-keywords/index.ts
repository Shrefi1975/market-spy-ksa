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
            formats: ['markdown'],
            onlyMainContent: true,
          }),
        });

        if (scrapeResponse.ok) {
          const scrapeData = await scrapeResponse.json();
          websiteContent = scrapeData.data?.markdown || scrapeData.markdown || '';
          console.log('Website scraped successfully, content length:', websiteContent.length);
        } else {
          console.log('Firecrawl scrape failed, continuing with AI analysis only');
        }
      } catch (scrapeError) {
        console.log('Error scraping website:', scrapeError);
      }
    }

    // Generate keywords using AI
    const systemPrompt = `أنت خبير SEO متخصص في السوق السعودي والعربي. مهمتك هي تحليل المواقع والأعمال التجارية واقتراح كلمات مفتاحية مربحة ومناسبة للسوق المحلي.

يجب أن تقدم تحليلاً شاملاً يتضمن:
1. كلمات مفتاحية ذات صلة بالنشاط التجاري
2. حجم البحث التقديري لكل كلمة
3. مستوى المنافسة (منخفض/متوسط/مرتفع)
4. تكلفة النقرة التقديرية بالريال السعودي
5. اتجاه الطلب (صاعد/نازل/ثابت)
6. عنوان SEO مقترح لكل كلمة
7. وصف ميتا مقترح لكل كلمة

اعتبر المواسم السعودية المهمة مثل:
- رمضان والعيد
- اليوم الوطني السعودي
- يوم التأسيس
- موسم الرياض
- الجمعة البيضاء

قدم النتائج بتنسيق JSON فقط بدون أي نص إضافي.`;

    const userPrompt = `قم بتحليل الموقع/النشاط التالي واقترح 8-12 كلمة مفتاحية مربحة:

${url ? `رابط الموقع: ${url}` : ''}
${description ? `وصف النشاط: ${description}` : ''}
الموقع الجغرافي المستهدف: ${location || 'السعودية'}

${websiteContent ? `محتوى الموقع:\n${websiteContent.substring(0, 3000)}` : ''}

أعد النتائج بتنسيق JSON التالي فقط:
{
  "keywords": [
    {
      "keyword": "الكلمة المفتاحية",
      "seoTitle": "عنوان SEO مقترح (أقل من 60 حرف)",
      "metaDescription": "وصف ميتا مقترح (أقل من 160 حرف)",
      "searchVolume": 12000,
      "competition": "low|medium|high",
      "cpc": 2.50,
      "trend": "up|down|stable"
    }
  ],
  "analysis": {
    "marketOverview": "نظرة عامة على السوق",
    "opportunities": ["فرصة 1", "فرصة 2"],
    "recommendations": ["توصية 1", "توصية 2"],
    "seasonalTips": ["نصيحة موسمية 1", "نصيحة موسمية 2"]
  }
}`;

    console.log('Calling Lovable AI for analysis...');

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
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

    console.log('Analysis completed successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: result,
        scrapedUrl: url || null 
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
