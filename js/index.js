app.css("css/index.css");
app.css("css/screen/s-main.css");
app.css("css/components/loading.css");
app.css("css/fa/css/font-awesome.min.css");

/* screen sections */
app.script("js/screen/s-main.js");
app.script("js/screen/s-game.js");

function OnStart () {
  DOM = document;
  
  /* hidden splash layout */
  let splash = DOM.getElementById("splash-screen");
  let animation = app.animate(function(n){
    splash.style.filter = "opacity(" + (1 - n) + ")";
  }, 500);
  animation.finish(function(){
    DOM.body.removeChild(splash);
    splash.remove();
    animation = null;
    splash = null;
  });
  animation.start();
  
  screen_main();
  screen_game();
}