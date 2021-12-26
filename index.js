const fs = require('fs');
const path = require('path');
const Client = require('ssh2-sftp-client');
const { parse } = require('node-html-parser');

class Sitemap {
  constructor(options) {
    this.options = options;
  }

  uploadToServer = () => {
    const sftp = new Client();

    const fileName = path.parse(this.options.source);

    const sourcePath = fs.createReadStream(this.options.source);

    sftp.connect({
      host: this.options.host,
      port: this.options.port || '22',
      username: this.options.username,
      password: this.options.password || null,
      privateKey: this.options.privateKey || null
    }).then(() => {
      return sftp.put(sourcePath, this.options.remotePath + fileName.base);
    }).then((data) => {
      console.log(data);
      return sftp.end();
    }).catch(err => console.log(err));
  }

  generateSitemap = async (url, className, limit) => {
    const browser = await pup.launch({ headless: false });
    const page = await browser.newPage();

    const prefix = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    const postfix = `</urlset>`;

    fs.appendFileSync('sitemap.xml', prefix);

    for (let i = 1; i <= limit; i++) {
      await page.goto(url + i);

      const pageSource = await page.evaluate(() => document.documentElement.outerHTML);

      await page.waitForTimeout(1000);
      const root = parse(pageSource);

      const date = new Date();
      const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

      const hrefs = root.querySelectorAll(`.${className}`)?.map(value => {
        return `
      <url>
      <loc>${value.attributes.href}</loc>
      <lastmod>${today}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
      </url>\n`;
      });

      fs.appendFileSync('sitemap.xml', hrefs.join(''));
    }

    fs.appendFileSync('sitemap.xml', postfix);
  }

  // submitToGoogle = async (username) => {
  //   const browser = await pup.launch({ headless: false });
  //   const page = await browser.newPage();

  //   await page.goto(`https://search.google.com/search-console`);
  //   const button = await page.$('.FKF6mc.TpQm9d')
  //   await button.evaluate(b => b.click());
  //   await page.waitForTimeout(2000);

  //   await page.waitForSelector('#identifierId');

  //   await page.type('#identifierId', username);

  //   await page.waitForTimeout(4000);
    
  //   const nextBtn = await page.$('.VfPpkd-vQzf8d');

  //   await nextBtn.evaluate(n => n.click());
  // }

}

module.exports = Sitemap;

