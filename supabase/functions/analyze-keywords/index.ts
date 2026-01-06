import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// URL validation to prevent SSRF attacks
function isValidUrl(urlString: string): { valid: boolean; error?: string } {
  try {
    const url = new URL(urlString);
    
    // Only allow HTTP and HTTPS protocols
    if (!['http:', 'https:'].includes(url.protocol)) {
      return { valid: false, error: 'Only HTTP and HTTPS protocols are allowed' };
    }
    
    const hostname = url.hostname.toLowerCase();
    
    // Block localhost and loopback addresses
    if (hostname === 'localhost' || 
        hostname === '127.0.0.1' || 
        hostname.startsWith('127.') ||
        hostname === '::1' ||
        hostname === '[::1]') {
      return { valid: false, error: 'Localhost addresses are not allowed' };
    }
    
    // Block private IP ranges (RFC 1918)
    const ipv4Match = hostname.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
    if (ipv4Match) {
      const [, a, b, c] = ipv4Match.map(Number);
      
      // 10.0.0.0/8
      if (a === 10) {
        return { valid: false, error: 'Private IP addresses are not allowed' };
      }
      // 172.16.0.0/12
      if (a === 172 && b >= 16 && b <= 31) {
        return { valid: false, error: 'Private IP addresses are not allowed' };
      }
      // 192.168.0.0/16
      if (a === 192 && b === 168) {
        return { valid: false, error: 'Private IP addresses are not allowed' };
      }
      // 169.254.0.0/16 (Link-local / Cloud metadata)
      if (a === 169 && b === 254) {
        return { valid: false, error: 'Cloud metadata endpoints are not allowed' };
      }
      // 0.0.0.0
      if (a === 0) {
        return { valid: false, error: 'Invalid IP address' };
      }
    }
    
    // Block cloud metadata endpoints by hostname
    const blockedHostnames = [
      'metadata.google.internal',
      'metadata.google.com',
      'metadata',
      'instance-data',
    ];
    if (blockedHostnames.includes(hostname)) {
      return { valid: false, error: 'Cloud metadata endpoints are not allowed' };
    }
    
    return { valid: true };
  } catch {
    return { valid: false, error: 'Invalid URL format' };
  }
}

// Input validation
function validateInput(data: { url?: string; description?: string; location?: string }): { valid: boolean; error?: string } {
  // Validate URL length if provided
  if (data.url && data.url.length > 2048) {
    return { valid: false, error: 'URL is too long (max 2048 characters)' };
  }
  
  // Validate description length if provided
  if (data.description && data.description.length > 5000) {
    return { valid: false, error: 'Description is too long (max 5000 characters)' };
  }
  
  // Validate location length if provided
  if (data.location && data.location.length > 200) {
    return { valid: false, error: 'Location is too long (max 200 characters)' };
  }
  
  // At least URL or description must be provided
  if (!data.url && !data.description) {
    return { valid: false, error: 'Please provide a URL or description' };
  }
  
  return { valid: true };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // ===== AUTHENTICATION CHECK =====
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      console.error('Missing or invalid Authorization header');
      return new Response(
        JSON.stringify({ error: 'يجب تسجيل الدخول للوصول لهذه الخدمة' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    
    if (claimsError || !claimsData?.claims) {
      console.error('Authentication failed:', claimsError?.message);
      return new Response(
        JSON.stringify({ error: 'جلسة غير صالحة، يرجى تسجيل الدخول مرة أخرى' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userId = claimsData.claims.sub;
    console.log('Authenticated user:', userId);
    // ===== END AUTHENTICATION CHECK =====

    const requestData = await req.json();
    const { url, description, location } = requestData;
    
    // ===== INPUT VALIDATION =====
    const inputValidation = validateInput({ url, description, location });
    if (!inputValidation.valid) {
      return new Response(
        JSON.stringify({ error: inputValidation.error }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    // ===== END INPUT VALIDATION =====
    
    console.log('Analyzing keywords for:', { url: url ? '[PROVIDED]' : '[NOT PROVIDED]', location });

    const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    let websiteContent = '';
    let websiteMetadata = null;
    
    // If URL is provided, validate and scrape the website using Firecrawl
    if (url && FIRECRAWL_API_KEY) {
      let formattedUrl = url.trim();
      if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
        formattedUrl = `https://${formattedUrl}`;
      }

      // ===== URL SECURITY VALIDATION =====
      const urlValidation = isValidUrl(formattedUrl);
      if (!urlValidation.valid) {
        console.error('URL validation failed:', urlValidation.error);
        return new Response(
          JSON.stringify({ error: `رابط غير مسموح: ${urlValidation.error}` }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      // ===== END URL SECURITY VALIDATION =====

      console.log('Scraping website with Firecrawl...');
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

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
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (scrapeResponse.ok) {
          const scrapeData = await scrapeResponse.json();
          websiteContent = scrapeData.data?.markdown || scrapeData.markdown || '';
          websiteMetadata = scrapeData.data?.metadata || scrapeData.metadata || null;
          console.log('Website scraped successfully, content length:', websiteContent.length);
        } else {
          console.log('Firecrawl scrape failed, continuing with AI analysis only');
        }
      } catch (scrapeError: unknown) {
        if (scrapeError instanceof Error && scrapeError.name === 'AbortError') {
          console.log('Scrape request timed out, continuing with AI analysis only');
        } else {
          console.log('Error scraping website:', scrapeError);
        }
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
