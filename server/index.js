const tables = require('./tables.json')
const members = require('./members.json')

var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors())

app.get('/', function (req, res, next) {
    res.send('Hello World!');
});

app.get('/api', function (req, res, next) {
  res.send('Hello World!');
});
  
app.get('/api/tables', function (req, res, next){
    res.header("Content-Type",'application/json');
    res.json(tables);
});

app.get('/api/members', function (req, res, next){
    res.header("Content-Type",'application/json');
    res.json(members);
});

app.listen(3001, function () {
  console.log('Blackjack server listening on port 3001!', mode='debug');
});