function resize(canvas) {
    // ブラウザがcanvasを表示しているサイズを調べる。
    var displayWidth  = canvas.clientWidth;
    var displayHeight = canvas.clientHeight;
   
    // canvasの「描画バッファーのサイズ」と「表示サイズ」が異なるかどうか確認する。
    if (canvas.width  != displayWidth ||
        canvas.height != displayHeight) {
   
      // サイズが違っていたら、描画バッファーのサイズを
      // 表示サイズと同じサイズに合わせる。
      canvas.width  = displayWidth;
      canvas.height = displayHeight;
    }
  }

  var canvas = document.getElementById('canvas');

  resize(canvas);

  
$(function(){


    var points = [];

    function points2lines(points) {
        var lines = new Array();
        if(points.length>1){
            for( var i=1; i<points.length; i++) {
                lines.push(
                    {
                        "start": {
                            "x": points[i-1]["x"],
                            "y": points[i-1]["y"]
                        },
                        "end":{
                            "x": points[i]["x"],
                            "y": points[i]["y"]
                        }
                    }
                )
            }
            return lines;
        }
        return false;
    }

    
    function reDrawPoints(){
        var canvas = document.getElementById('canvas');

        var lines= new Array();

        if (canvas.getContext){
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);

            //Draw Points
            points.forEach(point => {
                context.beginPath ();
                context.arc( point.x, point.y, 5, 0 * Math.PI / 180, 360 * Math.PI / 180, false );

                // 塗りつぶしの色
                context.fillStyle = "rgba(255,0,0,0.8)";

                // 塗りつぶしを実行
                context.fill();

                // // 線の色
                // context.strokeStyle = "purple" ;

                // // 線の太さ
                // context.lineWidth = 8 ;

                // // 線を描画を実行
                // context.stroke() ;
            });

            var lines = points2lines(points);

                Array.prototype.forEach.call(lines, line => {
                    // context.beginPath();
                    context.moveTo(line.start.x, line.start.y);
                    context.lineTo(line.end.x, line.end.y);
                    context.closePath();
                    context.strokeStyle = "rgb(255, 0, 0)";

                    context.stroke();

                    context.strokeStyle = "rgba(255, 0, 0,0)";

                });
        }
    }
    
    

    $('#canvas').on('click', function (event){handleCanvasClick(event)});

    function ifClickedDeleteCircle(x, y){
        if (points.length == 0) return false;

        var newestPoint = points[points.length - 1];

        var distance = 10;
        if(newestPoint["x"]+distance>x && x>newestPoint["x"]-distance && newestPoint["y"]+distance>y && y>newestPoint["y"]-distance){
            return true;
        }else{
            return false;
        }
    }

    
//    function drawNewPoint(x,y){

//     var canvas = document.getElementById('canvas');
    
//         if (canvas.getContext){
//             var context = canvas.getContext('2d');
        
//                 context.beginPath ();
//                 context.arc( x, y, 5, 0 * Math.PI / 180, 360 * Math.PI / 180, false );

//                 // 塗りつぶしの色
//                 context.fillStyle = "rgba(255,0,0,0.8)";

//                 // 塗りつぶしを実行
//                 context.fill();

//                 var lines = points2lines(points);

//                 lines.forEach(line => {
//                     // context.beginPath();
//                     context.moveTo(line.start.x, line.start.y);
//                     context.lineTo(line.end.x, line.end.y);
//                     context.closePath();
//                     context.strokeStyle = "rgb(255, 0, 0)";

//                     context.stroke();

//                     context.strokeStyle = "rgba(255, 0, 0,0)";

//                 });

//         }
//     }

    var handleCanvasClick = function (event) {
        var x = event.offsetX;
        var y = event.offsetY;
        if(ifClickedDeleteCircle(x, y)){
            points.pop();
            reDrawPoints();
            
        } else {
            //add Point
            points.push({
                "x": x,
                "y": y
            });
            reDrawPoints();
        }
    }
    

    
//     function clickedStar (x, y){
//         var ctx = canvas.getContext('2d');
//         var hanni = 10;
//         var image = ctx.getImageData(x,y,hanni,hanni);
//         var data = image.data;
//         var whitest = 40;
//         var coordinate = [0,0];
//         for(i=0;i<data.length;i+=4){
//             var hsl = rgb2hsl(data[i],data[i+1],data[i+2]);
//             if(hsl[2]>whitest){
//                 whitest = hsl[2];
//                 coordinate = [x+((i/4)%hanni),y+(Math.floor((i/4)/hanni))];
//             }
//         }
//         if(coordinate!=[0,0]){
//           return coordinate;
//         }else{
//           return false;
//         }
//     }
    
//     function rgb2hsl ( rgb ) {
//         var r = rgb[0] / 255 ;
//         var g = rgb[1] / 255 ;
//         var b = rgb[2] / 255 ;
   
//         var max = Math.max( r, g, b ) ;
//         var min = Math.min( r, g, b ) ;
//         var diff = max - min ;
   
//         var h = 0 ;
//         var l = (max + min) / 2 ;
//         var s = diff / ( 1 - ( Math.abs( max + min - 1 ) ) ) ;
   
//         switch( min ) {
//             case max :
//                 h = 0 ;
//             break ;
   
//             case r :
//                 h = (60 * ((b - g) / diff)) + 180 ;
//             break ;
   
//             case g :
//                 h = (60 * ((r - b) / diff)) + 300 ;
//             break ;
   
//             case b :
//                 h = (60 * ((g - r) / diff)) + 60 ;
//             break ;
//         }
   
//         return [ h, s, l ] ;
//    }

    $(".post-button").on('click', function (event) {
        // Get values
        const title = $('.edit-title').val();
        const description = $('.edit-description').val();
        
        // Validate values
        if (!(title && description)) {
            alert('There is a blank field!');
            return false;
        }
        if (points.length < 2) {
            alert('The constellation is too simple!');
            return false;
        }
        if (points.length > 10) {
            alert('The constellation is too complicated!');
            return false
        }
        if (title.length < 2 || 20 < title.length) {
            alert('The title must be between 2 and 20 characters!')
            return false;
        }
        if (description.length < 2 || 100 < description.length) {
            alert('The description must be between 2 and 100 characters!')
            return false;
        }

        // Post to the server
        $.post('https://nasa-backend.herokuapp.com/constellations',
       	    {
                name: $('.edit-title').val(),
                description: $('.edit-description').val(),
                lines: points2lines(points)
            }).done(() => {
                location.href="./index.html";
            }).fail((e) => {
                alert('Failed to create constellation!');
            })
    })

});