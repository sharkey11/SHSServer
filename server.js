require('newrelic');
var express = require('express');
var request = require('request')
var firebase = require('firebase')


var app = express();

var port = process.env.PORT || 8080;
// var notif = {"version" : 14, "message" : "Test 1. 10/16 5:22. Ignore please.","title" : "Testing"}

//get today
var date = new Date();
var properlyFormatted = date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2);

setInterval(function(){
  var oldProperlyFormatted = properlyFormatted;
  date = new Date();
  properlyFormatted = date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2);
  day = days[date.getDay()];


  if (oldProperlyFormatted !== properlyFormatted) {
    retreiveData();
    console.log('Date change.')
  }
}, 5000)

var days = ['we','m','t','w','r','f','we'];
var day = days[date.getDay()];

//config database
var config = {
  apiKey: "AIzaSyA2ZyG13I6qorKu7T9e5fqAs8sj-7KAm_o",
  authDomain: "shsschedule-3af18.firebaseapp.com",
  databaseURL: "https://shsschedule-3af18.firebaseio.com",
  storageBucket: "shsschedule-3af18.appspot.com",
  messagingSenderId: "380362637355",
  "type": "service_account",
  "project_id": "shsschedule-3af18",
  "private_key_id": "dbaba6a7d0525c2d782f6ee0b6e6950d846b1187",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDRJhXGt7gLs32z\nauFA5x7B3BDUrShdfNN0IT0ZKjntQ/yslbAPVrcHbKAtQgRiEFYOd5w3z5DGHY5H\n4axsR71+TSTMAkipDg/ANJstka+AQ7x+KJHxzsQkrF0uZpWQ3b5pHSlQhnS8Cno3\nLn5Kj//rvrWpjwwf4+BLUttmzox/nmBNl5p5b2QjHNpxFWvZg52KeYUC/fvRDVDM\nlZgHxhgC0Gu2fM4JHkVbT0818rG/MZZ1GBQv+BktqBRhsNJTYPx4jEZleFg6QspW\nik/0PVB2JiMNiXPU7FB20MpRfVwCU8IjLIeigkjv2ZCmTpSQP3BGtha0Pmeki8DL\nR6SkxZuxAgMBAAECggEBAM0zfLIXlu+ED5R1DMRM/pRdgfXoXm47BowuAHAsSeFM\njyAVTUP/ZFxYa198IijEtmpDWHY5pGV8ohhMhotGZ9j/f1bZ9shHD5UZCBdRlMtX\nqhxtWaPRpggFRPc9lwknRqaDAgILqYTFEtwJNceaORHnbv0JaG/xeCLvDGx1wsuB\npgkLbKJi4a8zdAdhqesqfbrtv7wCH7hvdFmZpUW5+3JgzuMqe0lpXIBOG9bqHeIH\n03T1BN+plPNajtifLU9PZQhQgvLX6eaNJ3WedwQTrdsIjElTIqoBERZa1Vx29sa1\nXQbg3QYx2h0LWIw5a4u2ILlOB98EutL+Qh26/Y4iZfECgYEA6rZFI224/E/REsAt\nyzDPG77kSKzGZmxWD4fgXrVbN0SUrE7LjmmrzLORMCxJPBvi2DQo+Sy86QkP7Pha\nstwKcVbMl8X3hGkIk+1SvBNgLpuJQUVvu21R/DOjGreZ5UUM4svRpG3+ZE5OiNMv\nJeSsFWO2p+wIU9EjsUa4ZKeZPcsCgYEA5B5EiiIOxmnlw+ven+QrMfCciOowJcMw\nNHG8ojmHdZBmMxpSUtxwTD+tEIqmRXJ9VbduwX5XHmHorf/3XAEjJqjy5qaogqr2\naQrmRrW+PsuiJ+zj7K7erzLOuWXkFoMBZCRKc/RTGLosfckU/HcMEUQdkyKuRk9t\nxf2SZ/DxXPMCgYEA0KdqvT0spzj5n1azHyBr7bl8zdKyqZkDxNjBMNC+n1pbZPbD\nZP4x2U+E8bNdA4+y0QtFpYYNBomk28BJORn+OpW0WfSGvvJ0yrS+yS3cYnKoyRrG\nYnOj37Wz+OthZ31EIFabLzcNYPRwQpijIGeyR22Wkp91I7YXqeA5ylloFJMCgYBW\n0EILQ6zVy8VaS3B87wuVRNl9rYpHRMIao1JDdptbnWmXdyPvTt8Z1X3adrmSYmDa\ndyWaU6d5847mcSxFAlXLR66xIqmsmL2P+krqjA3rvflnMlsHXwF2MWLE4cbs3kxw\nPPNsr4XUOj3mXNk0v2WDSKXssd0a+u1u1PKbxfFFCwKBgE5If/KOOV9HgRUEeg+d\nomsCmWzvsv2eOF3PRSDS8gciPKc/Q21uIAVeilotFUlYeU8LxyaEje4rIXgWslaz\nQf4Pq0QPUXlzL5k814UqF2XVdxUUDCp2OWwzRquvAW18C8dEuG+Lk2s0lFgnQ62m\nSJGaA6tFyAXQaa2gRf7VoGQO\n-----END PRIVATE KEY-----\n",
  "client_email": "heroku@shsschedule-3af18.iam.gserviceaccount.com",
  "client_id": "106516623017462882714",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/heroku%40shsschedule-3af18.iam.gserviceaccount.com"

};
firebase.initializeApp(config);


//search database
var rootRef = firebase.database().ref();
var rootRefNotif = firebase.database().ref("notif");
var usersRef = rootRef.child(properlyFormatted);

var db = firebase.database();
var ref = db.ref(properlyFormatted);

var schedule;

rootRef.on("child_added", function(snapshot) {
  retreiveData();
})

rootRefNotif.on("child_added", function(snapshot) {
  retrieveNotif();
})

function retrieveNotif(){
  rootRefNotif.on("value", function(snapshot) {
     notif = snapshot.val();
     app.get('/push', function(req, res){
       res.send(notif);
     })
   })
}
function retreiveData() {
  ref.on("value", function(snapshot) {
     schedule = snapshot.val();

    if (snapshot.val() !== null) {
      app.get('/', function(req, res){
        res.send(schedule);
      });
    } else {
      var ref2 = db.ref(day);
      ref2.on("value", function(snapshot) {
         schedule = snapshot.val();
        app.get('/', function(req, res){
          res.send(schedule);
        });

      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    }
  })
}






//notifcation page
// app.get('/push', function(req, res){
//   res.send(notif);
// });



app.listen(port, function() {
  console.log('Port:' + port);
});
