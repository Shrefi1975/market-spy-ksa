import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { competitorDomain, userDomain, country, analysisType } = await req.json();

    if (!competitorDomain) {
      return new Response(
        JSON.stringify({ success: false, error: "يرجى إدخال دومين المنافس" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const FIRECRAWL_API_KEY = Deno.env.get("FIRECRAWL_API_KEY");

    // Step 1: Try to scrape competitor with Firecrawl if available
    let scrapedContent = "";
    let scrapedLinks: string[] = [];
    let scrapedMetadata: any = {};

    if (FIRECRAWL_API_KEY && analysisType === "deep") {
      try {
        console.log("Scraping competitor with Firecrawl:", competitorDomain);

        // Scrape main page
        const scrapeResponse = await fetch("https://api.firecrawl.dev/v1/scrape", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: `https://${competitorDomain.replace(/^https?:\/\//, "")}`,
            formats: ["markdown", "links"],
            onlyMainContent: true,
          }),
        });

        const scrapeData = await scrapeResponse.json();
        if (scrapeResponse.ok && scrapeData.success) {
          scrapedContent = scrapeData.data?.markdown || scrapeData.markdown || "";
          scrapedLinks = scrapeData.data?.links || scrapeData.links || [];
          scrapedMetadata = scrapeData.data?.metadata || scrapeData.metadata || {};
          console.log("Scrape successful, content length:", scrapedContent.length);
        }

        // Map the site for URL structure
        const mapResponse = await fetch("https://api.firecrawl.dev/v1/map", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: `https://${competitorDomain.replace(/^https?:\/\//, "")}`,
            limit: 50,
          }),
        });

        const mapData = await mapResponse.json();
        if (mapResponse.ok && mapData.success) {
          const siteLinks = mapData.links || [];
          scrapedLinks = [...new Set([...scrapedLinks, ...siteLinks])];
          console.log("Map successful, total links:", scrapedLinks.length);
        }
      } catch (e) {
        console.error("Firecrawl error (continuing with AI only):", e);
      }
    }

    // Also scrape user domain if provided for gap analysis
    let userContent = "";
    if (FIRECRAWL_API_KEY && userDomain && analysisType === "deep") {
      try {
        const userScrape = await fetch("https://api.firecrawl.dev/v1/scrape", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: `https://${userDomain.replace(/^https?:\/\//, "")}`,
            formats: ["markdown"],
            onlyMainContent: true,
          }),
        });
        const userData = await userScrape.json();
        if (userScrape.ok && userData.success) {
          userContent = userData.data?.markdown || userData.markdown || "";
        }
      } catch (e) {
        console.error("User domain scrape error:", e);
      }
    }

    // Step 2: AI Analysis
    const countryContext = country || "sa";
    const countryNames: Record<string, string> = {
      sa: "السعودية", ae: "الإمارات", eg: "مصر", kw: "الكويت",
      qa: "قطر", bh: "البحرين", om: "عُمان", jo: "الأردن",
      lb: "لبنان", iq: "العراق", ma: "المغرب", tn: "تونس",
      dz: "الجزائر", ly: "ليبيا", sd: "السودان", ye: "اليمن",
      sy: "سوريا", ps: "فلسطين", so: "الصومال", mr: "موريتانيا",
      dj: "جيبوتي", km: "جزر القمر",
    };
    const countryName = countryNames[countryContext] || "العربي";

    const systemPrompt = `أنت خبير SEO متخصص في الأسواق العربية. مهمتك تحليل مواقع المنافسين واكتشاف فرص SEO المخفية.

قم بتحليل الموقع المنافس وأعد النتائج بصيغة JSON دقيقة.

${scrapedContent ? `محتوى الموقع المنافس الذي تم سحبه:\n${scrapedContent.substring(0, 4000)}` : ""}
${scrapedLinks.length ? `روابط الموقع المنافس:\n${scrapedLinks.slice(0, 30).join("\n")}` : ""}
${userContent ? `محتوى موقع المستخدم:\n${userContent.substring(0, 2000)}` : ""}

السوق المستهدف: ${countryName}`;

    const userPrompt = `حلل الموقع المنافس: ${competitorDomain}
${userDomain ? `موقع المستخدم للمقارنة: ${userDomain}` : ""}
السوق: ${countryName}

أعد تحليلاً شاملاً يتضمن:

1. الكلمات المفتاحية الرئيسية (15-25 كلمة) مع حجم البحث والمنافسة ونية البحث
2. فجوة الكلمات المفتاحية (كلمات يرتب عليها المنافس ولا يرتب عليها المستخدم)
3. فرص الترتيب السهلة (كلمات منخفضة المنافسة وعالية الحركة)
4. اقتراحات المحتوى (مقالات وصفحات يجب إنشاؤها)
5. تحليل محتوى المنافس (العناوين، طول المحتوى، تغطية المواضيع)
6. نقاط الفرصة SEO (تقييم من 100)

أعد النتيجة كـ JSON فقط بدون أي نص إضافي.`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "competitor_analysis",
              description: "Return comprehensive competitor SEO analysis",
              parameters: {
                type: "object",
                properties: {
                  competitorOverview: {
                    type: "object",
                    properties: {
                      domain: { type: "string" },
                      estimatedAuthority: { type: "number", description: "Domain authority score 0-100" },
                      mainTopics: { type: "array", items: { type: "string" } },
                      contentQuality: { type: "string", enum: ["low", "medium", "high", "excellent"] },
                      estimatedMonthlyTraffic: { type: "string" },
                    },
                    required: ["domain", "estimatedAuthority", "mainTopics", "contentQuality", "estimatedMonthlyTraffic"],
                  },
                  keywords: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        keyword: { type: "string" },
                        searchVolume: { type: "number" },
                        difficulty: { type: "number", description: "0-100" },
                        searchIntent: { type: "string", enum: ["informational", "commercial", "transactional", "navigational"] },
                        estimatedPosition: { type: "number" },
                        cpc: { type: "number" },
                      },
                      required: ["keyword", "searchVolume", "difficulty", "searchIntent", "estimatedPosition"],
                    },
                  },
                  keywordGap: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        keyword: { type: "string" },
                        competitorPosition: { type: "number" },
                        searchVolume: { type: "number" },
                        difficulty: { type: "number" },
                        opportunityScore: { type: "number", description: "0-100" },
                      },
                      required: ["keyword", "competitorPosition", "searchVolume", "difficulty", "opportunityScore"],
                    },
                  },
                  easyOpportunities: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        keyword: { type: "string" },
                        searchVolume: { type: "number" },
                        difficulty: { type: "number" },
                        trafficPotential: { type: "number" },
                        reason: { type: "string" },
                      },
                      required: ["keyword", "searchVolume", "difficulty", "trafficPotential", "reason"],
                    },
                  },
                  contentSuggestions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        title: { type: "string" },
                        type: { type: "string", enum: ["article", "page", "guide", "comparison", "review"] },
                        targetKeywords: { type: "array", items: { type: "string" } },
                        estimatedTraffic: { type: "number" },
                        priority: { type: "string", enum: ["high", "medium", "low"] },
                      },
                      required: ["title", "type", "targetKeywords", "estimatedTraffic", "priority"],
                    },
                  },
                  competitorContent: {
                    type: "object",
                    properties: {
                      totalPages: { type: "number" },
                      avgContentLength: { type: "number" },
                      topTopics: { type: "array", items: { type: "string" } },
                      contentStrengths: { type: "array", items: { type: "string" } },
                      contentWeaknesses: { type: "array", items: { type: "string" } },
                    },
                    required: ["totalPages", "avgContentLength", "topTopics", "contentStrengths", "contentWeaknesses"],
                  },
                  seoScore: {
                    type: "object",
                    properties: {
                      overall: { type: "number" },
                      trafficPotential: { type: "number" },
                      competitionLevel: { type: "number" },
                      contentGap: { type: "number" },
                      quickWins: { type: "number" },
                    },
                    required: ["overall", "trafficPotential", "competitionLevel", "contentGap", "quickWins"],
                  },
                },
                required: ["competitorOverview", "keywords", "keywordGap", "easyOpportunities", "contentSuggestions", "competitorContent", "seoScore"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "competitor_analysis" } },
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ success: false, error: "تم تجاوز حد الطلبات، يرجى المحاولة لاحقاً" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ success: false, error: "يرجى إضافة رصيد للمتابعة" }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errText);
      throw new Error("AI analysis failed");
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      throw new Error("No analysis data returned");
    }

    const analysisResult = JSON.parse(toolCall.function.arguments);

    return new Response(
      JSON.stringify({
        success: true,
        data: analysisResult,
        meta: {
          analysisType: FIRECRAWL_API_KEY && analysisType === "deep" ? "deep" : "quick",
          scrapedPages: scrapedLinks.length,
          competitorDomain,
          userDomain: userDomain || null,
          country: countryContext,
        },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("Competitor analysis error:", e);
    return new Response(
      JSON.stringify({ success: false, error: e instanceof Error ? e.message : "حدث خطأ غير متوقع" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
