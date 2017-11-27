var math = require('mathjs');

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

 calculateDates: function(weightClasses){
   console.log('Hello From method2:  ' + weightClasses);
   canMakeWeight(123,135);
   return;

   function canMakeWeight(tempWt, baseWeight){
     console.log("in new function");
     return;
   }
 }

}

module.exports = calculator;
