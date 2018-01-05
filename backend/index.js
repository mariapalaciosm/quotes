var express = require('express');
// svar winston = require('winston');
// var expressWinston = require('express-winston');
var bodyParser = require('body-parser');
var quoteModel = require('./Models/quotesModel');
var authorModel = require('./Models/authorModel');
var userModel = require('./Models/userModel');
var path = require('path');
var cors = require('cors');



var app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

//This middleware shows us all the requests we are recieving
// app.use(expressWinston.logger({
//   transports: [
//     new winston.transports.Console({
//       colorize: true
//     })
//   ],
//   meta: false,
//   msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
//   colorStatus: true
// }));

//app.get('*', function(req, res, next) {
    //next();
//    res.sendFile('./frontend/index.html');
//});

quoteModel.createTable(function(err) {
    if (err) throw err;
});

authorModel.createTable(function(err) {
    if (err) throw err;
});
userModel.createTable(function(err) {
    if (err) throw err;
});

//Routes
app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/quote', require('./routes/quotes'));
app.use('/auth', require('./routes/authentification'));

app.route('/*')
  .get((req, res) => {
    // res.sendFile('./frontend/index.html');
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));

//    res.sendFile('frontend/index.html' , { root : __dirname});
    // res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
  });

var port =  process.env.PORT || 8080;

app.listen(port, function () {
});
