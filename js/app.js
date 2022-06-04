app = {
  get width () { return window.innerWidth },
  get height () { return window.innerHeight }
};

// screen //
app.reload = function(){window.location.reload()};

// import //
/* import js */
app.script = function( url, callback ) {
  if (app.script.imported.includes(url)) return false;
  else app.script.imported.push(url);
  
  let script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", url);
  script.onload = callback;
  script.onerror =function(e){
    throw "AppError: script \"" + url + "\" not found";
  };
  if(!document.head) document.head = document.getElementsByTagName("head")[0];
  document.head.appendChild(script);
  script = null;
};
app.script.imported = [];

/* import css */
app.css = function( url, callback ) {
  if (app.css.imported.includes(url)) return false;
  else app.css.imported.push(url);
  
  let link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("href", url);
  link.onload = callback;
  link.onerror = function(e){
    throw "AppError: style \"" + url + "\" not found";
  };
  
  if(!document.head) document.head = document.getElementsByTagName("head")[0];
  document.head.appendChild(link);
  link = null;
};
app.css.imported = [];


// inyect css //
app.style = function(rule, props) {document.styleSheets[0].addRule(rule, props)};

// animation //
app.animate = function(draw, duration, timing) {
  var start,
  running = true,
  finish = function() {};
  if (!timing) timing = function(n) {
    return n;
  };

  function animate(time) {
    // timeFraction va de 0 a 1
    var timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calcular el estado actual de la animación
    var progress = timing(timeFraction);

    draw(progress); // dibujar

    if (timeFraction < 1 && running) window.requestAnimationFrame(animate);
    else finish();
  }

  return {
    start: function() {
      running = true;
      start = performance.now();
      window.requestAnimationFrame(animate);
      return this;
    },
    stop: function() {
      running = false;
      return this;
    },
    finish: function(fn) {
      finish = fn;
      return this;
    }
  };
};

// debug //
app.debug = function(title, txt){
  if(txt) title += "  ➤";
  else { txt = title; title = "" }
  title = title
     .replace(/\-\-\>/, "➔")
     .replace(/\-\>/, "↦");
  console.log(title, txt);
  return txt;
};


// loading screen //
app.loading = {
  init: function(){
    let lay = document.createElement("div");
        lay.setAttribute("class", "app-loading");
        document.body.appendChild( lay );
        
    let icon = document.createElement("i");
        icon.setAttribute("class", "app-loading--icon fa fa-spinner fa-spin fa-3x");
        lay.appendChild( icon );
    
    let txt = document.createElement("p");
        txt.setAttribute("class", "app-loading--txt");
        lay.appendChild( txt );
        
    this.layout = lay;
    this.content = txt;
  },
  
  show: function(s = "") {
    app.loading.last_screen = app.screen; //XChat only!
    app.screen = {close:function(){}}; //XChat only!
    
    let lay = this.layout;
    this.content.innerText = s;
    lay.style.filter = "opacity(0)";
    lay.style.display = "flex";
    app.animate(function(porc){
      lay.style.filter = "opacity(" + porc + ")";
      lay.style.transform = "scale(" + (1.5 - 0.5 * porc ) + ")";
    }, 500).start();
  },
  
  hidden: function(){
    let lay = this.layout;
    app.animate(function(porc){
      lay.style.filter = "opacity(" + (1 - porc) + ")";
      lay.style.transform = "scale(" + (1.5 - 0.5 * (1 - porc) ) + ")";
    }, 200)
      .finish( function(){ 
        lay.style.display = "none";
        app.screen = app.loading.last_screen; //XChat only!
      } )
      .start();
  }
};


// enable/disable user interaction //
app.wall = {
  init: function(){
    let lay = document.createElement("div");
    lay.setAttribute("style",
      "zIndex: 9999 !important;" +
      "position: fixed;" +
      "display: none;" +
      "top: 0; left: 0;" +
      "width: 100vw;" +
      "height: 100vh;" +
      "background: rgba(0,0,0,0);"
    );
    document.body.appendChild(lay);
    this.layout = lay;
  },
  show: function(){ this.layout.style.display = "block" },
  hidden: function(){ this.layout.style.display = "none" }
};


// database //
app.save_data = function(place, data) {
  localStorage.setItem(place, JSON.stringify({d: data}));
  return data;
};
app.load_data = function (place, def) {
  let data = localStorage.getItem(place);
  if(data) return JSON.parse(data).d;
  else return def;
};
app.clear_data = function () {localStorage.clear()};
app.remove_data = function (place) {localStorage.removeItem(place)};


// audio //
app.playSound = function (src) {
  new Audio(src).play();
};


// alert //
app.alert = function (txt, callback) {
  alert(txt);
  if(callback) callback();
};

// app init //
app.start = function(){
  document.head = document.getElementsByTagName("head")[0];
  document.body = document.getElementsByTagName("body")[0];
  app.loading.init();
  app.wall.init();
  app.isStart = true;
  if(window.OnStart) OnStart();
};