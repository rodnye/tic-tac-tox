/*
 * AI Easy
 */
 
app.script("js/components/math.js");

AI.Easy = class extends AI {
  
  ai () {
    let table = this.table;
    let possible = [];
    
    for (let x = 0; x < 3; x++) {
      let row = table[x];
      for (let y = 0; y < 3; y++)
        //si está vacia la celda
        if (row[y] == 0) possible.push([x, y]);
    }
    this.callback( possible[math.random(0, possible.length-1)] );
  }
  
};