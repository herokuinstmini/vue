// const express = require('express');
// const path = require('path');
// const serveStatic = require('serve-static');

// const app = express();
// app.use(serveStatic(__dirname + "/dist"));

// const port = process.env.PORT || 5000;
// app.listen(port);

// console.log('server started '+ port);

// const express = require('express');
// const path = require('path');
// const history = require('connect-history-api-fallback');

// const app = express();

// const staticFileMiddleware = express.static(path.join(__dirname + '/dist'));

// app.use(staticFileMiddleware);
// app.use(history({
//   disableDotRule: true,
//   verbose: true
// }));
// // app.use(staticFileMiddleware);

// app.get('/', function (req, res) {
//   res.render(path.join(__dirname + '/dist/index.html'));
// });

// var server = app.listen(process.env.PORT || 8080, function () {
//   var port = server.address().port;
//   console.log("App now running on port", port);
// });

const express = require('express');
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname + "/dist/"));
app.get(/.*/, function(req, res) {
    res.sendFile(__dirname + "/dist/index.html")
});
app.listen(port);
console.log('server started!');