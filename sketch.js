let bubbles = [];
let img;

function preload() {
  img = loadImage('img/me.jpg');
}

function setup() {
    createCanvas(600, 600);
    for (let i = 0; i < 10; i ++) {
      bubbles.push(new Bubble(width, height));
    }
}

function mousePressed() {
  bubbles.forEach( (bubble, index) => {
    if (bubble.contains(mouseX, mouseY)) {
      bubbles.splice(index, 1);
    }
  })
}

function draw(){
    background(110);
    for (bubble of bubbles) {
      bubble.move();
      bubble.show();
      bubble.bounc(width, height);

      bubbles.forEach( bub => {
        if ( bub !== bubble && bubble.intersectes(bub) ) {
          bub.overlapping = true;
          bubble.overlapping = true;
          bubble.show();
        } else {
          bub.overlapping = false;
          bubble.overlapping = false;
        }
      })
    }
}

class Bubble{
    constructor(w, h) {
        this.x = random(w);
        this.y = random(h);
        this.r = random(10, 40);
        this.color = [0, 0, 0];
        this.xspeed = 3;
        this.yspeed = 2;
        this.overlapping = false;
    }

    changeColor(color) {
      this.color[0] = color;
    }

    contains(px, py) {
      let d = dist(px, py, this.x, this.y)
      return (d < this.r) 
    }

    move() {
        this.x += this.xspeed;
        this.y += this.yspeed;
    }

    show() {
      if (this.overlapping) {
        fill(255, 5, 0 );
      } else {
        fill(this.color, 100);
      }
      
      ellipse(this.x , this.y, this.r * 2);
      stroke(25);
      strokeWeight(3);
    }

    bounc(w, h){
      if (this.x > w - this.r || this.x < this.r) {
        this.xspeed = this.xspeed * -1;
      }
      if ( this.y > h - this.r || this.y < this.r) {
        this.yspeed = this.yspeed * -1;
      }
    }

    intersectes(other) {
      let d = dist( this.x, this.y, other.x, other.y)
      return ( d < this.r + other.r ) 
    }
}
