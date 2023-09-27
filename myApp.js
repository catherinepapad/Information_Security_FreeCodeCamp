const express = require('express');
const app = express();

// CHALLENGES 
// **************

// 1) Install and Require Helmet
// Helmet helps you secure your Express apps by setting various HTTP headers.
// Require helmet
let helmet = require('helmet');


// 2) Hide Potentially Dangerous Information Using helmet.hidePoweredBy()
// Hackers can exploit known vulnerabilities in Express/Node if they see that your site is powered by Express. 
// X-Powered-By: Express is sent in every request coming from Express by default. 
// Use the helmet.hidePoweredBy() middleware to remove the X-Powered-By header.
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0'}));













































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
