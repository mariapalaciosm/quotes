var db = require('../dbConnection');

var AuthorModel = {
    createTable: function (callback) {
        return db.query("CREATE TABLE IF NOT EXISTS authors(\n" +
            "  name VARCHAR(255) PRIMARY KEY,\n" +
            "  photo varchar(255));", callback);
    },
    getAllAuthors: function(callback) {
        return db.query("SELECT * FROM authors", callback);
    },
    getAuthorByName: function(name, callback) {
        return db.query("SELECT * FROM authors WHERE name=?", [name], callback);
    },
    addAuthor: function(author, callback) {
        return db.query("INSERT INTO authors VALUES(?,?)", [author.name, author.photo], callback);
    },
    deleteTask: function(id, callback) {
        return db.query("delete from task where Id=?", [id], callback);
    },
    updateAuthor: function(authorName, newAuthor, callback) {
        return db.query("UPDATE authors SET name=?,photo=? WHERE name=?", [newAuthor.name, newAuthor.photo, authorName], callback);
    }
};

module.exports = AuthorModel;