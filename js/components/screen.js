/*
 * SCREEN SECTION
*/
app.css("css/components/screen.css");
app.script("js/libs/drawer.min.js");

class Screen {
  constructor (id, opt = {}) {
    opt.background = "var(--accent-color)";
    opt.size = app.width;
    opt.draggable = false;

    let drawer = new Drawer(id, opt);
    let lay = drawer.drawer;
    drawer.shadow.setAttribute("class", "layout");
    lay.setAttribute("class", "layout screen");
    lay.style.display = "flex";
    lay.style.overflowX = "hidden";
    lay.style.flexDirection = "auto";
    
    lay.style.width = "auto";
    lay.style.height = "auto";
    
    delete drawer.cfg.size;
    Object.defineProperty(drawer.cfg, "size", {
      "get": function(){
        if(!opt.position || opt.position == "left" || opt.position == "right") return app.width;
        if(opt.position == "bottom" || opt.position == "top") return app.height;
      }
    });

    /* get */
    this.target = drawer;
  }
}