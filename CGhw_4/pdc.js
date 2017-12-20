// server as good example to use export
// (to expose only necessary data)
//
// methods
// pdcSetRef (yy)
// pdcUpdate (yNow)
//
// static value (stayed in this file)
// yref: desired value
// yy: current value
// vv: current change rate of yy
//
var pdcYref = 0,pdcYref2 = 0;
var pdcYY,pdcYY2;
var pdcVV = 0,pdcVV2 = 0;
const KP = 200;
const KD = 5;

function pdcSetRef (yref) {
   pdcYref = yref;   
}
function pdcSetRef2 (yref) {
   pdcYref2 = yref;   
}

function pdcUpdate (yNow, dt = 0.01) { // may not need to pass dt

  pdcYY = yNow;
  
  let f = feedbackForce(pdcYY);
  // let dt = 0.01;
  pdcVV += f*dt;
  pdcYY += pdcVV*dt
  
  return pdcYY;	
}
function pdcUpdate2 (yNow, dt = 0.01) { // may not need to pass dt

  pdcYY2 = yNow;
  
  let f2 = feedbackForce2(pdcYY2);
  // let dt = 0.01;
  pdcVV2 += f2*dt;
  pdcYY2 += pdcVV2*dt
  
  return pdcYY2;	
}


function feedbackForce () {
  let f = -KP*(pdcYY - pdcYref) - KD*pdcVV;
  return f;
}
function feedbackForce2 () {
  let f2 = -KP*(pdcYY2 - pdcYref2) - KD*pdcVV2;
  return f2;
}