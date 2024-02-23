var num = 3;
function setup() {
  createCanvas(500, 500);
  background(220);
  text("Press any number bigger than 3. Press 'c' to clear. Current key: "+num,10,20);
}

function draw() {
  // var j = 0;
  if (keyIsPressed){
    noStroke();
    fill(220);
    rect(0,0,400,50);
    if (key === 'c'){
      setup();
    } else if (key>=3 && key<=9){
      num = key;
      fill(color(random(0,200), random(0,200), random(0,200)));
      text("Press any number bigger than 3. Press 'c' to clear. Current key: "+num,10,20);
    } else {
      fill(color(random(0,200), random(0,200), random(0,200)));
      text("Press any number bigger than 3. Press 'c' to clear. Current key: "+num,10,20);
    }
  }
  
  noFill();
  if (mouseIsPressed) { 
    regularPolygon(num,2*PI/num,mouseX,mouseY,random(0,num*10),color(random(0,256), random(0,256), random(0,256)),random(0,180));
  }

}

function regularPolygon(n,theta, cx, cy, r, color, alpha) {
  stroke(color);
  // draw polligon   
  beginShape();
  for (var i = 0; i <= n+1; i++){
    vertex(cx + r * Math.cos(i*theta + alpha),cy + r * Math.sin(i*theta + alpha));
  }  
  endShape();
  
}
