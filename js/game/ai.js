/* CPU */
app.script("js/components/math.js");

app.script("js/game/ai/easy-ai.js");
app.script("js/game/ai/medium-ai.js");
app.script("js/game/ai/hard-ai.js");



class AI {
  constructor ( tablero, callback ) {
    this.table = tablero;
    this.player = 2; //1 X //2 O 
    this.callback = callback;
  }
  
  setMove () {
    window.setTimeout(
      this.ai.bind(this),
      math.random(200, 800)
    );
  }
}

AI.copyTable = function ( table ) {
  return new Array(table);
};