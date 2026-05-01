const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, 'public', 'images', 'potensi');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

// 20 high-quality, relevant Unsplash Image IDs
// We use these because Unsplash source is deprecated but direct photo IDs work perfectly if downloaded
const images = [
  // Ekonomi (bambu, jenang, telur, jahit, kuliner)
  { id: '1', url: 'https://images.unsplash.com/photo-1481437156560-3205f6a55735?w=800&q=80' }, // Market
  { id: '2', url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80' }, // Store
  { id: '3', url: 'https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?w=800&q=80' }, // Farm/Agriculture
  { id: '4', url: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&q=80' }, // Business/Sewing
  { id: '5', url: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=800&q=80' }, // Street food

  // Sosial (pemuda, seni, siskamling, dapur, wirausaha)
  { id: '6', url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80' }, // Community
  { id: '7', url: 'https://images.unsplash.com/photo-1529156069898-49953eb1b50c?w=800&q=80' }, // Team/Art
  { id: '8', url: 'https://images.unsplash.com/photo-1531206715517-5c0ba140fea2?w=800&q=80' }, // Security/Tech
  { id: '9', url: 'https://images.unsplash.com/photo-1556484687-30636164638a?w=800&q=80' }, // Cooking
  { id: '10', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80' }, // Training/Youth

  // Fasilitas (taman, balai desa, pustu, futsal, perpus)
  { id: '11', url: 'https://images.unsplash.com/photo-1496851473196-e26508c21494?w=800&q=80' }, // Park
  { id: '12', url: 'https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?w=800&q=80' }, // Building
  { id: '13', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80' }, // Clinic
  { id: '14', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80' }, // Sports
  { id: '15', url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80' }, // Library

  // Keagamaan (masjid, tahfidz, syawalan, gereja, taklim)
  { id: '16', url: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800&q=80' }, // Mosque
  { id: '17', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80' }, // Kids learning
  { id: '18', url: 'https://images.unsplash.com/photo-1543352634-99a5d50ae78e?w=800&q=80' }, // Food/Community
  { id: '19', url: 'https://images.unsplash.com/photo-1438032005730-c7aedb098c71?w=800&q=80' }, // Church
  { id: '20', url: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80' }  // Women gathering
];

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error("Failed to get " + url + " (" + res.statusCode + ")"));
      }
      const file = fs.createWriteStream(filepath);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', err => {
      fs.unlink(filepath, () => reject(err));
    });
  });
}

async function main() {
  for (const img of images) {
    const dest = path.join(dir, img.id + '.jpg');
    console.log("Downloading " + img.url + " to " + dest + "...");
    try {
      await downloadImage(img.url, dest);
      console.log("Success: " + img.id + ".jpg");
    } catch (e) {
      console.error("Error downloading " + img.id + ".jpg: ", e.message);
    }
  }
  console.log("All downloads completed.");
}

main();
