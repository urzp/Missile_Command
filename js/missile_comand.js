var missle_command = missle_command || {};
var CANVAS_WIDTH = 600;
var CANVAS_HEIGHT = 400;

//missle_command.canvas = document.getElementById('canvas'); 
//missle_command.ctx = canvas.getContext('2d'); 
//missle_command.FPS = 30;

missle_command.init = function(){
        this.canvas = document.getElementById('canvas'); 
        this.ctx = canvas.getContext('2d'); 
        this.FPS = 30;
        this.ctx.clearRect(0, 0, 800, 600);
        this.ctx.fillStyle = "#000"; 
        this.ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT); 
        missle_command.Base.init();
        missle_command.Base.draw();
}
    
missle_command.Base = {};
missle_command.constructors ={}
missle_command.constructors.start_point = function(position){
    this.position = position;
    this.active = true;
}
missle_command.constructors.sub_point = function(position){
    this.position = position;
    this.active = true;
}
missle_command.Base.init = function(){
    this.start_points =[];
    this.start_points.push(new missle_command.constructors.start_point("left"));
    this.start_points.push(new missle_command.constructors.start_point("middle"));
    this.start_points.push(new missle_command.constructors.start_point("right"));
    this.sub_points = [];
    for(var i=1; i<10; i++ ){
        this.sub_points.push(new missle_command.constructors.sub_point(i));
    }
}
missle_command.Base.draw = function(){
    missle_command.ctx.fillStyle = "#254b09"; 
    missle_command.ctx.fillRect(0,CANVAS_HEIGHT-20,CANVAS_WIDTH,20);
    
    

    
    missle_command.Base.start_points.forEach(function(start_point){
        if (start_point.active == true){
            switch(start_point.position){
                case "left":
                    x_pos = 0;
                    break;
                case "middle":
                    x_pos = CANVAS_WIDTH/2 - 20;
                    break;
                case "right":
                    x_pos = CANVAS_WIDTH - 40;
                    break;   
            }
        missle_command.ctx.fillStyle = "#ef0c40"; 
        missle_command.ctx.fillRect(x_pos,CANVAS_HEIGHT-40,40,20);
        }
    })
}

missle_command.Enimy = {};


missle_command.start = setInterval(function() {
  //update();
  //draw();
}, 1000/missle_command.FPS);

$(document).ready(function(){
    missle_command.init();
    //missle_command.start();
})


