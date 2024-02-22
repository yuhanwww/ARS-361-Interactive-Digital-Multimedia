/**
  int x,y: mouth right bottom coordinates
  bool bottom: if mouth reaches bottom
  int dx,dy: speed of x,y changing
  int r,g,b: dinosaur color rgb coordinates
  int c: random count how long mouth stays at top & bottom
  int mx,my: random position for mouth
*/
var x,y,bottom,dy,dx,r,g,b,mx,my; 
var palette = ['#ebd1d1','#e8d7cc','#f0e9d1','#f1f5d7','#e1f0d3','#d4ebd3','#d5f0e4','#cee9eb','#d1dded','#dcd5ed','#e6d5ed']

function setup() {
  createCanvas(400, 400);
  
  bottom = false;
  dx = random(-0.1,0.2);
  dy = random(0.5,3);
  r = random(0,100);
  g = random(0,100);
  b = random(0,100);
  c = random(0,20);
  mx = random(50,300);
  my = random(50,300);
  x = mx-4;
  y = my+20;
  
  // change sequence of color in the background
  let removed = palette.shift();
  palette.push(removed);
}

function draw() {
  //background
  background(240, 213, 226);
  myBackground();
  
  // movable dinosaur
  drawDinosaur(r,g,b);
  
  // random generate mouth
  openMouth(x,y);
  if (!bottom){
    y += dy;
    x += dx;
  } else {
    y -= dy;
    x -= dx;
  }
  reachBottom(y);
}

function myBackground(){
  /** Background Gradient */
  noStroke();
  for (let i=0;i<11;i++){
    fill(palette[i]);
    ellipse(460,0,1200-i*100,1200-i*100);
  }
}

function drawDinosaur(r,g,b){
  /** Draw the dinosaur static part */
  noFill();
  stroke(r+y/1.5,g+y/1.5,b+y/1.5);
  strokeWeight(5);
  //head
  arc(mouseX,mouseY,100,100,radians(-200),radians(-20));
  line(mouseX+47,mouseY-17,mouseX+52,mouseY);
  line(mouseX+52,mouseY,mouseX+54,mouseY+10);
  arc(mouseX-460,mouseY+190,1100,1000,radians(340),radians(350));
  //fin
  line(mouseX+34,mouseY-37,mouseX+44,mouseY-50);
  arc(mouseX+52,mouseY-44,20,20,radians(220),radians(0));
  line(mouseX+62,mouseY-46,mouseX+58,mouseY-30);
  line(mouseX+57,mouseY-30,mouseX+66,mouseY-15);
  arc(mouseX+57,mouseY-18,17,32,radians(10),radians(140));
  //eyes
  ellipse(mouseX-23,mouseY-10,20,30);
  ellipse(mouseX+10,mouseY-11,20,30);
  fill(0);
  ellipse(mouseX-25,mouseY-8,10,10);
  ellipse(mouseX+8,mouseY-8,11,10);
  //mouth top
  noFill();
  stroke(0);
  stroke(r+y/1.5,g+y/1.5,b+y/1.5);
  arc(mouseX+55,mouseY+60,300,100,radians(200),radians(240));
}

function openMouth(x,y){
  /** Call all mouth parts */
  line(mx,my,x,y);
  mouthBottom(x,y);
  mouthFill(x,y)
}

function mouthBottom(x,y){
  /** Mouth line part */
  line(x-60,y+3,x-50,y-2);
  line(x-50,y-3,x-40,y+2);
  line(x-40,y+3,x-30,y-2);
  line(x-30,y-3,x-20,y+2);
  line(x-20,y+3,x-10,y-2);
  line(x-10,y-3,x,y);
}
 
function mouthFill(x,y){
  /** Mouth fill part */
  noStroke();
  fill(256);
  beginShape();
  vertex(mx-52,my-3);
  vertex(mx-5,my-5);
  vertex(x-5,y-5);
  vertex(x-55,y-5);
  endShape();
}

function reachBottom(y){
  /** Check if mouth is open to the bottom, if yes re-setup*/
  if (y > my+150){
    bottom = true;
  } else if (y < my){
    bottom = false;
    setup();
  }
}
