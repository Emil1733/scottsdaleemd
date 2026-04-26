import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const key = JSON.parse(fs.readFileSync('./gsc-credentials.json', 'utf8'));
const auth = google.auth.fromJSON(key);
auth.scopes = ['https://www.googleapis.com/auth/webmasters.readonly'];

const searchconsole = google.searchconsole({
  version: 'v1',
  auth: auth
});

async function getGSCData() {
  try {
    const siteUrl = 'sc-domain:scottsdalepoolremoval.com';
    console.log(`Using site: ${siteUrl}`);

    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() - 2);
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 28);
    const formatDate = (date) => date.toISOString().split('T')[0];

    console.log(`Fetching data from ${formatDate(startDate)} to ${formatDate(endDate)}...`);

    // 1. Query by Date for trends
    const dateResponse = await searchconsole.searchanalytics.query({
      siteUrl: siteUrl,
      requestBody: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        dimensions: ['date'],
      }
    });

    // 2. Query by Page
    const pageResponse = await searchconsole.searchanalytics.query({
      siteUrl: siteUrl,
      requestBody: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        dimensions: ['page'],
        rowLimit: 100
      }
    });

    // 3. Query by Query (Keywords)
    const queryResponse = await searchconsole.searchanalytics.query({
      siteUrl: siteUrl,
      requestBody: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        dimensions: ['query'],
        rowLimit: 200
      }
    });

    const combinedData = {
      period: { start: formatDate(startDate), end: formatDate(endDate) },
      byDate: dateResponse.data.rows || [],
      byPage: pageResponse.data.rows || [],
      byQuery: queryResponse.data.rows || []
    };

    const outputDir = './gsc/04-26-2026';
    const outputPath = path.join(outputDir, 'gsc_report.json');

    fs.writeFileSync(outputPath, JSON.stringify(combinedData, null, 2));
    console.log(`Successfully saved GSC data to ${outputPath}`);

  } catch (error) {
    if (error.response && error.response.data) {
        console.error('Error details:', JSON.stringify(error.response.data, null, 2));
    }
    console.error('Error fetching GSC data:', error.message);
  }
}

getGSCData();
