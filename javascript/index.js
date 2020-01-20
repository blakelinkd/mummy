var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var x = null;
var y = null;
var start = null;
var jumping = null;

canvas.addEventListener('mousemove', function(event) {
    x = event.clientX;
    y = event.clientY;
});

canvas.addEventListener('click', function(event) {
   jumping = true; 
});

canvas.addEventListener('touchmove', function(event) {
    event.preventDefault();
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;
});



function Sprite(x, y, image) {
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.width = image.width;
    this.height = image.height;
    this.spritesheet = image;

    this.draw = function() {
        console.log(this.width + "x" + this.height);
        ctx.drawImage(this.spritesheet,
            this.frame * this.width / 9, 0, this.width / 9, this.height / 6, this.x, this.y, this.width / 9, this.height / 6);
        this.frame += 1;
        if (this.frame > 8) {
            this.frame = 0;
        }


    }
    this.moveX = function(x) {
        this.x += x;
    }
    this.moveY = function(y) {
        this.y += y;
    }
    this.getX = function() {
        return this.x;
    }
    this.toString = function() {
        return "{ x: " + this.x + '} { y: ' + this.y + '}';
    }
    this.update = function(timestep) {
        if(!jumping && this.y <= ( 600 - (this.height / 6)))
            this.y += 82;
        if(jumping && this.y >= 0) {
            this.y -= 74;
            if(this.y <= 0)
                jumping = false
        
        }
    }
}
const sprite = new Sprite(0, 0,
    document.getElementById('source'));
const sprite2 = new Sprite(0, 1, document.getElementById('source'));

function loop(timestep) {
    if (!start)
        start = timestep;


    if ((timestep - start) > 40) {
        start = timestep;
        
        ctx.clearRect(0, 0, 600, 800);
        //sprite.update(timestep);
        //draw();
        sprite.draw();
        sprite.update(timestep);
        
    }



    requestAnimationFrame(loop); // ...because of this line

    function draw() {
        if (x == null) {
            return; // don't do anything until the mouse is on the screen
        }

        // all the Math.sin() and Date.now() stuff is just an easy
        // way to rotate through colours and sizes. There are lots
        // of ways to do this!
        var hue = 360 * Math.sin(Date.now() / 1000);
        var radius = 20 + (20 * Math.sin(Date.now() / 500));

        ctx.fillStyle = ctx.fillStyle = 'hsla(' + hue + ',100%,50%,1)';

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, true); // draw a circle at x, y
        ctx.fill();
    }

}

loop();