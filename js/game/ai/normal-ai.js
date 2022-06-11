/*
 * AI Normal
 */
 
app.script("js/ai.js");
app.script("js/xo-engine.js");

let check = XOEngine.check;
let copyTable = AI.copyTable;


AI.Normal = class extends AI {
  
  ai () {
    let table = this.table;
    let bestMove = null;
    let moves = [];
    
    for (let x = 0; x < 3; x++) {
      let row = table[x];
      for (let y = 0; y < 3; y++)
        //si está vacia la celda
        if (row[y] == 0) {
          let tableCase = copyTable(table);
          tableCase[x][y] = this.player;
          
          moves.push({
            points: this.recursive(tableCase, this.player),
            move: [x, y]
          });
          
        }
    }
    
    moves.sort(function(a, b){
      return b.points - a.points;
    });
    console.log(moves);
    return this.callback(moves[0].move);
  }
  
  recursive ( table, turn ) {
    let points = 0;
    
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        
        if (table[x][y] == 0) {
          let tableCase = copyTable(table);
          tableCase[x][y] = turn;
          let check_value = check( tableCase, [x, y] );
          
          if (check_value) {
            if (check_value.type != "table")
              //ganó
              points += turn == this.player ? 1 : -1;
          } 
          else points += this.recursive(tableCase, turn == 1 ? 2 : 1);
          
        }
      }
    }
    
    return points;
  }
  
};