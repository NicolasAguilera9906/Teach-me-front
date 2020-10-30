var ModuleCanvas = (function () {

        var stompClient =  null;

        /*
        LOCAL
        http://localhost:63342/Teach-me-front
        */
        const urlAPI = "https://teache-me-front.herokuapp.com";
        var classId = getParameterByName("class");
        var email = localStorage.getItem("username");
        let _apiclient = urlAPI+"/js/apiclient.js";

        var canvas;
        var context;
        var canvasOffset;
        var offsetX;
        var offsetY;
        var wt;
        var ht;
        var paint;
        var down;
        var lastX;
        var lastY;
        var draw = function (e) {};
        draw.started = false;

        function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }

        function connectToBoard() {
            console.log("Conecting to board...");
            let socket = new SockJS(urlAPI + '/board');
            stompClient = Stomp.over(socket);
            console.log(stompClient);
            stompClient.connect({},function (frame) {
            console.log("Connected to: " + frame);
            stompClient.subscribe('/topic/draws.'+classId , function (response) {
                var responseDraw = JSON.parse(response.body)
                for (var j = 0; j < responseDraw.points.length; j++) {
                    var pointY = responseDraw.points[j].y
                    var pointX = responseDraw.points[j].x
                    draw.ColorCell(pointX,pointY)
                }
                paint={points:[]}
            });
        });
        }

    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }

    function sendDraw(paint){
        stompClient.send("/app/draws."+classId,{},JSON.stringify(paint));
    }

    draw.ColorCell=function(x,y){
        var rw = x - 1;
        var rh = y - 1;
        rw = rw - rw % 5 + 0.5;
        rh = rh - rh % 5 + 0.5;
        context.fillStyle = "red";
        context.fillRect( rw, rh, 5, 5);
    };
        draw.single = function (e) {
            var mouseX=parseInt(e.clientX-offsetX);
            var mouseY=parseInt(e.clientY-offsetY);
            paint.points.push(new Point(mouseX,mouseY));
            sendDraw(paint);
            draw.ColorCell(mouseX,mouseY);
        };
        // mousemove
        draw.move = function (e) {
            if(!down){return;}
            // get the current mouse position
            var mouseX=parseInt(e.clientX-offsetX);
            var mouseY=parseInt(e.clientY-offsetY);
            // if we haven't moved off this XY, then don't bother processing further
            if(mouseX==lastX && mouseY==lastY){return;}
            // When running the for-loop below,
            // many iterations will not find a new grid-cell
            // so lastForX/lastForY will let us skip duplicate XY
            var lastForX=lastX;
            var lastForY=lastY;
            // walk along a line from the last mousemove position
            // to the current mousemove position.
            // Then color any cells we pass over on our walk
            for(var pct=0;pct<=1;pct+=0.06){
                var dx = mouseX-lastX;
                var dy = mouseY-lastY;
                var X = parseInt(lastX + dx*pct);
                var Y = parseInt(lastY + dy*pct);
                if( !(X==lastForX && Y==lastForY) ){
                    paint.points.push(new Point(X,Y));
                    sendDraw(paint);
                    draw.ColorCell(X,Y);
                }
                lastForX=X;
                lastForY=Y;
            }
            // set this mouse position as starting position for next mousemove
            lastX=mouseX;
            lastY=mouseY;
        };
        // mousedown
        draw.start = function (e) {
            e.preventDefault();
            lastX=parseInt(e.clientX-offsetX);
            lastY=parseInt(e.clientY-offsetY);
            down = true;
        };
        // mouseup
        draw.stop = function (e) {
            e.preventDefault();
            down = false;
        };

        function grid() {
            context.strokeStyle = "#f0f0f0";
            var h = 2.5;
            var p = 2.5;
            context.strokeRect(0.5, 0.5, 5, 5);
            for (i = 0; i < wt; i += p) {
                p *= 2;
                context.drawImage(canvas, p, 0);
            }
            for (i = 0; i < ht; i += h) {
                h *= 2;
                context.drawImage(canvas, 0, h);
            }
        }

        function initCanvas(){
            canvas=document.getElementById("canvas");
            context=canvas.getContext("2d");
            canvasOffset=$("#canvas").offset();
            offsetX=canvasOffset.left;
            offsetY=canvasOffset.top;
            canvas.width=$("#canvasDiv").width();
            canvas.height=$("#canvasDiv").height();
            wt = canvas.width;
            ht = canvas.height;
            down = false;
            lastX=-20;
            lastY=-20;
            paint={points:[]}
            canvas.addEventListener('mouseup', draw.stop, false);
            canvas.addEventListener('mouseout', draw.stop, false);
            canvas.addEventListener('mousedown', draw.start, false);
            canvas.addEventListener('click', draw.single, false);
            canvas.addEventListener('mousemove', draw.move, false);
            grid();
        }

    return {
        initCanvas:initCanvas,
        connectToBoard:connectToBoard
    };
})();