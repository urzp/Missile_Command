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
        missle_command.Enimy.init();
}
missle_command.update = function(){
    missle_command.Enimy.start_rocket();
    missle_command.Enimy.update();
}
missle_command.draw = function(){
    missle_command.Base.draw();
    missle_command.Enimy.draw();
}
missle_command.constructors ={}
missle_command.constructors.start_point = function(position){
    this.position = position;
    this.active = true;
}
missle_command.constructors.sub_point = function(position){
    this.position = position;
    this.active = true;
}
missle_command.constructors.rockets = function(){
    this.active = false;
}

missle_command.Base = {};
missle_command.Base.init = function(){
    this.start_points =[];
    this.start_points.push(new missle_command.constructors.start_point("left"));
    this.start_points.push(new missle_command.constructors.start_point("middle"));
    this.start_points.push(new missle_command.constructors.start_point("right"));
    this.sub_points = [];
    for(var i=1; i<11; i++ ){
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
    missle_command.Base.sub_points.forEach(function(sub_point){
        if (sub_point.active == true){
            if (sub_point.position<6){
                x_pos = sub_point.position * 40 + 30;
            }else{
                x_pos = sub_point.position * 40 + 110;
            }
            
            missle_command.ctx.fillStyle = "#9fa510"; 
            missle_command.ctx.fillRect(x_pos,CANVAS_HEIGHT-30,20,10);
        }
    })
}

missle_command.Enimy = {};
missle_command.Enimy.init = function(){
    this.rockets = [];
    this.max_rockets = 10;
    for(var i = 0; i<20; i++){
        this.rockets.push(new missle_command.constructors.rockets());
    }
    
}
missle_command.Enimy.start_rocket = function(){
   
    var count_active = 0;
    var next_rocet = null;
    var rocket_count = this.rockets.length;
    for (var index = 0; (next_rocet == null && index < rocket_count ); index++ ){
       if (this.rockets[index].active==true){
            count_active++;
        } else {
           next_rocet = index;   
        }
    }
    
    if (count_active <= this.max_rockets){
        this.rockets[next_rocet].active = true;
        var x_pos = Math.floor(Math.random()*CANVAS_WIDTH);
        var target = Math.floor(Math.random() * 10 + 1);
        var tar_pos;
        if (target<6){
           tar_pos =  target * 40 + 40;
        } else {
           tar_pos =  target * 40 + 120; 
        }
        this.rockets[next_rocet].start_pos = x_pos;
        this.rockets[next_rocet].target_pos = tar_pos;
        this.rockets[next_rocet].current_pos = [x_pos,0];
    } 
}

missle_command.Enimy.update = function(){
    this.rockets.forEach(function(rocket){
        if (rocket.active == true){
            rocket.current_pos[1]+=1;
            var k = (rocket.target_pos - rocket.start_pos)/(CANVAS_HEIGHT - 30);
            rocket.current_pos[0] = rocket.current_pos[1] * k + rocket.start_pos;
        }
    })
}

missle_command.Enimy.draw = function(){
  

    this.rockets.forEach(function(rocket){
          
        if (rocket.active == true){
            missle_command.ctx.beginPath();
            missle_command.ctx.moveTo(rocket.start_pos, 0);
            missle_command.ctx.lineTo(rocket.current_pos[0], rocket.current_pos[1]);
            missle_command.ctx.strokeStyle = '#ff0000';
            missle_command.ctx.stroke();
            ;
        }
    })
   
}


missle_command.start = function(){
    setInterval(function() {
        missle_command.update();
        missle_command.draw();
        }, 1000/missle_command.FPS);
}

$(document).ready(function(){
    missle_command.init();
    missle_command.start();
})


