/*
 * This code searches for all the <script type="application/processing" target="canvasid">
 * in your page and loads each script in the target canvas with the proper id.
 * It is useful to smooth the process of adding Processing code in your page and starting
 * the Processing.js engine.
 */


if ( window.addEventListener ) {
	window.addEventListener("load", function() {
		var scripts = document.getElementsByTagName("script");
		
		for ( var i = 0; i < scripts.length; i++ ) {
			if ( scripts[i].type == "application/processing" ) {
				var src = scripts[i].src, canvas = scripts[i].nextSibling;
	
				if ( src && src.indexOf("#") ) {
					canvas = document.getElementById( src.substr( src.indexOf("#") + 1 ) );
				} else {
					while ( canvas && canvas.nodeName.toUpperCase() != "CANVAS" )
						canvas = canvas.nextSibling;
				}

				if ( canvas ) {
          if(scripts[i].text != ""){
            // handle case where it's inline script
            var str = scripts[i].text;
            Processing(canvas, str);
          }else{
            // handle case where it's a script file, by grabbing the contents with ajax
            if(window.XMLHttpRequest) {
              var xhr = new XMLHttpRequest();                 
              xhr.onreadystatechange = function() {
// status 200 for success over http, status 0 for local filesystem
                if((xhr.status == 200 || xhr.status == 0) && xhr.readyState == 4) {
                  var str = xhr.responseText;
                  Processing(canvas, str);
                }
              }
              xhr.open("GET", scripts[i].src,true);
              xhr.send(null);
            }
          }
        }
			}
		}
	}, false);
}
