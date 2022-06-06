/* 
  RADIO BUTTONS 
*/
app.css("css/components/radio.css");
app.css("css/fa/css/font-awesome.min.css");

class RadioButtons {
  constructor (items, cfg) {
    let container = DOM.createElement("div");
    container.setAttribute("class", "radio-buttons");
    
    
    this.icon_select = "fa-check-circle";
    this.icon_unselect = "fa-circle-o";
    this.container = container;
    this.value = null;
    this.index = 0;
    this.length = 0;
    
    if (items) for(let item of items) this.addItem(item);
  }
  
  /* añadir item */
  addItem (txt, value) {
    let item = DOM.createElement("div");
    let icon = DOM.createElement("i");
    let text = DOM.createElement("div");
    
    item.setAttribute("class", "radio-button");
    icon.setAttribute("class", "fa fa-lg " + this.icon_unselect);
    text.setAttribute("class", "radio--text");
    
    text.innerText = txt;
    
    item.dataset.value = value || txt;
    item.dataset.index = this.length;
    item.appendChild(icon);
    item.appendChild(text);
    this.container.appendChild(item);
    
    if(!this.length) this.select(this.length);
    
    item.onclick = this.clickHandler.bind(this);
    this.length++;
  }
  
  /* select item */
  select (index) {
    let container = this.container;
    
    /* deseleccionar item seleccionado */
    let icon_selected = container.getElementsByClassName(this.icon_select)[0];
    if(icon_selected) icon_selected.setAttribute("class", "fa fa-lg " + this.icon_unselect);
      
    /* seleccionar nuevo item */
    let item = container.children[index];
    let icon = item.getElementsByClassName(this.icon_unselect)[0];
    icon.setAttribute("class", "fa fa-lg " + this.icon_select);
    
    this.value = item.dataset.value;
    this.index = item.dataset.index - 0;
  }
  
  /* event */
  clickHandler (event) {
    let item = event.currentTarget;
    this.select(item.dataset.index);
  }
}