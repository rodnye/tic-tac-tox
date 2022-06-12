/*
 * AI Normal
 */

let check = XOEngine.check;
let copyTable = AI.copyTable;
shower = false;

AI.Normal = class extends AI {
  
  ai () {
    let table = this.table;
    let best_move = null;
    let best_score = null;
    let moves = [];
    
    for (let x = 0; x < 3; x++) {
      let row = table[x];
      for (let y = 0; y < 3; y++)
        //si está vacia la celda
        if (row[y] == 0) {
          let tableCase = copyTable(table);
              tableCase[x][y] = this.player;
          
          let score = this.recursive(tableCase, this.player);
          if (check(tableCase)) score = 1000;
          
          if( best_score === null ||
              score > best_score ||
              (score == best_score && math.random(0,1))
          ) {
            best_score = score;
            best_move = [x, y];
          }
          
          
          moves.push({
            score: score,
            move: [x, y]
          });
          
        }
    }
    
    moves.sort((a, b) => b.score - a.score );
    console.log(moves);
    return this.callback(best_move);
  }
};