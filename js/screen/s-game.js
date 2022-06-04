/* 
 GAME SCREEN 
*/
app.css("css/screen/s-game.css");
app.script("js/game/engine.js");
app.script("js/components/xo-table.js");
app.script("js/components/modal.js");
app.script("js/components/screen.js");

function screen_game () {
  let drawer = new Screen("game-screen").target;
  let layout = drawer.drawer;
  table_container = DOM.querySelector("#game-screen .xo");
 
  layout.style.alignItems = "auto";
  layout.style.justifyContent = "auto";
  
  /* table */
  table_game = new XOEngine( table_container );
  
  /* methods */
  screen_game.open = function(){ 
    drawer.open();
    table_game.clear();
  };
  screen_game.close = drawer.close.bind(drawer);
  
  /* modal finish game */
  modal_endgame = new Modal("Empate", null, "html");
  modal_endgame.addButton("[sign-out]", screen_game.close.bind(screen_game));
  modal_endgame.addButton("[repeat]", table_game.clear.bind(table_game));

}
