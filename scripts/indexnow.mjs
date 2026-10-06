/**
 * Tell IndexNow search engines (Bing, Yandex, Seznam, Naver and the AI tools that use Bing's index)
 * that PlanDepa's pages exist or changed.
 *
 * Run AFTER a deploy is live (the key file must be reachable on the site):
 *   npm run indexnow
 *
 * Submits every URL in the live sitemap, or pass specific URLs:
 *   node scripts/indexnow.mjs https://plandepa.com/clarity-blueprint
 */
const HOST = 'plandepa.com';
const KEY = '3f6e61ea72cf89265fc9db578dea2d3b';
const base = `https://${HOST}`;

let urls = process.argv.slice(2);
if (urls.length === 0) {
  const xml = await (await fetch(`${base}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const keyCheck = await fetch(`${base}/${KEY}.txt`);
if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) {
  console.error('Key file is not live yet at', `${base}/${KEY}.txt`, '- deploy first, then run again.');
  process.exit(1);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${base}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: submitted ${urls.length} URLs, response ${res.status} ${res.statusText}`);
