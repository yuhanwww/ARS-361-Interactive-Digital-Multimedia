class Screensaver{
  
  constructor(threshold){
    this.threshold = threshold;
    this.opacity=0;
  }

  start(){
    noStroke();
    fill("black");
    text("Let's start with something simple :)",width/2,height/2);
  }
  
  mask(){
    noStroke();
    fill(0,this.opacity);
    rect(0,0,width,height);
  }
  
  sleep(count){
    this.start();
    if (count > this.threshold){
      print("opacity: ",this.opacity);
      this.opacity += 0.005;
      this.mask();
    }
  }
  
  fail() {
    background(200,0,0);
    fill(256);
    text('You are programmed.',width/2,height/2);
  }
  
  success() {
    background(0,200,0);
    fill(256);
    text("Oops, you are NOT programmed.",width/2,height/2);
  }
  
}