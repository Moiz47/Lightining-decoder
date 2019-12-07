var express = require('express');
var app = express();
var path = require('path')
const bodyParser = require('body-parser')
const bolt = require('bolt11')
 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/front.html'));
});

//app.get('/.well-known/acme-challenge', function(req, res) {
//    res.send('pong');
//});


console.log(path.join(`${__dirname}/.well-known/acme-challenge`));
app.use('/.well-known/acme-challenge', express.static(path.join(`${__dirname}/.well-known/acme-challenge`), { dotfiles: 'allow' } ));

app.post('/', function(req, res){
    var printText = req.body.t;
    var decoded = bolt.decode(printText);
    res.json({decode: decoded})
});

app.listen(3005, function(){
    console.log("Server started")
});




