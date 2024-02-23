function setup() {
  createCanvas(180, 300);
}

function draw() {
  background(247, 228, 241);
  myBackground();
  drawDinosaur();
  openMouth();
  // print(mouseX,mouseY);
}

function myBackground(){
  noStroke();
  fill(255,227,227);
  ellipse(460,0,1000,1000);
  fill(252, 242, 225);
  ellipse(460,0,900,900);
  fill(251, 255, 227);
  ellipse(460,0,800,800);
  fill(239, 255, 227);
  ellipse(460,0,700,700);
  fill(227, 255, 240);
  ellipse(460,0,600,600);
}

function drawDinosaur(){
  noFill();
  stroke(0);
  strokeWeight(5);
  //head
  arc(100,100,100,100,radians(-200),radians(-20));
  line(147,83,152,100);
  line(152,100,154,110);
  arc(-360,290,1100,1000,radians(340),radians(350));
  //fin
  line(134,63,144,50);
  arc(152,56,20,20,radians(220),radians(0));
  line(162,54,158,70);
  line(157,70,166,85);
  arc(157,82,17,32,radians(10),radians(140));
  //eyes
  ellipse(77,90,20,30);
  ellipse(110,89,20,30);
  fill(0);
  ellipse(75,92,10,10);
  ellipse(108,92,11,10);
  //mouth top
  noFill();
  stroke(0);
  strokeWeight(5);
  arc(155,160,300,100,radians(200),radians(240));
}

function openMouth(){
  line(122,111,mouseX,mouseY);
  mouthBottom(mouseX,mouseY);
  mouthFill(mouseX,mouseY);
}

function mouthBottom(x,y){
  line(x-60,y+3,x-50,y-2);
  line(x-50,y-3,x-40,y+2);
  line(x-40,y+3,x-30,y-2);
  line(x-30,y-3,x-20,y+2);
  line(x-20,y+3,x-10,y-2);
  line(x-10,y-3,x,y);
}
  
function mouthFill(x,y){
  noStroke();
  fill(256);
  beginShape();
  vertex(58,124);
  vertex(115,124);
  vertex(x-5,y-5);
  vertex(x-55,y-5);
  endShape();
}