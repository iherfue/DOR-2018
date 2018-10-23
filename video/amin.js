<script>
/**
* The window onload function contains all of the code necessary to show the video
*/
window.onload = function ()
{
    /**
    * Some variables that the various functions (eg the Draw() function) use
    */
    var canvas    = document.getElementById("cvs");
    var context   = canvas.getContext('2d');
    var video     = document.getElementById("myVideo");
    var hands     = document.getElementById("myHands");
    var x         = 50;
    var y         = 50;
    var w         = 317;
    var h         = 132;
    var selected  = false;
    var originalX = null;
    var originalY = null;
    var offsetX   = null;
    var offsetY   = null;
    var angle     = 0; // radians
    var angleIncrement = 0.01;
    var videoPaused    = false;
    var videoScale     = 1;




    /**
    * The main draw function. This is the function that gets called roughly 60fps and draws the canvas.
    */
    function Draw ()
    {
        /**
        * First clear the canvas
        */
        context.clearRect(0,0,canvas.width,canvas.height);
        
        
        /**
        * Draw a circle that produces the shadow
        */
        context.shadowOffsetX = 5;
        context.shadowOffsetY = 5;
        context.shadowBlur    = 25;
        context.shadowColor   = '#aaa';
        
        context.strokeStyle = 'black';
        context.fillStyle = 'white';
        
        context.beginPath();
        context.lineWidth = 5;
        context.arc(x + (w/2), y + (h/2), h/2, 0, RGraph.TWOPI, false);
        context.closePath();
        context.fill();
        context.stroke();





        /**
        * Clip the canvas to a circle - this is the circle that the video ends up being drawn in
        */
        context.save();
            
            context.lineWidth = 1;
            context.beginPath();
            context.arc(x + (w/2), y + (h/2), h/2, 0, RGraph.TWOPI, false);
            
            context.clip()





            /**
            * Add the Loading place holder. When the video is loaded this will be overwritten by the actual video so you won't see it
            */
            context.fillStyle = 'black';
            RGraph.Text2(context, {'font': 'Arial',
                                   'size':16,
                                   'valign':'center',
                                   'halign':'center',
                                   'text':'Loading...',
                                   'x':x + (w / 2),
                                   'y':y + (h / 2)
                                   });
            
            /**
            * Handle rotating the canvas so that the video appears rotated
            */
            context.save()
                
                context.translate(x + (w/2), y + (h/2));
                context.rotate(angle);
                context.scale(videoScale, videoScale);

                /**
                * This is the drawImage() call the draws the video
                */
                // This old drawImage() call was used before the rotation was added
                //context.drawImage(video,x,y,w,h);
                context.drawImage(video,0 - (w/2),0 - (h/2),w,h);
                
                /**
                * Increase the angle so that it appears to be rotating
                */
                if (!videoPaused) {
                    angle += angleIncrement;
                }

            context.restore();

        /**
        * End the clipping
        */
        context.restore();




        
        /**
        * Turn off any shadow
        * (it's designed to work with RGraph objects)
        */
        RGraph.NoShadow({'context': context});




        /**
        * If the video has been selected (clicked on) then draw a red circle around it
        */
        if (selected) {
            context.strokeStyle = 'red';
            context.lineWidth   = 6;
            
            context.beginPath();
            context.arc(x + (w/2), y + (h/2), h/2, 0, RGraph.TWOPI, false);
            context.stroke();
        }




        /**
        * Draw the hands image - this is a simple image that is drawn over the circle that contains the video
        */
        context.drawImage(hands,x - 35,y - 30);
        




        /**
        * Call the Draw function again after approx 16.666ms, setInterval isn't used because it can cause problems
        */
        setTimeout(Draw, 1000/60);
    }




    
    
    /**
    * The canvas onmousedown function. This allows you to click on the video so that you can move it around
    */
    canvas.onmousedown = function (e)
    {
        if (selected) {
            
            selected = false;

        } else {

            var mouseXY = RGraph.getMouseXY(e);
            var mouseX = mouseXY[0];
            var mouseY = mouseXY[1];
            
            var len = RGraph.getHypLength(x + (w/2), y + (h/2), mouseX, mouseY);

            if (len <= (h/2) ) {
                
                originalX = mouseX;
                originalY = mouseY;
                offsetX   = mouseX - x;
                offsetY   = mouseY - y;

                selected  = true;
            }
        }
    }



    /**
    * The onmousemove function. This updates the x/y position based on the mouse coordinates
    */
    canvas.onmousemove = function (e)
    {
        if (selected) {
            var mouseXY = RGraph.getMouseXY(e);
            var mouseX = mouseXY[0];
            var mouseY = mouseXY[1];
            var diffX  = mouseX - originalX;
            var diffY  = mouseY - originalY;
            
            x = originalX + diffX - offsetX;
            y = Math.max(15,originalY + diffY - offsetY);
        }
    }



    /**
    * The window onmouseup function. For more "traditional" drag 'n' drop where releasing the mouse button drops the
    * video you can uncomment this.
    */
    //window.onmouseup = function (e)
    //{
    //    selected = false;
    //}
    
    
    
    /**
    * This function is called when the stop button is pressed
    */
    document.getElementById("stopButton").onclick = function (e)
    {
        video.pause();
        videoPaused = true;
    }
    
    
    
    /**
    * This function is called when the play button is pressed
    */
    document.getElementById("playButton").onclick = function (e)
    {
        video.play();
        videoPaused = false;
    }
    
    document.getElementById("scaleSlider").onchange = function (e)
    {
        videoScale = e.target.value;
    }
    
    
    
    






    /**
    * This calls the Draw function initially
    */
    setTimeout(Draw, 1000/60);
}
</script>