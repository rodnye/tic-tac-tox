/*
 MAIN SCREEN 
*/

function screen_main () {
  let drawer = new Screen("main-screen", {duration:0}).target;
  drawer.open();
  
  let layout = drawer.drawer;
  layout.style.justifyContent = "center";
  layout.style.alignItems = "center";
}
