import https from 'https';

const options = {
  hostname: 'nbeqlzzpxxydgmfactzm.supabase.co',
  path: '/rest/v1/',
  method: 'GET',
  headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iZXFsenpweHh5ZGdtZmFjdHptIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTc3MzIyMSwiZXhwIjoyMDcxMzQ5MjIxfQ.UPK66kTJaBDh4prK5AkVVNhvtr2EgoIDpdns4NzX_UI'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    try {
        const j = JSON.parse(data);
        if (j.definitions && j.definitions.emd_leads_atlanta) {
            console.log('Columns in emd_leads_atlanta:', Object.keys(j.definitions.emd_leads_atlanta.properties));
        } else {
            console.log('Could not find definition for emd_leads_atlanta. Definitions found:', Object.keys(j.definitions || {}));
        }
    } catch(e) {
        console.error('Failed to parse response:', e.message);
    }
  });
});

req.on('error', (e) => console.error(e));
req.end();
