# SITEMAP GEN SPA

const Sitemap = require('sitemap-gen-spa')

const options = {
  host: '*.*.*.*',
  password: "password",
  username: "server_username",
  remotePath: "path_for_sitemap on the server",
  source: './sitemap.xml',
  privateKey: fs.readFileSync(__dirname + "/key.pem")
}

const sitemap = new Sitemap(options);
sitemap.uploadToServer();
sitemap.generateSitemap('url', 'link class', number_of_pages);