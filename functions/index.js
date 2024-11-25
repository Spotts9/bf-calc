const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const validator = require('express-validator');
const engines = require('consolidate');
var hbs = require('handlebars');
const hbsHelpers = require('handlebars-form-helpers').register(hbs);
const calculator = require('./modules/calculator');

const app = express();
app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(validator); // Add this after the bodyParser middlewares!

var admin = require("firebase-admin");

// var serviceAccount = require("./bfcalc-firebase-adminsdk-8rj4c-0cddd7709b.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://bfcalc.firebaseio.com"
// });
admin.initializeApp(functions.config().firebase);

app.get('/info', (request, response) => {
    // getWeights().then(weights => {
    //   console.log(weights);
    // });
    response.render('index');
  });

  app.post('/calcWeights', (request, response) => {
    console.log(request.body);
    var mwt = calculator.MWT(request.body);
    request.body.mww = mwt;
    var name = request.body.name;
    var weightClasses = getWeightClasses();
    var results = calculator.calculateDates(weightClasses, request.body);
 
    response.render('results', {results, mwt, name});
 });


 function getWeights(){
  const ref = firebaseApp.database().ref('/');
  return ref.once('value').then(snap => snap.val());
}

function getWeightClasses(){
  // const weights = [106,113,120,126,132,138,145,152,160,170,182,195,220,285];
  const boys = [ 106,113,120,126,132,138,144,150,157,165,175,190,215,285];
  const girls = [ 100,105,110,115,120,125,130,135,140,145,155,170,190,235];
  return boys;
}

  exports.app = functions.https.onRequest(app);
