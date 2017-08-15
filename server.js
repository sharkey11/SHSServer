var express = require('express')
var request = require('request')
var firebase = require('firebase')


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
  "client_email": "heroku@shsschedule-3af18.iam.gserviceaccount.com",
  "client_id": "106516623017462882714",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/heroku%40shsschedule-3af18.iam.gserviceaccount.com"

};
firebase.initializeApp(config);

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

          var datesDB = db.ref("dates").child(fullDateDB);

          datesDB.on("value", function(snapshot) {

            dates = snapshot.val();

            var type = dates.TYPE
            console.log(type)
            if (type == undefined) {
              type = "X"
            }
            var scheduleDB = db.ref("schedules").child(type);

            scheduleDB.on("value", function(snapshot) {
              schedule = snapshot.val();
              res.send(schedule);

            })
          })
        })
      })
    }
  })
}



app.listen(port, function() {
  console.log('Port:' + port);
});
