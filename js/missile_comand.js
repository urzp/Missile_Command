var missle_command = missle_command || {};
var CANVAS_WIDTH = 600;
var CANVAS_HEIGHT = 400;
var MAX_ROCKETS = 1;
var MAX_ROCKETS_PLAYER = 10;
var MASS_EXPLOSION = 15;
var ALL_ENIMY_ROCKETS = 50;
var ALL_PLAYER_ROCKETS = 100;

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
    //missle_command.Base.start_roket();
    missle_command.Base.update();
    missle_command.Enimy.start_rocket();
    missle_command.Enimy.update();
}
missle_command.draw = function(){
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.ctx.fillStyle = "#000"; 
    this.ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT); 
    missle_command.Base.draw();
    missle_command.Enimy.draw();
}
/*=============================================================================
                            OBJECTS CONSTRUCTORS
=============================================================================*/  
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
/*=============================================================================
                            BASE
=============================================================================*/                           
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
    this.rockets = [];
    for(var i=1; i<ALL_PLAYER_ROCKETS; i++ ){
        this.rockets.push(new missle_command.constructors.rockets());
    }
}
missle_command.Base.start_roket = function(tar_x,tar_y){  
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
    
    if (count_active <= MAX_ROCKETS_PLAYER){
        this.rockets[next_rocet].active = true;
        var start_pos =  Math.floor(Math.random()*3);
        var x_pos = 0;
        var tar_xpos = tar_x//200;
        var tar_ypos = tar_y//320;
        switch(start_pos){
            case 0:
                x_pos =20
                break
            case 1:
                 x_pos =CANVAS_WIDTH/2 
                break
           case 2:
                 x_pos =CANVAS_WIDTH - 20
                break
                        }
        this.rockets[next_rocet].start_pos = x_pos;
        this.rockets[next_rocet].target_pos = [tar_xpos, tar_ypos];
        this.rockets[next_rocet].current_pos = [x_pos,CANVAS_HEIGHT - 40];
    }  
}

missle_command.Base.update = function(){
        this.rockets.forEach(function(rocket,index,rockets ){
        if (rocket.active == true && rocket.blow_up == null ){
            rocket.current_pos[1]-=5;
            var k = (rocket.target_pos[0] - rocket.start_pos)/(CANVAS_HEIGHT - 40 - rocket.target_pos[1]);
            rocket.current_pos[0] = (CANVAS_HEIGHT - 40 - rocket.current_pos[1]) * k + rocket.start_pos ;
        }
        if (rocket.current_pos != null && rocket.current_pos[1] <= rocket.target_pos[1] ){
             blow_up(rocket,index,rockets);
        }
        
        function blow_up(rocket,index,rockets){
        rocket.blow_up = true;
        
        if (rocket.blow_up_state == null) {
            rocket.blow_up_state = 0;
        } else {
            if (rocket.blow_up_state < missle_command.Enimy.mass_explosion){
                rocket.blow_up_state++;
            }else{
                rockets.splice(index, 1)
            }
            
        }
    }
        
        
    })
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
    missle_command.Base.rockets.forEach(function(rocket){
        if (rocket.active == true){
            missle_command.ctx.beginPath();
            missle_command.ctx.moveTo(rocket.start_pos, CANVAS_HEIGHT - 40);
            missle_command.ctx.lineTo(rocket.current_pos[0], rocket.current_pos[1]);
            missle_command.ctx.strokeStyle = '#c7b73a';
            missle_command.ctx.stroke();
        }
        if (rocket.blow_up==true){
              missle_command.ctx.beginPath();
              missle_command.ctx.arc(rocket.current_pos[0], rocket.current_pos[1], rocket.blow_up_state, 0, 2 * Math.PI, false);
              missle_command.ctx.fillStyle = '#fff';
              missle_command.ctx.fill();
              missle_command.ctx.lineWidth = 1;
              missle_command.ctx.strokeStyle = '#ff4500';
              missle_command.ctx.stroke();
        }
    }) 
    
}
/*=============================================================================
                            ENIMY   
=============================================================================*/  
missle_command.Enimy = {};
missle_command.Enimy.init = function(){
    this.rockets = [];
    this.mass_explosion = MASS_EXPLOSION;
    this.max_rockets = MAX_ROCKETS-1;
    for(var i = 0; i<ALL_ENIMY_ROCKETS; i++){
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
        this.rockets[next_rocet].target = target;
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
    this.rockets.forEach(function(rocket,index,rockets ){
        if (rocket.active == true && rocket.blow_up == null ){
            rocket.current_pos[1]+=1;
            var k = (rocket.target_pos - rocket.start_pos)/(CANVAS_HEIGHT - 30);
            rocket.current_pos[0] = rocket.current_pos[1] * k + rocket.start_pos;
        }
        if (rocket.current_pos != null && rocket.current_pos[1] == CANVAS_HEIGHT - 25 ){
            blow_up(rocket,index,rockets);
            Destroy_target(rocket);
        }
        
    })
    
    function blow_up(rocket,index,rockets){
        rocket.blow_up = true;
        
        if (rocket.blow_up_state == null) {
            rocket.blow_up_state = 0;
        } else {
            if (rocket.blow_up_state < missle_command.Enimy.mass_explosion){
                rocket.blow_up_state++;
            }else{
                rockets.splice(index, 1)
            }
            
        }
    }
    
    function Destroy_target(rocket){
       if (rocket.current_pos[1] >= CANVAS_HEIGHT - 25 && rocket.blow_up_state == missle_command.Enimy.mass_explosion){
           missle_command.Base.sub_points.forEach(function(sub_point,index,sub_points){
               if  (rocket.target == sub_point.position){
                   sub_points.splice(index, 1)
               }
           }) 
           }
           
    }
    
}
missle_command.Enimy.draw = function(){
    this.rockets.forEach(function(rocket){
        if (rocket.active == true){
            missle_command.ctx.beginPath();
            missle_command.ctx.moveTo(rocket.start_pos, 0);
            missle_command.ctx.lineTo(rocket.current_pos[0], rocket.current_pos[1]);
            missle_command.ctx.strokeStyle = '#ff0000';
            missle_command.ctx.stroke();
        }
        if (rocket.blow_up==true){
              missle_command.ctx.beginPath();
              missle_command.ctx.arc(rocket.current_pos[0], rocket.current_pos[1], rocket.blow_up_state, 0, 2 * Math.PI, false);
              missle_command.ctx.fillStyle = '#fff';
              missle_command.ctx.fill();
              missle_command.ctx.lineWidth = 1;
              missle_command.ctx.strokeStyle = '#ff4500';
              missle_command.ctx.stroke();
        }
    })
}
/*=============================================================================
                            OTHER  
=============================================================================*/  
missle_command.start = function(){
    setInterval(function() {
        missle_command.update();
        missle_command.draw();
        }, 1000/missle_command.FPS);
}



$(document).ready(function(){
    missle_command.init();
    missle_command.start();
    document.getElementById('canvas').addEventListener('click', function(event){
        missle_command.Base.start_roket (event.offsetX,event.offsetY)
    }, false)

})


