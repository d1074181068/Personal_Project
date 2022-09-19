import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  'https://jdmxqcqigwaxtfsnofoc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkbXhxY3FpZ3dheHRmc25vZm9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM1ODIxMzksImV4cCI6MTk3OTE1ODEzOX0.eWhQGPfD-G8Hsamb2OIJGu8N_zV3aaW_SRSEVFFQCVA'
)

export { supabase }
