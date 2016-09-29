var express = require('express');
var request = require('request')

var app = express();

var port = process.env.PORT || 8080;
var notif = {"version" : 13, "message" : "Beta testers, the beta phase is nearing completion. If there are ANY bugs or mishaps, please report them to me immediately. -Jack ","title" : "FINAL MESSAGE FOR BETA TESTERS"}



//schedule
var optionsSchedule = {
  url: 'https://tv.csapp.westport.k12.ct.us/api/schedule/today',
  port: '443',
  method: 'GET',
  json:true
}

setInterval(function(){
  request(optionsSchedule, function(error, response, body){
    app.get('/', function(req, res){
      console.log(res.statusCode)
      res.send(body);
    });

  });
},1000*60*15)

request(optionsSchedule, function(error, response, body){
  app.get('/', function(req, res){
    console.log(res.statusCode)
    res.send(body);
  });

});

app.get('/push', function(req, res){
  console.log(res.statusCode)
  res.send(notif);
});



app.listen(port, function() {
    console.log('Port:' + port);
});
