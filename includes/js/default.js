/*jslint plusplus: true, vars: true, white: true, unparam: true */
(function(window,document) {
  "use strict";

  var get = function(id) { return document.getElementById(id); },
      colorfield = get("color"),
      resultfield = get("result"),
      example = get("example"),
      css = get("css");
  
  var usecanvas = function(color) {
    var canvas = get("canvas"), ctx, result = "<canvas> not supported.", w = canvas.width, h = canvas.height;
    if (canvas.getContext) {
      ctx = canvas.getContext("2d");
      ctx.fillStyle = color;
      ctx.clearRect(0, 0, w, h);
      ctx.fillRect(0, 0, w, h);
      result = canvas.toDataURL();
    }
    return result;
  };
  
  var change = function() {
    var color = String(colorfield.value || "").replace(/^\s*|[;\s]*$/g, "");
    example.style.backgroundColor = "#000"; //Reset
    example.style.backgroundColor = color;
    resultfield.value = "url('" + usecanvas(example.style.backgroundColor) + ")";
    css.innerHTML = "#awesomesauce {<br>  background: " + resultfield.value + ";<br>  background: " + color + ";<br>}";
  };
  
  colorfield.addEventListener("change", change);
  colorfield.addEventListener("keyup", change);
  resultfield.addEventListener("focus", function() { this.select(); });
  change();

}(this,this.document));