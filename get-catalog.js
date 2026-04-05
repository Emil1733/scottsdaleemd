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
        if (j.definitions) {
            console.log('Tables Found:', Object.keys(j.definitions));
        } else {
            console.log('No definitions found. Full Response Structure Keys:', Object.keys(j));
            if (j.info) console.log('API Info:', j.info.title);
        }
    } catch(e) {
        console.error('Failed to parse response:', e.message);
        console.log('Raw data length:', data.length);
    }
  });
});

req.on('error', (e) => console.error(e));
req.end();
