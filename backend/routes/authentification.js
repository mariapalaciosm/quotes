var jwt = require('jsonwebtoken');
var authRouter = require('express').Router();
var UserModel = require('../Models/userModel');
/**
 * This function will generate an authentication token to send to the user. The client uses that token to access
 * the protected routes in the API.
 */

var secret = "S0m3ultr4s3cur3s3cr3t";

authRouter.post('/', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    UserModel.getUser(email, password, function (err, results) {
        if(err) throw err;
        if(!results || results.length === 0) {
            res.status(401).send('User not found.');
        }
        else {
            var usersString = JSON.stringify(results);
            var userArray = JSON.parse(usersString);
            var user = userArray[0];
            var token = jwt.sign(user, secret, {
                expiresIn: "7 days" // expires in 7 days
            });
            res.json({
                token: token
            });
        }

    });
});

module.exports = authRouter;
