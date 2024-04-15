var rotation_index=0;

class Rotation{
  
  constructor(){
    this.text_arr = text_arr;
  }
  
  rule(count){
    if (count<150){
      background(256);
    } else if (count%150===0){
      background(256);
      image(this.text_arr[rotation_index],width/2,height/2);
      rotation_index++;
    } 
  }
  
  fail() {
    background(200,0,0);
    fill(256);
    text('You are programmed.',width/2,height/2);
  }
  
  fail_touch() {
    background(0,0,200);
    fill(256);
    text('Did you do the right touch?',width/2,height/2);
  }
  
  success() {
    print("yes");
    background(0,200,0);
    fill(256);
    text("Oops, you are NOT programmed.",width/2,height/2);
  }
 
}