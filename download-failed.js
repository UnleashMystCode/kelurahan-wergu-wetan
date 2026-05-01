const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, 'public', 'images', 'potensi');

const images = [
  { id: '7', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Ketoprak_Sasono_Hinggil_3.jpg/800px-Ketoprak_Sasono_Hinggil_3.jpg' },
  { id: '8', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/LOGO-PERPUSNAS.svg/960px-LOGO-PERPUSNAS.svg.png' },
  { id: '9', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Indonesian_women_cooking.jpg/800px-Indonesian_women_cooking.jpg' },
  { id: '19', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Hortus_Deliciarum%2C_Das_Geb%C3%A4ude_der_Kirche_mit_den_Gl%C3%A4ubigen.JPG/960px-Hortus_Deliciarum%2C_Das_Geb%C3%A4ude_der_Kirche_mit_den_Gl%C3%A4ubigen.JPG' }
];

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'CoolBot/1.0 (test@example.com)' }}, (res) => {
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
      // Fallback copy if Wikipedia fails
      fs.copyFileSync(path.join(__dirname, 'public', 'images', 'hero_office.png'), dest);
      console.log("Copied fallback for: " + img.id + ".jpg");
    }
  }
  console.log("All downloads completed.");
}

main();
