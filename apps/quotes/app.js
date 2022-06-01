g.reset();

var lasty = 0;
var lastx = 0;

next = function (cb) { };
prev = function (cb) { };
toggle = function (cb) { };
up = function (cb) { };
down = function (cb) { };

function http(){
  var RES = false;
  Bluetooth.println(JSON.stringify({t:"http", url:"https://bangle.oskaralmqvist.se/quote.php"}));
  global.GB = (event) => {
    RES = true;
    if (event.t == "http"){
      if (event.err)
        E.showAlert(event.err);
      else
        E.showMessage(event.resp+ "");
      } else {
        E.showAlert("Event was: " + event.t);
      }
    };  
    if (RES == false){
      E.showMessage("GB not connected - random quote");
    }
}

setWatch(() => {
  http();
  setTimeout(()=>Bangle.drawWidgets(), 1000);
}, BTN1, {repeat:true});

  Bangle.on('drag', function(e) {  
    if(!e.b){
      //console.log(lasty);
      //console.log(lastx);
    if(lasty >  40){
    E.showMessage('Refresh');
      setTimeout(http, 1000);
      down(() => {});
    }
      else if(lasty < -40){
    E.showMessage('Refresh');
      setTimeout(http, 1000);
      up(() => {});
    } else if(lastx < -40){
    E.showMessage('Refresh');
      setTimeout(http, 1000);
      prev(() => {});
    } else if(lastx > 40){
    E.showMessage('Refresh');
      setTimeout(http, 1000);
      next(() => {});
    } else if(lastx==0 && lasty==0){
    E.showMessage('Refresh');
      setTimeout(http, 1000);
      toggle(() => {});
    }
      lastx = 0;
      lasty = 0;
    }
    else{
      lastx = lastx + e.dx;
      lasty = lasty + e.dy;
  }
  });

// Load widgets
Bangle.loadWidgets();
Bangle.drawWidgets();
