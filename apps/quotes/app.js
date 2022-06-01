g.clear();
setWatch(() => {
  E.showMessage("gaga");
  setTimeout(()=>Bangle.drawWidgets(), 1000);
}, BTN1, {repeat:true});
