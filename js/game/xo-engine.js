/*
  XO Logic
*/
app.script("js/components/xo-table.js");

class XOEngine {
  constructor ( domElement ) {
    let xtable = new XOTable( domElement );
    xtable.buildDOM();
    
    for( let row of xtable.tableDOM ) 
      for( let cell of row )
        cell.onclick = this.clickHandler.bind(this);
    
    this.xtable = xtable;
    this.table = xtable.table;
    this.tableDOM = xtable.tableDOM;
    this.turn = 1;
  }
  
  insertAI (ai) {
    this.ai = new ai(this.table, this.AIHandler.bind(this));
  }
  
  /* chequear victoria */
  check (move) {
    let table = this.table;
    let tableDOM = this.tableDOM;
    let win = XOEngine.check(this.table, move);
    
    if (win) {
      /* si es una victoria */
      if(win.type != "table") {
        
        /* trazar victorias */
        if( win.type == "row" )
          for (let y = 0; y < 3; y++)
            setWinCell(tableDOM[win.place][y]);
        else if( win.type == "col" )
          for (let x = 0; x < 3; x++)
            setWinCell(tableDOM[x][win.place]);
        else if( win.type == "diag" ) {
          let x = win.place;
          let mx = win.place == 0? 1 : -1; //dirección de diagonal
          for (let y = 0; y < 3; y++) {
            setWinCell(tableDOM[x][y]);
            x += mx;
          }
        }
        
        /* mostrar letrero de victoria */
        let fig = (
          this.turn == 1? XOTable.x :
          this.turn == 2? XOTable.o : null
        ).cloneNode();
        fig.style.filter = "none";
        fig.style.color = "var(--cell-win-color)";
  
        modal_endgame.setTitle(":: Ganador ::");
        modal_endgame.body.innerText = "";
        modal_endgame.body.appendChild(fig);
        modal_endgame.show();
      }
      /* si es un empate */
      else {
        modal_endgame.setTitle("Empate");
        modal_endgame.body.innerText = "";
        modal_endgame.show();
      }
      return this.turn;
    }
    else return 0;
  }
  
  /* click en celda */
  clickHandler (event) {
    let ai = this.ai;
    if (ai) if (ai.player == this.turn) return;
    
    let cell = event.currentTarget;
    let pos = [cell.dataset.row, cell.dataset.col];
    
    if(cell.dataset.move == 0) {
      this.xtable.setMove(pos, this.turn);
      let win = this.check(pos);
      this.turn = this.turn == 1 ? 2 : 1;
      
      if (!win && ai) {
        app.loading.show();
        ai.setMove();
      }
    }
  }
  
  /* AI event */
  AIHandler (move) {
    app.loading.hidden();
    this.xtable.setMove(move, this.turn);
    this.check(move);
    this.turn = this.turn == 1 ? 2 : 1;
  }
  
  /* limpiar */
  clear () {
    this.xtable.clear();
    this.turn = 1;
  }
}

/* estilo ganador */
function setWinCell (element) {
  element.style.background = "var(--cell-win-back-color)";
  element.querySelector("i").style.color = "var(--cell-win-color)";
}

/* chequear victoria */
XOEngine.check = function (table) {
  let equal3 = XOEngine.equal3;
  
  
  /* comprobar fila*/
  for (let x = 0; x < 3; x ++) {
    let row = table[x];
    if ( equal3(row[0], row[1], row[2]) ) return {
      type: "row",
      place: x
    };
  }
  
  /* comprobatr columna */
  for (let y = 0; y < 3; y ++)
    if ( equal3(table[0][y], table[1][y], table[2][y]) ) return {
      type: "col",
      place: y
    };
  
    
  /* comprobar diagonales */
  if( equal3(table[0][0], table[1][1], table[2][2]) )
    return {
      type: "diag",
      place: 0
    };
  if( equal3(table[0][2], table[1][1], table[2][0]) )
    return {
      type: "diag",
      place: 2
    };
  
  /* empate */
  if( 
    table[0][0] && table[0][1] && table[0][2] &&
    table[1][0] && table[1][1] && table[1][2] &&
    table[2][0] && table[2][1] && table[2][2]
   ) return { type: "table" };
 
  return null
};

/* evaluar celdas introducidas */
XOEngine.equal3 = function(c1, c2, c3) {
  return c1 == c2 && c2 == c3 && c1 + c2 + c3 != 0;
};

XOEngine.opositePlayer = function (player) {
  return player == 1 ? 2 : 1;
}