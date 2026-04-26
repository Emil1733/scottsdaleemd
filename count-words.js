import fs from 'fs';
import path from 'path';

const files = [
  'about/index.html',
  'blog/full-vs-partial-pool-removal-arizona/index.html',
  'blog/how-to-prepare-your-yard-scottsdale/index.html',
  'blog/scottsdale-pool-removal-cost-guide-2026/index.html',
  'blog/index.html',
  'building-after-pool-removal/index.html',
  'caliche-excavation/index.html',
  'carefree/index.html',
  'cave-creek/index.html',
  'compaction-certification/index.html',
  'contact/index.html',
  'engineered-backfill/index.html',
  'fiberglass-pool-removal/index.html',
  'fountain-hills/index.html',
  'gainey-ranch/index.html',
  'grayhawk/index.html',
  'mccormick-ranch/index.html',
  'north-scottsdale/index.html',
  'paradise-valley/index.html',
  'pool-demolition/index.html',
  'pool-removal/index.html',
  'pool-removal-cost/index.html',
  'pool-removal-permits/index.html',
  'troon-north/index.html',
  'vinyl-liner-pool-removal/index.html',
  'index.html'
];

const results = [];

for (const file of files) {
  const absolutePath = path.resolve(file);
  if (fs.existsSync(absolutePath)) {
    const content = fs.readFileSync(absolutePath, 'utf8');
    // Simple way to strip tags and scripts/styles
    const bodyMatch = content.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    const textToProcess = bodyMatch ? bodyMatch[1] : content;
    
    let text = textToProcess
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      
    const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;
    results.push({ page: file, words: wordCount });
  }
}

console.log(JSON.stringify(results.sort((a, b) => b.words - a.words), null, 2));
