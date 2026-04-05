import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nbeqlzzpxxydgmfactzm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iZXFsenpweHh5ZGdtZmFjdHptIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTc3MzIyMSwiZXhwIjoyMDcxMzQ5MjIxfQ.UPK66kTJaBDh4prK5AkVVNhvtr2EgoIDpdns4NzX_UI'
const supabase = createClient(supabaseUrl, supabaseKey)

async function listTables() {
    const { data, error } = await supabase.rpc('get_tables'); // This function must exist in Supabase SQL to work, or I can use REST

    // Alternative: fetch from a table you suspect exists
    const { data: leadData, error: leadError } = await supabase
        .from('leads')
        .select('*')
        .limit(1);
    
    if (leadError) {
        console.log('Error "leads":', leadError.message);
    } else {
        console.log('Found "leads" table!');
        return;
    }

    // Try singular "lead"
    const { data: leadSingularData, error: leadSingularError } = await supabase
        .from('lead')
        .select('*')
        .limit(1);

    if (leadSingularError) {
        console.log('Error "lead":', leadSingularError.message);
    } else {
        console.log('Found "lead" table!');
        return;
    }
}

listTables();
