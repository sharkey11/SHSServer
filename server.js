var express = require('express');
var request = require('request')

var app = express();

var port = process.env.PORT || 8080;


//schedule
var optionsSchedule = {
  url: 'http://shstv.herokuapp.com/api/schedule/today',
  port: '80',
  method: 'GET',
  json:true
}

setInterval(function(){
  request(optionsSchedule, function(error, response, body){
    app.get('/schedule', function(req, res){
      res.send(body);
    });

  });
},1000*60*15)

request(optionsSchedule, function(error, response, body){
  app.get('/schedule', function(req, res){
    res.send(body);
  });

});



app.listen(port, function() {
    console.log('Port:' + port);
});
