const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

// High-resolution web & app design pictures from Unsplash for each category
const portfolioDownloads = [
  // 1. Data Analysis (Analytics dashboard, charts, big data visuals)
  {
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    filename: 'portfolio_data_analysis_1.webp',
    width: 900,
    height: 600,
  },
  {
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    filename: 'portfolio_data_analysis_2.webp',
    width: 900,
    height: 600,
  },
  {
    url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
    filename: 'portfolio_data_analysis_3.webp',
    width: 900,
    height: 600,
  },
  {
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
    filename: 'portfolio_data_analysis_right.webp',
    width: 700,
    height: 800,
  },

  // 2. UI / UX Design (Modern web app mockups, clean interface)
  {
    url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    filename: 'portfolio_ui_1.webp',
    width: 900,
    height: 600,
  },
  {
    url: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80',
    filename: 'portfolio_ui_2.webp',
    width: 900,
    height: 600,
  },
  {
    url: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=1200&q=80',
    filename: 'portfolio_ui_3.webp',
    width: 900,
    height: 600,
  },
  {
    url: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=1000&q=80',
    filename: 'portfolio_ui_right.webp',
    width: 700,
    height: 800,
  },

  // 3. Mobile App Development
  {
    url: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=1200&q=80',
    filename: 'portfolio_app_1.webp',
    width: 900,
    height: 600,
  },
  {
    url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    filename: 'portfolio_app_2.webp',
    width: 900,
    height: 600,
  },
  {
    url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80',
    filename: 'portfolio_app_3.webp',
    width: 900,
    height: 600,
  },
  {
    url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80',
    filename: 'portfolio_app_right.webp',
    width: 700,
    height: 800,
  },

  // 4. WordPress & Web CMS Development
  {
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    filename: 'portfolio_wp_1.webp',
    width: 900,
    height: 600,
  },
  {
    url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    filename: 'portfolio_wp_2.webp',
    width: 900,
    height: 600,
  },
  {
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    filename: 'portfolio_wp_3.webp',
    width: 900,
    height: 600,
  },
  {
    url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1000&q=80',
    filename: 'portfolio_wp_right.webp',
    width: 700,
    height: 800,
  },

  // 5. 3D Graphics & Creative Design
  {
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    filename: 'portfolio_3d_1.webp',
    width: 900,
    height: 600,
  },
  {
    url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    filename: 'portfolio_3d_2.webp',
    width: 900,
    height: 600,
  },
  {
    url: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=1200&q=80',
    filename: 'portfolio_3d_3.webp',
    width: 900,
    height: 600,
  },
  {
    url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1000&q=80',
    filename: 'portfolio_3d_right.webp',
    width: 700,
    height: 800,
  },
];

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchBuffer(res.headers.location));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on('data', (d) => chunks.push(d));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function run() {
  const targetDir = path.join(__dirname, '..', 'public', 'images');
  console.log(`Starting to download & optimize 20 portfolio images to: ${targetDir}`);

  for (const item of portfolioDownloads) {
    try {
      console.log(`Fetching: ${item.filename}...`);
      const buf = await fetchBuffer(item.url);
      const outPath = path.join(targetDir, item.filename);

      await sharp(buf)
        .resize(item.width, item.height, { fit: 'cover' })
        .webp({ quality: 82 })
        .toFile(outPath);

      const stats = fs.statSync(outPath);
      console.log(`✓ Created NEW ${item.filename} (${stats.size} bytes)`);
    } catch (err) {
      console.error(`✗ Error on ${item.filename}:`, err.message);
    }
  }

  console.log('All Portfolio & Gallery images successfully generated and replaced!');
}

run();
