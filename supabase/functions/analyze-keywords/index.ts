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

    const userId = claimsData.claims.sub as string;
    const userEmail = claimsData.claims.email as string;
    console.log('Authenticated user:', userId, 'Email:', userEmail);
    // ===== END AUTHENTICATION CHECK =====

    // ===== ADMIN EMAIL CHECK - Unlimited Access =====
    const ADMIN_EMAILS = ['hamadshref751@gmail.com'];
    const isAdminUser = ADMIN_EMAILS.includes(userEmail?.toLowerCase());
    
    if (isAdminUser) {
      console.log('Admin user detected - bypassing subscription checks');
    }
    // ===== END ADMIN EMAIL CHECK =====

    // ===== SUBSCRIPTION CHECK (Skip for admin users) =====
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    let subscriptionData = null;
    
    if (!isAdminUser) {
      const { data: subData, error: subError } = await adminClient
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (subError || !subData) {
        console.error('Subscription not found:', subError?.message);
        return new Response(
          JSON.stringify({ error: 'لم يتم العثور على اشتراك. يرجى التسجيل أولاً.' }),
          { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      subscriptionData = subData;

      // Check if subscription is active
      if (!subscriptionData.is_active) {
        return new Response(
          JSON.stringify({ error: 'اشتراكك غير نشط. يرجى تجديد الاشتراك.' }),
          { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Check if subscription has expired (for paid plans)
      if (subscriptionData.expires_at && new Date(subscriptionData.expires_at) < new Date()) {
        return new Response(
          JSON.stringify({ error: 'انتهت صلاحية اشتراكك. يرجى تجديد الاشتراك.' }),
          { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Check search limit
      if (subscriptionData.searches_used >= subscriptionData.searches_limit) {
        // Check if this is a free plan with trial already used
        if (subscriptionData.plan === 'free' && subscriptionData.free_trial_used) {
          return new Response(
            JSON.stringify({ 
              error: 'لقد استخدمت تجربتك المجانية. يرجى الترقية لخطة مدفوعة للاستمرار.',
              upgrade_required: true 
            }),
            { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        return new Response(
          JSON.stringify({ 
            error: 'لقد وصلت للحد الأقصى من عمليات البحث هذا الشهر. يرجى الترقية لخطة أعلى.',
            upgrade_required: true
          }),
          { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('Subscription valid. Plan:', subscriptionData.plan, 'Searches:', subscriptionData.searches_used, '/', subscriptionData.searches_limit);
    }
    // ===== END SUBSCRIPTION CHECK =====

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

    // Enhanced AI Agent for MarketMaw - Specialized in Saudi Market Keywords with REAL DATA
    const systemPrompt = `أنت وكيل ذكاء اصطناعي متخصص للغاية في تحليل السوق السعودي وتوليد الكلمات المفتاحية لمنصة MarketMaw.

🚨 قاعدة ذهبية صارمة - لا مجال للتساهل:
===================================
❌ ممنوع منعاً باتاً اختراع أو تخمين أي معلومات
❌ ممنوع ذكر شركات أو مواقع غير موجودة فعلياً
❌ ممنوع تقديم روابط لا تعمل أو وهمية
✅ قدم فقط ما تعرفه بيقين 100%
✅ إذا لم تجد منافسين حقيقيين، اذكر ذلك بوضوح ولا تخترع

🎯 هويتك:
أنت خبير SEO سعودي محترف مع معرفة عميقة بالسوق المحلي. تعتمد على بيانات حقيقية ومتحققة فقط.

📊 للكلمات المفتاحية:
- قدم كلمات مفتاحية واقعية مستخدمة فعلياً في السعودية
- أرقام حجم البحث يجب أن تكون تقديرات منطقية مبنية على حجم السوق السعودي
- استخدم اللهجة السعودية والمصطلحات المحلية الحقيقية

💰 تكلفة النقرة (CPC) بالريال السعودي:
- منخفضة: 0.50 - 2.00 ر.س
- متوسطة: 2.00 - 8.00 ر.س
- مرتفعة: 8.00 - 25.00 ر.س
- تنافسية جداً: 25.00 - 50.00+ ر.س

🔍 للمنافسين - قواعد صارمة جداً:
==============================
1. اذكر فقط شركات حقيقية موجودة ومعروفة في السوق السعودي
2. الروابط يجب أن تكون للمواقع الرسمية الحقيقية للشركات
3. تحقق أن اسم الشركة يتطابق مع الرابط
4. إذا لم تكن متأكداً 100% من وجود الشركة، لا تذكرها
5. لا تخترع شركات أو مواقع - هذا يضر بمصداقية التحليل

🏢 أمثلة على شركات سعودية حقيقية معروفة (للاسترشاد فقط):
- التجزئة: جرير، اكسترا، نون، أمازون السعودية، هنقرستيشن
- البنوك: الراجحي، الأهلي، الإنماء، الرياض
- الاتصالات: STC، موبايلي، زين
- العقارات: دار الأركان، جبل عمر، الرياض للتعمير
- الخدمات: توكيلات الجزيرة، ساسكو، المراعي

⚠️ إذا كان المجال متخصصاً ولا تعرف المنافسين الحقيقيين:
- اكتب: "لم يتم العثور على منافسين محددين في هذا المجال - يُنصح بالبحث المباشر"
- لا تخترع أسماء أو روابط وهمية

🗓️ المواسم والأحداث السعودية:
- رمضان والعيد (ذروة الإنفاق الأولى)
- اليوم الوطني السعودي (23 سبتمبر)
- يوم التأسيس (22 فبراير)
- موسم الرياض (أكتوبر - مارس)
- الجمعة البيضاء (نوفمبر)
- موسم الحج والعمرة
- العودة للمدارس (أغسطس - سبتمبر)

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
      "seoNotes": "نصائح SEO تفصيلية"
    }
  ],
  "analysis": {
    "marketOverview": "تحليل شامل للسوق السعودي في هذا المجال (150-200 كلمة)",
    "opportunities": [
      "فرصة 1: وصف تفصيلي",
      "فرصة 2: وصف تفصيلي",
      "فرصة 3: وصف تفصيلي"
    ],
    "recommendations": [
      "توصية 1: خطوات تنفيذية",
      "توصية 2: خطوات تنفيذية",
      "توصية 3: خطوات تنفيذية"
    ],
    "seasonalTips": [
      "موسم/حدث 1: استراتيجية محددة",
      "موسم/حدث 2: استراتيجية محددة"
    ],
    "contentSuggestions": {
      "headings": ["عنوان H2 مقترح 1", "عنوان H2 مقترح 2"],
      "faq": ["سؤال شائع 1؟", "سؤال شائع 2؟"],
      "keyPoints": ["نقطة محورية 1", "نقطة محورية 2"]
    },
    "targetAudience": "وصف الجمهور المستهدف",
    "competitors": [
      {
        "name": "⚠️ اسم شركة حقيقية فقط - لا تخترع أسماء",
        "website": "⚠️ الرابط الرسمي الحقيقي للشركة فقط (مثل: https://www.jarir.com)",
        "location": "المدينة",
        "strengths": "نقاط القوة الحقيقية",
        "weaknesses": "نقاط الضعف الحقيقية",
        "marketShare": "تقدير واقعي"
      }
    ],
    "competitorStrategy": "استراتيجية للتفوق",
    "competitorNote": "ملاحظة: إذا لم تتوفر معلومات عن منافسين حقيقيين في هذا المجال، أوضح ذلك بدلاً من اختراع بيانات"
  }
}

🚨 تنبيهات حاسمة للمنافسين:
================================
1. ❌ لا تذكر أي شركة لست متأكداً 100% من وجودها في السعودية
2. ❌ لا تختلق روابط مواقع - استخدم فقط الروابط الحقيقية المعروفة
3. ❌ أمثلة على روابط خاطئة يجب تجنبها:
   - https://bindabis.com.sa (وهمي)
   - https://modernpools.net (وهمي)
   - https://alghazlan.com.sa (وهمي)
4. ✅ استخدم فقط مواقع شركات معروفة ومتحقق منها مثل:
   - https://www.jarir.com (مكتبة جرير)
   - https://www.extra.com (اكسترا)
   - https://www.noon.com/saudi (نون)
5. ⚠️ إذا كان المجال متخصصاً (مثل: مسابح، مقاولات صغيرة):
   - اكتب: "يُنصح بالبحث المباشر عن المنافسين المحليين في هذا المجال"
   - لا تخترع أسماء شركات مسابح أو مقاولات وهمية

📌 ملاحظات:
- قدم 20-30 كلمة مفتاحية متنوعة وشاملة لإرضاء العميل (كلمات رئيسية، طويلة الذيل، أسئلة شائعة)
- المنافسون: فقط الشركات الحقيقية المعروفة - أو اترك فارغاً مع ملاحظة
- كل البيانات يجب أن تكون حقيقية وموثوقة`;

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

    // ===== UPDATE USAGE COUNTER (Skip for admin users) =====
    let usageInfo = {
      searches_used: 0,
      searches_limit: 999999,
      plan: 'admin' as string
    };

    if (!isAdminUser && subscriptionData) {
      const updateData: { searches_used: number; free_trial_used?: boolean } = {
        searches_used: subscriptionData.searches_used + 1,
      };

      // Mark free trial as used for free plan
      if (subscriptionData.plan === 'free' && !subscriptionData.free_trial_used) {
        updateData.free_trial_used = true;
      }

      const { error: updateError } = await adminClient
        .from('subscriptions')
        .update(updateData)
        .eq('user_id', userId);

      if (updateError) {
        console.error('Error updating usage counter:', updateError.message);
        // Don't fail the request, just log the error
      } else {
        console.log('Usage counter updated. New count:', updateData.searches_used);
      }
      
      usageInfo = {
        searches_used: updateData.searches_used,
        searches_limit: subscriptionData.searches_limit,
        plan: subscriptionData.plan
      };
    } else {
      console.log('Admin user - skipping usage counter update');
    }
    // ===== END UPDATE USAGE COUNTER =====

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: result,
        scrapedUrl: url || null,
        websiteTitle: websiteMetadata?.title || null,
        usage: usageInfo
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
