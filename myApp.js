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


// 3) Mitigate the Risk of Clickjacking with helmet.frameguard()
// Your page could be put in a <frame> or <iframe> without your consent. This can result in clickjacking attacks, among other things.
// Clickjacking is a technique of tricking a user into interacting with a page different from what the user thinks it is. This can be obtained by executing your page in a malicious context, by means of iframing. In that context, a hacker can put a hidden layer over your page. Hidden buttons can be used to run bad scripts. 
// This middleware sets the X-Frame-Options header. It restricts who can put your site in a frame. It has three modes: DENY, SAMEORIGIN, and ALLOW-FROM.
// Use helmet.frameguard() passing with the configuration object {action: 'deny'}.
app.use(helmet.frameguard({action: 'deny'}));













































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
