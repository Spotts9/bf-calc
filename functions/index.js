const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const engines = require('consolidate');
const hbs = require('handlebars');
const hbsHelpers = require('handlebars-form-helpers').register(hbs);
const calculator = require('./modules/calculator');
// const bootstrap = require('bootstrap');

const firebaseApp = firebase.initializeApp(
  functions.config().firebase
);

function getWeights(){
  const ref = firebaseApp.database().ref('/');
  return ref.once('value').then(snap => snap.val());
}

function getWeightClasses(){
  const weights = [106,113,120,126,132,138,145,152,160,170,182,195,220,285];
  return weights;
}
const app = express();

app.engine('hbs', engines.handlebars);
//hbsHelpers.register(engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator()); // Add this after the bodyParser middlewares!

app.get('/info', (request, response) => {
  // getWeights().then(weights => {
  //   console.log(weights);
  // });
  response.render('index');
});

app.post('/calcWeights', (request, response) => {
   console.log(request.body);
   //var mwt = calculator.MWT(request.body);
   var weightClasses = getWeightClasses();
   calculator.calculateDates(weightClasses);

   var weight1 = {"class": 120, "date":"11/20/2017"};
   var weight2 = {"class": 113, "date": "12/10/2017"};

   var results  = [weight1, weight2];

   response.render('results', {results});
});
exports.app = functions.https.onRequest(app);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
