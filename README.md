# Generate a sitemap for SPA's and Upload directly to Dedicated Server or VPS 

Simple nodejs module for generating sitemap and upload it to server.

## Installation

npm i sitemap-gen-spa / yarn add sitemap-gen-spa

```bash
yarn add sitemap-gen-spa
```

## Usage

```javascript
const Sitemap = require('sitemap-gen-spa');

// To generate only sitemap
const sitemap = new Sitemap();
sitemap.generateSitemap(`url`, `class_name`, `number_of_pages`);

// For Uploading sitemap.xml to server -- Optional, can use any method
const options = {
  host: 'IP',
  password: "password_of_server", // Optional if key file
  username: "server_username_auth",
  remotePath: "path_on_server_to_store_sitemap",
  source: './sitemap.xml',
  privateKey: fs.readFileSync(__dirname + "/key.pem")
}

const sitemap = new Sitemap(options);
sitemap.uploadToServer();

```
Example: http://gogoanimehome.com
![Foo](https://gogoanime.co.in/example.PNG)
Here every animes has className="videoLink"
