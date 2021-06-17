var express = require('express');
var app = require('express')();
var path = require('path');
var compression = require('compression');
var fs = require("fs");
var https = require('https')
var port = 5984;
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// global.__rootRequire = function (relpath) {
//     return require(path.join(__dirname, relpath));
// };

app.use(compression());
// app.use(express.static('dist'));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});
// for staging suppose
// const httpsOptions = {
//   key: fs.readFileSync('/home/gitlab-runner/SSL_Free_24Jan2019/meanstack_stagingsdei_com.key', 'utf8'),
//   cert: fs.readFileSync('/home/gitlab-runner/SSL_Free_24Jan2019/meanstack_stagingsdei_com.crt', 'utf8')
// }
// var server = https.createServer(httpsOptions, app).listen(port, () =>
//  { console.log('server running at ' + port) 
// });
console.log('port', port);
// for live suppose
app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('server stared');
  }
});


module.exports = app; // for testing