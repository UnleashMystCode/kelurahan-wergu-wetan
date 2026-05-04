const https = require('https');

const topics = [
  "Bambu", "Jenang_Kudus", "Telur_asin", "Koperasi", "Pasar_malam",
  "Karang_taruna", "Ketoprak_(Jawa)", "Siskamling", "Gizi", "Wirausaha",
  "Taman_kota", "Arsitektur_kolonial", "Puskesmas", "Futsal", "Perpustakaan_Nasional_Republik_Indonesia",
  "Masjid_Agung_Demak", "Santri", "Ketupat", "Gereja_Blenduk", "Batik"
];

async function fetchWikiImage(title) {
  return new Promise((resolve) => {
    const url = `https://id.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(title)}&pithumbsize=800&format=json`;
    const options = {
      headers: { 'User-Agent': 'CoolBot/1.0 (test@example.com)' }
    };
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pages[pageId].thumbnail && pages[pageId].thumbnail.source) {
            resolve(pages[pageId].thumbnail.source);
          } else {
            resolve(null);
          }
        } catch(e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function main() {
  const results = {};
  for (const topic of topics) {
    const img = await fetchWikiImage(topic);
    results[topic] = img;
  }
  console.log(JSON.stringify(results, null, 2));
}

main();
