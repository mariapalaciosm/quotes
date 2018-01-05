var db = require('../dbConnection');

var UserModel = {
    createTable: function (callback) {
        return db.query("CREATE TABLE IF NOT EXISTS users(\n" +
            "  id int PRIMARY KEY auto_increment,\n" +
            "  email VARCHAR(255) NOT NULL,\n" +
            "  password varchar(255) NOT NULL);", callback);
    },
    getUser: function(email, password, callback) {
        return db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], callback);
    }
};

module.exports = UserModel;