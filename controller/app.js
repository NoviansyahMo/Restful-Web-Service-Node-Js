var express = require('express');
var app = express();
var user = require('../model/user.js')
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/api/user/:userid', function (req, res){
    var id = req.params.userid;

    user.getUser(id, function (err, result){
        if (!err){
            res.send(result);
        }else{
            res.status(500).send("Some error");
        }
    });
});

app.get('/api/user', function (req,res) {

    user.getUsers( function (err, result){
        if (!err) {
            res.send(result);
        }
        else{
            console.log(result);

            res.status(500).send("Some error");
        }
    });
});

app.post('/api/user/:userid', urlencodedParser, function (req, res){

    var userid = req.body.userid;
    var email = req.body.email;
    var password = req.body.password;

    user.updateUser(email, password, userid, function (err, result){
        if (!err) {
            console.log(result);
            res.send(result + ' record updated');
        } else{
            res.send(err.statusCode);

        }
    });
});

app.post('/api/user', urlencodedParser, function (req,res){

    var username = req.body.username;
    var email = req.body.email;
    var role = req.body.role;
    var password = req.body.password;

    user.addUser(username, email, role, password, function (err, result){
        if (!err) {
            console.log(result);
            res.send(result + ' record inserted');
        } else{
            res.send(err.statusCode);

        }
    });
});

app.delete('/api/user', function (req, res) {

    var userid = req.params.userid;

    user.deleteUser(userid, function (err, result){
        if (!err) {
            res.send(result + ' record deleted');
        } else{
            console.log(err);

            res.status(500).send("some error");
        }
    });
});

module.exports = app