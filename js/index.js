app.css("css/index.css");
app.css("css/screen/s-main.css");
app.css("css/components/loading.css");
app.css("css/fa/css/font-awesome.min.css");

/* screen sections */
app.script("js/screen/s-main.js");
app.script("js/screen/s-game.js");

function OnStart () {
  DOM = document;
  
  screen_main();
  screen_game();
}