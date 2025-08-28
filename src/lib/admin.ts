import { createClient } from '@supabase/supabase-js';
import type { User, Session } from '@supabase/supabase-js';

const SUPABASE_URL = "https://lyzqgqhheosjthyoeeae.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5enFncWhoZW9zanRoeW9lZWFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MDA5OTcsImV4cCI6MjA3MTk3Njk5N30.DzsSM0Al_o2cPCrsvzltFDdozZp-Kr-u2HlpUbDiOaE";

// Create admin client for user creation
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Function to create admin user
export const createAdminUser = async () => {
  try {
    // Sign up the admin user
    const { data: authData, error: signUpError } = await supabaseAdmin.auth.signUp({
      email: 'minicubse@admin.com',
      password: 'minicubse',
      options: {
        data: {
          username: 'minicubse',
          full_name: 'Admin MiniCubse'
        }
      }
    });

    if (signUpError) {
      console.error('Error creating admin user:', signUpError);
      return { error: signUpError };
    }

    if (authData.user) {
      // Wait a bit for the trigger to create the profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user role to admin
      const { error: roleError } = await supabaseAdmin
        .from('user_roles')
        .update({ role: 'admin' })
        .eq('user_id', authData.user.id);

      if (roleError) {
        console.error('Error updating user role:', roleError);
        return { error: roleError };
      }

      console.log('Admin user created successfully with ID:', authData.user.id);
      return { data: authData.user };
    }

    return { error: new Error('User creation failed') };
  } catch (error) {
    console.error('Error in createAdminUser:', error);
    return { error };
  }
};

// Function to check if user has admin role
export const isUserAdmin = async (userId: string) => {
  const { data, error } = await supabaseAdmin
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .eq('role', 'admin')
    .single();

  return !error && data;
};

// Auto-create admin user on app startup
if (typeof window !== 'undefined') {
  // Only run in browser
  setTimeout(async () => {
    // Check if admin user already exists
    const { data: existingAdmin } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('username', 'minicubse')
      .single();

    if (!existingAdmin) {
      console.log('Creating admin user...');
      await createAdminUser();
    } else {
      console.log('Admin user already exists');
    }
  }, 2000);
}

export { supabaseAdmin };