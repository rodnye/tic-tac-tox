/*
 MAIN SCREEN 
*/
app.css("css/screen/s-main.css");
app.script("js/components/modal.js");
app.script("js/components/screen.js");
app.script("js/components/radio.js");
app.script("js/game/ai.js");

function screen_main () {
  let drawer = new Screen("main-screen", {duration:0}).target;
  drawer.open();
  
  let layout = drawer.drawer;
  layout.style.justifyContent = "center";
  layout.style.alignItems = "center";
  
  /* click 1 vs ai */
  modal_selectAI = new Modal("Seleccionar dificultad");
  list_selectAI = new RadioButtons();
  
  modal_selectAI.addButton("[sign-out]");
  modal_selectAI.addButton("[check]", function(){
    if (/* facil */list_selectAI.value == 1) {
      table_game.insertAI(AI.Easy);
      screen_game.open();
    }
  });
  
  list_selectAI.addItem("Fácil", 1);
  list_selectAI.addItem("Difícil", 2);
  modal_selectAI.body.appendChild(list_selectAI.container);
}
