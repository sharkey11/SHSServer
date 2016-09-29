var express = require('express');
var app = express();


//schedule
var request = require('request')
var optionsSchedule = {
  url: 'http://shstv.herokuapp.com/api/schedule/today',
  port: '80',
  method: 'GET',
  json:true
}

setInterval(function(){
  request(optionsSched, function(error, response, body){
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

// //time
// var request = require('request')
// var optionsTime = {
//   url: 'http://shstv.herokuapp.com/api/time/now',
//   port: '80',
//   method: 'GET',
//   json:true
// }
//
// setInterval(function(){
//   request(optionsTime, function(error, response, body){
//     app.get('/time', function(req, res){
//       res.send(body);
//     });
//
//   });
// },1000)
//
// request(optionsTime, function(error, response, body){
//   app.get('/time', function(req, res){
//     res.send(body);
//   });
//
// });


app.listen(8080);
