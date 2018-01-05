var db = require('../dbConnection');

var QuoteModel = {
    createTable: function (callback) {
        return db.query("CREATE TABLE IF NOT EXISTS quotes(\n" +
            "  id int PRIMARY KEY auto_increment,\n" +
            "  author VARCHAR(255) NOT NULL,\n" +
            "  body varchar(255) NOT NULL,\n" +
            "  author_photo varchar(255));", callback);
    },
    getAllQuotes: function(callback) {
        return db.query("SELECT * FROM quotes", callback);
    },
    searchQuote: function(text, callback) {
        return db.query("SELECT * FROM quotes WHERE body LIKE '%" + text + "%'", callback);
    },
    addQuote: function(quote, callback) {
        return db.query("INSERT INTO quotes VALUES(?,?,?,?)", [null, quote.author, quote.body, quote.author_photo], callback);
    },
    deleteQuote: function(id, callback) {
        return db.query("DELETE FROM quotes WHERE id=?", [id], callback);
    },
    updateQuote: function(id, quote, callback) {
        return db.query("UPDATE quotes SET author=?,body=?,author_photo=? where id=?", [quote.author, quote.body, quote.author_photo, id], callback);
    }
};

module.exports = QuoteModel;
