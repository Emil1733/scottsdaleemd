import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nbeqlzzpxxydgmfactzm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iZXFsenpweHh5ZGdtZmFjdHptIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTc3MzIyMSwiZXhwIjoyMDcxMzQ5MjIxfQ.UPK66kTJaBDh4prK5AkVVNhvtr2EgoIDpdns4NzX_UI'
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkAtlantaSchema() {
    console.log('Checking "emd_leads_atlanta" table schema...')
    const { data, error } = await supabase
        .from('emd_leads_atlanta')
        .select('*')
        .limit(1)

    if (error) {
        console.error('Error fetching data from "emd_leads_atlanta":', error)
        return
    }

    if (data.length > 0) {
        console.log('Current Columns in emd_leads_atlanta:', Object.keys(data[0]))
    } else {
        console.log('No data found in "emd_leads_atlanta" yet. Checking for existence via empty select...')
        const { error: emptyError } = await supabase.from('emd_leads_atlanta').select('id').limit(0);
        if (emptyError) {
             console.error('Table might not exist:', emptyError);
        } else {
             console.log('Table exists but is empty.');
        }
    }
}

checkAtlantaSchema()
