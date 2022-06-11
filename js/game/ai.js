/* CPU */
app.script("js/components/math.js");

app.script("js/game/ai/easy-ai.js");
app.script("js/game/ai/normal-ai.js");
app.script("js/game/ai/hard-ai.js");



class AI {
  constructor ( tablero, callback ) {
    this.table = tablero;
    this.player = 2; //1 X //2 O 
    this.turn = 2;
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
  return JSON.parse(JSON.stringify(table));
};