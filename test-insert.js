import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nbeqlzzpxxydgmfactzm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iZXFsenpweHh5ZGdtZmFjdHptIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTc3MzIyMSwiZXhwIjoyMDcxMzQ5MjIxfQ.UPK66kTJaBDh4prK5AkVVNhvtr2EgoIDpdns4NzX_UI'
const supabase = createClient(supabaseUrl, supabaseKey)

async function testInsert() {
    console.log('Testing insert into emd_leads_atlanta...')
    const { data, error } = await supabase
        .from('emd_leads_atlanta')
        .insert([
            {
                name: 'Test Lead',
                phone: '1234567890',
                zip: '85255',
                pool_type: 'concrete',
                pool_size: 'medium',
                access_type: 'easy',
                price_estimate: '$10k-15k',
                source: 'scottsdale-emd'
            }
        ]);

    if (error) {
        console.error('Error during test insert:', error.message);
        if (error.details) console.log('Details:', error.details);
        return;
    }

    console.log('Test insert successful! Table structure is ready.');
}

testInsert()
