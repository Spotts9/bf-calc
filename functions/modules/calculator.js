var math = require('mathjs');
var moment = require('moment');

var calculator = {

 MWT: function(wrestlerInfo){
   console.log(wrestlerInfo);
   var randNum1 = .000815;
   var randNum2 = 1.0973;
   var randNum3 = .00000084;

   var scapSF = math.mean(wrestlerInfo.scap);
   var triSF = math.mean(wrestlerInfo.tri);
   var absSF = math.mean(wrestlerInfo.abs);

   var sumSF = math.sum(scapSF, triSF, absSF);

   var BD = math.add(math.subtract(randNum2, math.multiply(sumSF, randNum1)), math.multiply(math.pow(sumSF, 2), randNum3));

   console.log(BD);

   var BF = math.subtract(math.divide(457, BD),math.multiply(4.142, 100));

   var mww1 = math.divide(math.multiply(math.subtract(1,math.divide(BF,100)),wrestlerInfo.baseWeight), .93);

   var FW = math.multiply(wrestlerInfo.baseWeight, math.divide(BF, 100));
   // console.log("FW " + FW);
   var LBM = math.subtract(wrestlerInfo.baseWeight, FW);
   // console.log("LBM " + LBM);
   var MWW = math.round(math.divide(LBM, .93),4);

   // console.log("Firtst method: "+ mww1);
   // console.log("Second method: " + MWW);

   return MWW;
 },

 calculateDates: function(weightClasses, wrestler){
   var currentWTIndex = determineCurrentWtClass(weightClasses, wrestler.baseWeight);
   var minWtIndex = determineMinWtClass(weightClasses, wrestler.mww);
   var lossPerDay = determineWtLossPerDay(wrestler.baseWeight);
   var byDate = moment(wrestler.testDate);
   // var byDate = moment("11/27/2017");
   console.log(byDate.format("MM/DD/YYYY"));
   console.log(currentWTIndex + " : " + weightClasses[currentWTIndex]);

   return canMakeWeight(wrestler.baseWeight,lossPerDay,byDate,currentWTIndex,minWtIndex,weightClasses);
   // return;

   function canMakeWeight(tempWeight, lossPerDay, byDate, curIndex, minWtIndex, weightClasses){
     var validDates = [];
     //var makeDate = byDate.clone();
     for (var days = 0;curIndex >= minWtIndex;days++){
       console.log("DAYS:  " + days);
       if (tempWeight <= weightClasses[curIndex]){
         var makeDate = byDate.clone();
         validDates.push(new MilestoneDate(weightClasses[curIndex], makeDate.add(days, 'days').format("MM/DD/YYYY")));  // Add to the list of Weights and dates
         curIndex --;  //move down one weight Class
         days--;
       }
       else{
         tempWeight -= lossPerDay;  //reduce weight by the amount allowed per day;
       }
     }
     console.log("in new function");
     return validDates;
   }

   function MilestoneDate (weightClass, byDate){
     this.weightClass = weightClass;
     this.byDate = byDate;
     return this;
   }
   function determineWtLossPerDay(baseWeight){
     return math.divide(math.multiply(baseWeight, .015), 7);
   }
   function determineCurrentWtClass(classes, currentWeight){
     var index =0;
     for (var i = 0, len = classes.length; i < len; i++) {
       if (currentWeight <= classes[i]){
         return i;
       }
     }
   }
   function determineMinWtClass(classes, mww){
     var index =0;
     for (var i = 0, len = classes.length; i < len; i++) {
       if (mww <= classes[i]){
         return i;
       }
     }
   }
 }

}

module.exports = calculator;
