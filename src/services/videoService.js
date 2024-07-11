import { createClient } from '@supabase/supabase-js';

const PROJECT_URL = "https://rpnedkugnvtgdiatirim.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbmVka3VnbnZ0Z2RpYXRpcmltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA1MDcwNzksImV4cCI6MjAzNjA4MzA3OX0.N7jYEFfN6_lwdrfyT3vsI_omhet-9Di0lFL8RKTLiBY";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from('videos').select('*');
        }
    }
}
