/* CPU */
app.script("js/components/math.js");

app.script("js/game/ai/easy-ai.js");
app.script("js/game/ai/normal-ai.js");
app.script("js/game/ai/hard-ai.js");



class AI {
  constructor ( table, callback ) {
    this.table = table;
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
  
  /***** recorrer todos los posibles finales *****/
  recursive ( table, turn ) {
    let score = 0;
    let win = false;
    
    for (let x = 0; x < 3; x++) {
      
      for (let y = 0; y < 3; y++) {
        
        if (table[x][y] == 0) {
          let _table = AI.copyTable(table);
          _table[x][y] = turn;
          
          let check_value = XOEngine.check( _table );
          
          if (check_value) {
            /* estado terminal de juego */
            if (check_value.type != "table") {
              win = turn == this.player;
              score += win ? 1 : - 1;
            }
            else score += 0;
          } 
          else {
            //turn = turn == 1 ? 2 : 1;
            score += this.recursive(_table, turn == 1 ? 2 : 1);
          }
        }
      }
    }
    
    return score;
  }
}

AI.copyTable = function ( table ) {
  return JSON.parse(JSON.stringify(table));
};