class Rule{
  
  constructor(){
    this.pass=false;
  }

  rule(count){
    if (count<100){
      fill("rgb(233,113,204)");
      text("Welcome to the game.",width/2,height/2);
    } else if (count<200){
      background(256);
      fill("orange");
      text("I promise it's fun!",width/2,height/2);
    } else if (count<350){
      background(256);
      fill("red");
      text("You will see random polygons",width/2,height/2-10);
      text("appear now and then.",width/2,height/2+10);
    } else if (count<550){
      background(256);
      fill("blue");
      text("Touch the screen with 5 fingers ",width/2,height/2-30);
      text("when you see: ",width/2-10,height/2-10);
      // triangle(width/2+20,height/2+30,width/2,height/2,width/2-20,height/2+30);
      image(img_arr[5], width/2-10,height/2+20);
      
    } else {
      background(256);
    } 
  }
  
  try_5_finger(){
    background(256);
    fill("blue");
    text("Let's try putting 5 fingers on the screen first.",width/2,height/2);
  }
  
  rule_end(count){
    background(256);
    fill("green");
    text("Easy huh?",width/2,height/2-30);
    text("Enjoy~",width/2,height/2-5);
    text("Try not to be 'Programmed' ;) ",width/2,height/2+30);
  }
  
}