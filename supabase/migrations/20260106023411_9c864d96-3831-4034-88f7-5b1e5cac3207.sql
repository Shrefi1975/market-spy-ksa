-- Update the handle_new_user function to set searches_limit to 1 for free plan
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Create profile
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data ->> 'full_name', split_part(NEW.email, '@', 1)));
  
  -- Assign default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  -- Create free subscription with 1 search limit (ONE TIME FREE TRIAL)
  INSERT INTO public.subscriptions (user_id, plan, searches_limit, searches_used, is_active, free_trial_used)
  VALUES (NEW.id, 'free', 1, 0, true, false);
  
  RETURN NEW;
END;
$$;

-- Update existing free plan users to have only 1 search limit
UPDATE public.subscriptions 
SET searches_limit = 1 
WHERE plan = 'free';