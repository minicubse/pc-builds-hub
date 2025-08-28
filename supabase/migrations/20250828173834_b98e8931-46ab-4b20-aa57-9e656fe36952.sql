-- Fix the remaining function with search_path
create or replace function public.update_updated_at_column()
returns trigger 
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;