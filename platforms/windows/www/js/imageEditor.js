var ImageEditor =
{
	// Variables for referencing the canvas and 2dcanvas context
   canvas:document.getElementById('sketchpad'),
   ctx:'',
    // Variables to keep track of the mouse position and left-button status 
    mouseX:0,
	mouseY:0,
	mouseDown:0,
    // Variables to keep track of the touch position
    touchX:0,
	touchY:0,
	picture:'',
    
    info: function()
    {
        alert("info");
    },
	
	// Get the current mouse position relative to the top-left of the canvas
    getMousePos: function(e) 
	{
        if (!e)
            var e = event;

        if (e.offsetX) {
            ImageEditor.mouseX = e.offsetX;
            ImageEditor.mouseY = e.offsetY;
        }
        else if (e.layerX) {
            ImageEditor.mouseX = e.layerX;
            ImageEditor.mouseY = e.layerY;
        }
     },
	
		// Draws a dot at a specific position on the supplied canvas name
   drawDot: function(ctx,x,y,size) 
   {
        // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
        r=0; g=0; b=0; a=255;

        // Select a fill style
        ImageEditor.ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";

        // Draw a filled circle
        ImageEditor.ctx.beginPath();
        ImageEditor.ctx.arc(x, y, size, 0, Math.PI*2, true); 
        ImageEditor.ctx.closePath();
        ImageEditor.ctx.fill();
    },

    // Clear the canvas and adds the image
    clearCanvas: function(canvas,ctx) 
	{
       if(ImageEditor.canvas)ImageEditor.ctx.clearRect(0, 0, ImageEditor.canvas.width, ImageEditor.canvas.height);

      var imageObj = new Image();
	 imageObj.src = ImageEditor.picture;
	 imageObj.style="height:1024px;width:768px";
	 

		imageObj.onload = function() 
		{
			if(ImageEditor.ctx)
			{
				ImageEditor.ctx.drawImage(imageObj, 0, 0,1024,768);
				localStorage.setItem( "savedImageData", ImageEditor.canvas.toDataURL("image/jpeg") );
			}
			
			
			
		};

		imageObj.crossOrigin = "Anonymous";
		
		// ImageEditor.canvas.width = imageObj.width;
		//	ImageEditor.canvas.height = imageObj.height;

 
    },

   
	imageData: function() 
   {
        
		var image_data = localStorage.getItem( "savedImageData");//ImageEditor.canvas.toDataURL("image/jpeg");
		  
      // Convert Base64 image to binary
      var file = ImageEditor.dataURItoBlob(image_data);
		alert(file);
		return file;
    },

    // Keep track of the mouse button being pressed and draw a dot at current location
     sketchpad_mouseDown: function() 
	 {
        ImageEditor.mouseDown=1;
        ImageEditor.drawDot(ImageEditor.ctx,ImageEditor.mouseX,ImageEditor.mouseY,6);
    },

    // Keep track of the mouse button being released
    sketchpad_mouseUp: function() 
	{
        ImageEditor.mouseDown=0;

    },
 

	  // Keep track of the mouse position and draw a dot if mouse button is currently pressed
   sketchpad_mouseMove: function(e)
   { 
        // Update the mouse co-ordinates when moved
       ImageEditor.getMousePos(e);

        // Draw a dot if the mouse button is currently being pressed
        if (ImageEditor.mouseDown==1) 
		{
            ImageEditor.drawDot(ImageEditor.ctx,ImageEditor.mouseX,ImageEditor.mouseY,6);
        }
    },
	
    // Draw something when a touch start is detected
    sketchpad_touchStart:function() 
	{
        // Update the touch co-ordinates
        ImageEditor.getTouchPos();

        ImageEditor.drawDot(ImageEditor.ctx,ImageEditor.touchX,ImageEditor.touchY,6);

        // Prevents an additional mousedown event being triggered
        event.preventDefault();
    },

    // Draw something and prevent the default scrolling when touch movement is detected
    sketchpad_touchMove:function(e) 
	{ 
        // Update the touch co-ordinates
        ImageEditor.getTouchPos(e);

        // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
        ImageEditor.drawDot(ImageEditor.ctx,ImageEditor.touchX,ImageEditor.touchY,6); 

        // Prevent a scrolling action as a result of this touchmove triggering.
        event.preventDefault();
    },

    // Called when touch is lifted from the screen of the device.
    sketchpad_touchEnd: function(e) 
	{ 
       
      },

    // Get the touch position relative to the top-left of the canvas
    // When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
    // but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
    // "target.offsetTop" to get the correct values in relation to the top left of the canvas.
    getTouchPos: function(e) {
        if (!e)
            var e = event;

        if(e.touches) {
            if (e.touches.length == 1) { // Only deal with one finger
                var touch = e.touches[0]; // Get the information for finger #1
                ImageEditor.touchX=touch.pageX-touch.target.offsetLeft;
                ImageEditor.touchY=touch.pageY-touch.target.offsetTop;
            }
        }
    },


    // Set-up the canvas 
    init: function(imgPath) {
        // Get the specific canvas element from the HTML document
        ImageEditor.canvas = document.getElementById('sketchpad');
	//ImageEditor.picture=ImageEditor.getURLParameters('img');
	if(imgPath)ImageEditor.picture=imgPath;
	 
        // If the browser supports the canvas tag, get the 2d drawing context for this canvas
        if (ImageEditor.canvas && ImageEditor.canvas.getContext)
            ImageEditor.ctx = ImageEditor.canvas.getContext('2d');

        // Check that we have a valid context to draw on/with before adding event handlers
        if (ImageEditor.ctx) {
            // React to mouse events on the canvas, and mouseup on the entire document
            ImageEditor.canvas.addEventListener('mousedown', ImageEditor.sketchpad_mouseDown, false);
            ImageEditor.canvas.addEventListener('mousemove', ImageEditor.sketchpad_mouseMove, false);
            window.addEventListener('mouseup', ImageEditor.sketchpad_mouseUp, false);

            // React to touch events on the canvas
            ImageEditor.canvas.addEventListener('touchstart', ImageEditor.sketchpad_touchStart, false);
            ImageEditor.canvas.addEventListener('touchmove', ImageEditor.sketchpad_touchMove, false);
            ImageEditor.canvas.addEventListener('touchend', ImageEditor.sketchpad_touchEnd, false);
        }
		ImageEditor.clearCanvas(ImageEditor.canvas,ImageEditor.ctx);
    },
	
	dataURItoBlob: function(dataURI) 
	{
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
},

 getURLParameters:function (paramName)
{
    var sURL = window.document.URL.toString();
    if (sURL.indexOf("?") > 0)
    {
        var arrParams = sURL.split("?");
        var arrURLParams = arrParams[1].split("&");
        var arrParamNames = new Array(arrURLParams.length);
        var arrParamValues = new Array(arrURLParams.length);

        var i = 0;
        for (i = 0; i<arrURLParams.length; i++)
        {
            var sParam =  arrURLParams[i].split("=");
            arrParamNames[i] = sParam[0];
            if (sParam[1] != "")
                arrParamValues[i] = unescape(sParam[1]);
            else
                arrParamValues[i] = "NO_VALUE";
        }

        for (i=0; i<arrURLParams.length; i++)
        {
            if (arrParamNames[i] == paramName)
            {
                //alert("Parameter:" + arrParamValues[i]);
                return arrParamValues[i];
            }
        }
        return "";
    }
}
	
	
};





