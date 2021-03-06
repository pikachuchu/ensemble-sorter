var express = require('express');
var app = express();
var routes = require('./routes');

app.use('/', routes);

var server = app.listen(process.env.port || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Ensemble Sorter listening at http://%s:%s', host, port);
});
