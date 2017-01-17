var express = require('express')
var request = require('request')
var firebase = require('firebase')


var app = express();

var port = process.env.PORT || 8080;

//get today
var date = new Date();
var properlyFormatted = date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2);

//get time
var localSeconds = date.getSeconds();
var localMinutes = date.getMinutes();
var localHours = date.getHours();



setInterval(function(){
  var oldProperlyFormatted = properlyFormatted;
  date = new Date();
  properlyFormatted = date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2);
  day = days[date.getDay()];


  if (oldProperlyFormatted !== properlyFormatted) {
    retreiveData();
    console.log('Date change.')
  }

  var localSeconds = date.getSeconds();
  var localMinutes = date.getMinutes();
  var localHours = date.getHours();

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

function getDayName(dateString) {
  return ['m','t','w','r','f','we','we'][new Date(dateString).getDay()];
}

//search database
var rootRef = firebase.database().ref();
var rootRefNotif = firebase.database().ref("notif");
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

app.get('/time',function(req,res){
  var time = new Date();
  var localSeconds = time.getSeconds();
  var localMinutes = time.getMinutes();
  var localHours = time.getHours();

  // if (localSeconds < 60 && localSeconds > 7) {
  //   localSeconds =- 7;
  // } else if (localSeconds < 7) {
  //   var temp = 60 - localSeconds;
  //
  // }

  res.send({"hours":localHours,"mins":localMinutes,"secs":localSeconds})
})

function retreiveData() {

  var usersRef = rootRef.child(properlyFormatted);

  var db = firebase.database();
  var ref = db.ref(properlyFormatted);

  ref.on("value", function(snapshot) {
    schedule = snapshot.val();


    app.get('/', function(req, res){
      res.send('Server managed by Jack Sharkey. Please email sharkeyjack11@gmail.com if you require assistance.');
    });

    var scheduleLink = '/schedule*'


    if (snapshot.val() !== null) {
      app.get(scheduleLink, function(req, res){
        res.send(schedule);
        // console.log(schedule)
      });
    } else {
      var ref2 = db.ref(day);
      ref2.on("value", function(snapshot) {

        schedule = snapshot.val();
        app.get(scheduleLink, function(req, res){


          var full = req.url


          var date = full.substring(10)
          if (date === "today" || full === "/schedule" || full === "/schedule/") {
            var rightNow = new Date();
            var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
            var date = (new Date(Date.now() - tzoffset)).toISOString().slice(0,10).replace(/-/g,"");
            var year = date.substring(0,4)
            var month = date.substring(4,6)
            var day = date.substring(6,8)
            var fullDateDB = year+month+day;
            var fullDate = year + '-' + month + '-' + day
            var today = true;
          } else {
            var year = date.substring(0,4)
            var month = date.substring(4,6)
            var day = date.substring(6,8)
            var fullDateDB = year+month+day;
            var fullDate = year + '-' + month + '-' + day
          }

          var ref3 = db.ref(fullDateDB);

          ref3.on("value", function(snapshot) {

            schedule = snapshot.val();


            if (schedule == null) {
              console.log('2')
              var whichDay = getDayName(fullDate);
              var ref2 = db.ref(whichDay);

              console.log(whichDay)
              var ref2 = db.ref(whichDay);
              ref2.on("value", function(snapshot) {

                schedule = snapshot.val();
                // res.redirect('/schedule/');

                console.log(schedule)


              })
            }
            res.send(schedule);

          })




        })
      });
    }
  })
}


app.listen(port, function() {
  console.log('Port:' + port);
});
