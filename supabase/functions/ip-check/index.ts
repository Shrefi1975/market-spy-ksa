import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    const { action, email, userId } = await req.json();
    
    // Get client IP from headers (works with most proxies/CDNs)
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() 
      || req.headers.get('x-real-ip') 
      || req.headers.get('cf-connecting-ip')
      || 'unknown';

    console.log('IP Check action:', action, 'IP:', clientIp);

    if (action === 'check-registration') {
      // Check if this IP has already been used for registration
      const { data: existingIpRecord, error: ipError } = await adminClient
        .from('ip_tracking')
        .select('*')
        .eq('ip_address', clientIp)
        .eq('registration_ip', true)
        .single();

      if (existingIpRecord) {
        console.log('IP already used for registration:', clientIp);
        return new Response(
          JSON.stringify({ 
            allowed: false, 
            reason: 'هذا الجهاز مسجل بالفعل. يُسمح بحساب واحد فقط لكل جهاز.' 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Check if email is already registered
      if (email) {
        const { data: existingUser } = await adminClient.auth.admin.listUsers();
        const emailExists = existingUser?.users?.some(u => u.email?.toLowerCase() === email.toLowerCase());
        
        if (emailExists) {
          return new Response(
            JSON.stringify({ 
              allowed: false, 
              reason: 'هذا البريد الإلكتروني مسجل بالفعل. يرجى تسجيل الدخول.' 
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      }

      return new Response(
        JSON.stringify({ allowed: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'record-registration') {
      if (!userId) {
        throw new Error('userId is required');
      }

      // Record the IP for this user
      const { error: insertError } = await adminClient
        .from('ip_tracking')
        .insert({
          ip_address: clientIp,
          user_id: userId,
          registration_ip: true,
          free_trial_used: false,
        });

      if (insertError) {
        console.error('Error recording IP:', insertError.message);
      } else {
        console.log('IP recorded for user:', userId);
      }

      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'check-free-trial') {
      // Check if this IP has used free trial
      const { data: ipRecord } = await adminClient
        .from('ip_tracking')
        .select('free_trial_used')
        .eq('ip_address', clientIp)
        .eq('free_trial_used', true)
        .single();

      if (ipRecord) {
        return new Response(
          JSON.stringify({ 
            allowed: false, 
            reason: 'تم استخدام التجربة المجانية من هذا الجهاز مسبقاً.' 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ allowed: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'record-free-trial') {
      if (!userId) {
        throw new Error('userId is required');
      }

      // Update or insert IP record with free trial used
      const { data: existingRecord } = await adminClient
        .from('ip_tracking')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (existingRecord) {
        await adminClient
          .from('ip_tracking')
          .update({ free_trial_used: true })
          .eq('id', existingRecord.id);
      } else {
        await adminClient
          .from('ip_tracking')
          .insert({
            ip_address: clientIp,
            user_id: userId,
            registration_ip: false,
            free_trial_used: true,
          });
      }

      console.log('Free trial recorded for user:', userId);

      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in ip-check function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'حدث خطأ غير متوقع' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
