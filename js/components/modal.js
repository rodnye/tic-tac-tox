/*
 * MODAL DIALOG
 */
 
app.css("css/components/modal.css");
app.css("css/fa/css/font-awesome.min.css");
 
class Modal {
  constructor (title, list_buttons, html) {
    const container = DOM.createElement("div");
    const modal = DOM.createElement("div");
    const _header = DOM.createElement("div");
    const _body = DOM.createElement("div");
    const _footer = DOM.createElement("div");
    
    container.setAttribute("class", "modal-container");
    modal.setAttribute("class", "modal");
    _header.setAttribute("class", "modal--header");
    _body.setAttribute("class", "modal--body");
    _footer.setAttribute("class", "modal--footer");
    
    container.appendChild(modal);
    modal.appendChild(_header);
    modal.appendChild(_body);
    modal.appendChild(_footer);
    container.style.display = "none";
    
    DOM.body.appendChild(container);
    
    this.html = !!html;
    this.container = container;
    this.modal = modal;
    this.footer = _footer;
    this.body = _body;
    this.header = _header;
    
    if (title) this.setTitle(title);
    if (list_buttons) 
      for(let btn_name of list_buttons) 
        this.addButton(btn_name);
  }
  
  /* EDITAR */
  setTitle (txt) {
    this.header.innerText = txt;
  }
  
  addButton (txt, event) {
    let button = DOM.createElement("div");
    this.footer.appendChild(button);
    
    /* si se va a usar un icono */
    if(/^\[.*\]$/.test(txt)) {
      let fa = DOM.createElement("i");
      fa.setAttribute("class", "fa fa-lg fa-" + txt.replace(/(\[|\])/g, ""));
      button.appendChild(fa);
    }
    /* si es una palabra */
    else button.innerText = txt;
    
    button.addEventListener("click", this.hidden.bind(this));
    button.addEventListener("click", event);
    button.setAttribute("class", "modal--button");
  }
  
  /* ACCIONES */
  show (show = true) {
    let cont = this.container;
    cont.style.filter = "opacity(0)";
    cont.style.display = "flex";
    const animation = app.animate(function(n){
      if(!show) n = 1 - n;
      cont.style.filter = "opacity(" + n + ")";
      cont.style.transform = "scale(" + (1 + 0.5 * (1 - n)) + ")";
    }, 200, function(n){return 1 - Math.pow(1 - n, 10)});
    animation.start();
    if(!show) animation.finish(function(){
      cont.style.display = "none";
    });
  }
  
  hidden () {
    this.show(false);
  }
}