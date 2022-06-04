/* CPU */
app.script("js/game/easy-ai.js");
app.script("js/game/medium-ai.js");
app.script("js/game/hard-ai.js");



class AI {
  constructor ( tablero, callback ) {
    this.table = tablero;
    this.player = "o";
    this.callback = callback;
  }
  
  setMove () {
    this.ai();
  }
  
  async ai () {
    const {x, y} = this.recursive(this.table);
    
    this.callback( [x, y] );
  }
}

AI.copyTable = function ( table ) {
  return new Array(table);
};