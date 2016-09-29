var express = require('express');
var request = require('request')

var app = express();

var port = process.env.PORT || 8080;


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
      res.send(body);
    });

  });
},1000*60*15)

request(optionsSchedule, function(error, response, body){
  app.get('/', function(req, res){
    res.send(body);
  });

});



app.listen(port, function() {
    console.log('Port:' + port);
});
