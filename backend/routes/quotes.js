var quotesRouter = require('express').Router();
var QuoteModel = require('../Models/quotesModel');
var express_jwt = require('express-jwt');
var secret = "S0m3ultr4s3cur3s3cr3t";

quotesRouter.get('/', function (req, res) {
      QuoteModel.getAllQuotes(function(err, results) {
          if (err) throw err;
          return res.status(200).send({ error: false, data: results, message: 'Quotes list' });
      });
});

quotesRouter.post('/', express_jwt({secret: secret}), function(req, res) {
  if (req.body.text) {
      QuoteModel.searchQuote(req.body.text, function(err, results) {
          if (err) throw err;
          return res.status(200).send({ error: false, data: results, message: 'Quotes search result' });
      });
  }
  else {
      var quote = {
          author: req.body.author,
          body: req.body.body,
          author_photo: req.body.author_photo
      };
      QuoteModel.addQuote(quote, function(err, results) {
          if (err) throw err;
          return res.status(200).send({ error: false, data: results, message: 'Quote inserted' });
      });
  }
});

quotesRouter.put('/', function (req, res) {
  var quote = {
      id: req.body.id,
      author: req.body.author,
      body: req.body.body,
      author_photo: req.body.author_photo
  };
    QuoteModel.updateQuote(quote.id, quote, function (err, results) {
        if (err) throw err;
        return res.status(200).send({ error: false, data: results, message: 'Quote updated' });
    });
});


module.exports = quotesRouter;
