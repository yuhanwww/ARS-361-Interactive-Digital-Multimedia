class Slide{
  
  constructor(){
    this.hold = false; 
  }

  start(){
    noStroke();
    fill("black");
    text("Final round:",width/2,height/2-30);
    text("Touch with 5 fingers",width/2,height/2-10);
    text("when the text",width/2,height/2+10);
    text("align with the shape",width/2,height/2+30);
  }
  
  prompt(){
    
  }
  
  fail() {
    background(200,0,0);
    fill(256);
    text('You are programmed.',width/2,height/2);
  }
  
  success() {
    background(0,200,0);
    fill(256);
    text("You are NOT programmed, but why not?",width/2,height/2);
  }
 
}