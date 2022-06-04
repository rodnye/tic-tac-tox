/*
 * GENERATE XO TABLE
 */
app.css("css/components/xo-table.css");

class XOTable {
  constructor (container) {
    this.container = container;
    this.table = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
  }
  
  setMove (pos, move) {
    let table = this.table;
    let radius = XOTable.radius_cell;
    let tableDOM = this.tableDOM;
    table[pos[0]][pos[1]] = move;
    
    if(typeof tableDOM != "undefined") {
      let cell = tableDOM[pos[0]][pos[1]];
      cell.dataset.move = move;
      
      if (move) {
        let fig = 
          move == 1? XOTable.x.cloneNode() :
          move == 2? XOTable.o.cloneNode() : null;
        
        let animation = app.animate(
        /* animacion aparecer */
        function (n) {
          n = 2 - n;
          fig.style.filter = "opacity(" + n + ")";
          fig.style.transform = "scale(" + (0.5 + 0.5 * n) + ")";
        }, 500, 
        /* efecto rebote */
        function (n) {
          n = 1 - n;
          for (let a = 0, b = 1; 1; a += b, b /= 2)
            if (n >= (7 - 4 * a) / 11)
              return 1 - Math.pow((11 - 6 * a - 11 * n) / 4, 2) + Math.pow(b, 2);
        });
        cell.appendChild(fig);
        animation.start();
        
      }
      else {
        /* vaciar celda */
        cell.innerText = "";
        cell.style.background = "var(--accent-color)";
      }
    }
  }
  
  clear () {
    for(let x = 0; x < 3; x++)
      for(let y = 0; y < 3; y++)
        this.setMove([x, y], 0);
  }
  
  /* build de game */
  buildDOM () {
    const container = this.container;
    const tableDOM = [[],[],[]];
    
    for (let x = 0; x < 3; x++) {
      let row = document.createElement("div");
      let row_list = tableDOM[x];
      container.appendChild(row);
      row.setAttribute("class", "xo-row");
      
      if(x == 1) row.setAttribute("style", 
        "border-top: var(--border);" +
        "border-bottom: var(--border);"
      );
      for (let y = 0; y < 3; y++) {
        let cell = document.createElement("div");
        cell.dataset.row = x;
        cell.dataset.col = y;
        cell.dataset.move = 0;
        row_list[y] = cell; //añadir celda a tableDOM
        row.appendChild(cell);
        cell.setAttribute("class", "xo-cell");
        if (y == 1) cell.setAttribute("style", 
           "border-right: var(--border);"+
           "border-left: var(--border);"
        );
      }
      
    }
    
    this.tableDOM = tableDOM;
  }
}

XOTable.x = document.createElement("i");
XOTable.x.setAttribute("class", "fa fa-close x-icon");

XOTable.o = document.createElement("i");
XOTable.o.setAttribute("class", "fa fa-circle-o o-icon");