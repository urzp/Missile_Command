var missle_command = missle_command || {};

//missle_command.canvas = document.getElementById('canvas'); 
//missle_command.ctx = canvas.getContext('2d'); 
//missle_command.FPS = 30;

missle_command.init = function(){
        this.canvas = document.getElementById('canvas'); 
        this.ctx = canvas.getContext('2d'); 
        this.FPS = 30;
        this.ctx.clearRect(0, 0, 800, 600);
        this.ctx.fillStyle = "#000"; 
        this.ctx.fillRect(0,0,800,600); 
}
    
missle_command.Base = {};
missle_command.Enimy = {};


missle_command.start = setInterval(function() {
  //update();
  //draw();
}, 1000/missle_command.FPS);

$(document).ready(function(){
    missle_command.init();
    //missle_command.start();
})


