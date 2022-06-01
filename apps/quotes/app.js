g.reset();

setWatch(() => {
  Bluetooth.println(JSON.stringify({t:"http", url:"https://bangle.oskaralmqvist.se/quote.php"}));
  global.GB = (event) => {
    if (event.t == "http"){
      if (event.err)
        E.showAlert(event.err);
      else
        E.showMessage(event.resp+ "");
      } else {
        E.showAlert("Event was: " + event.t);
      }
    };  
  setTimeout(()=>Bangle.drawWidgets(), 1000);
}, BTN1, {repeat:true});

// Load widgets
Bangle.loadWidgets();
Bangle.drawWidgets();
