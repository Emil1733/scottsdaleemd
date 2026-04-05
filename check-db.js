import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nbeqlzzpxxydgmfactzm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iZXFsenpweHh5ZGdtZmFjdHptIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTc3MzIyMSwiZXhwIjoyMDcxMzQ5MjIxfQ.UPK66kTJaBDh4prK5AkVVNhvtr2EgoIDpdns4NzX_UI'
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkSchema() {
    console.log('Checking "leads" table schema...')
    const { data, error } = await supabase
        .from('leads')
        .select('*')
        .limit(1)

    if (error) {
        console.error('Error fetching data:', error)
        return
    }

    if (data.length > 0) {
        console.log('Sample Lead Data Columns:', Object.keys(data[0]))
    } else {
        console.log('No data found in "leads" table yet.')
    }
}

checkSchema()
