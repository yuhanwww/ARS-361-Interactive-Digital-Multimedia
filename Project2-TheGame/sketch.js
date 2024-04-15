var my_round = 0;
var programmed_count=0;
var img_arr = [];

/* starting rule */
var rule;
var rule_count=0;

/* screensaver */
var screensaver,threshold;
var screensaver_count=0;
var curr_count = 0;
var screensaver_generator;

/* rotation */
var rotation;
var rotation_count=0;
var rotated=false;
var text_arr = [];
var rotation_curr_count = 0;

/* slide */
var slide;
var slide_count=0;
var slided=false;
var slide_generator;
var slide_curr_count=0;

function setup() {
  createMetaTag();
  createCanvas(window.innerWidth, window.innerHeight);
  textAlign(CENTER);
  textSize(16);
  imageMode(CENTER);
  
  img_arr[0] = loadImage('assets/circle.png');
  img_arr[1]  = loadImage('assets/heart.png');
  img_arr[2]  = loadImage('assets/hexagon.png');
  img_arr[3]  = loadImage('assets/pentagon.png');
  img_arr[4]  = loadImage('assets/square.png');
  img_arr[5]  = loadImage('assets/triangle.png');
  
  text_arr[0] = loadImage('assets/text1.png');
  text_arr[1] = loadImage('assets/text2.png');
  text_arr[2] = loadImage('assets/text3.png');
  text_arr[3] = loadImage('assets/text4.png');
  text_arr[4] = loadImage('assets/text5.png');
  text_arr[5] = loadImage('assets/text6.png');
  text_arr[6] = loadImage('assets/text7.png');
  text_arr[7] = loadImage('assets/text8.png');
  text_arr[8] = loadImage('assets/text9.png');
  text_arr[9] = loadImage('assets/text10.png');
  text_arr[10] = loadImage('assets/text11.png');
  
  /* starting rule */
  rule = new Rule();
  
  /* screensaver */
  screensaver_threshold=random(200,400);
  screensaver =  new Screensaver(screensaver_threshold);
  screensaver_generator = new RandomShapeGenerator(img_arr,false);

  /* rotation */
  rotation = new Rotation(text_arr);
  
  /* slide */
  slide = new Slide();
  slide_generator = new RandomShapeGenerator(img_arr,true);
}

function draw() {
  /* starting rule */
  if (my_round === 0){
    if (rule_count<550){
      rule_count++;
      rule.rule(rule_count);
    } else if (!rule.pass){
      rule.try_5_finger();
      for (let i = 0; i < touches.length; i++) {
        let t = touches[i];
        fill(256);
        ellipse(t.x, t.y, 50, 50);
      }
      if (touches.length>=5){
      // if (true){ 
        rule.pass=true;
      }
    } else {
      if (rule_count<750){
        rule_count++;
        rule.rule_end(rule_count);
      } else if (rule_count<850){
        rule_count++;
        background(256);
      } else{
        my_round = 1;
      }
    }
  }
  
  /* screensaver */
  if (my_round === 1){
    screensaver_generator.generate(screensaver_count);
    screensaver.sleep(screensaver_count++);
    // print("threshold:",screensaver.threshold);
    if (mouseIsPressed){
      my_round =1.5;
      screensaver.fail();
      programmed_count+=1;
    } else if (screensaver_count>screensaver_threshold+500){
      my_round =1.5;
      screensaver.success();
    } 
    // print("screensaver count: ",screensaver_count);
  }
  
  if (my_round ===1.5){
    curr_count++;
    // print("curr_count: ",curr_count);
    if (curr_count>150){
      my_round = 2;
    }
  }

  /* rotation */
  if (my_round ===2){
    if (width>height) {
      rotated=true;
    }
    
    if (rotation_count < 1800){
      if (rotated){
        rotation.fail();
        programmed_count++;
        my_round=2.5;
      } else if (rotation_count>1670 && touches.length>=2) {
        rotation.success();
        my_round=2.5;
      } else if (rotation_count>1750){
        rotation.fail_touch();
        my_round=2.5;
      } 
      else if (!rotated){
        rotation.rule(rotation_count++);
        // print("rotation count: ",rotation_count);
      } 
    } 
  }
  
  if (my_round===2.5){
    rotation_curr_count++;
    // print("curr_count: ",curr_count);
    if (rotation_curr_count>200){
      my_round=3;
      background(256);
    }
  }
  
  /* slide */
  if (my_round===3){
    slide_count++;
    // print("slide count: ",slide_count);
    if (slide_count<150){
      slide.start();
    } else {
      textSize(6);
      slide_generator.generate(slide_count);
      if(touches.length>=2 && slided){
        textSize(16);
        slide.fail();
        programmed_count++;
        my_round=3.5;
      } else if (slide_count>1000){
         textSize(16);
        slide.success();
        my_round=3.5;
      }
    }
  }
  
  if (my_round===3.5){
    print("slide current count: ",slide_curr_count);
    slide_curr_count++;
    // print("curr_count: ",curr_count);
    if (slide_curr_count>200&&slide_curr_count<400){
      background(256);
      fill(0);
      text("You are programmed: "+str(programmed_count)+" times.",width/2,height/2);
    } else if (slide_curr_count>400&&slide_curr_count<750) {
      background(200,0,0);
      fill(256);
      text("You are programmed when",width/2,height/2-30);
      text("You touch the screen when it's going dark",width/2,height/2-10);
      text("You turn your phone around for vertical display",width/2,height/2+10);
      text("You try to zoom in through two finger sliding",width/2,height/2+30);
    } else if (slide_curr_count>750){
      background(0,200,0);
      fill(256);
      text("You are programmed",width/2,height/2-30);
      text("because you are INTELLIGENT.",width/2,height/2-10);
      text("Thank you so much ~",width/2,height/2+10);
      text("Enjoy your day!",width/2,height/2+30);
    }
  }
  
}

function touchMoved(){
  slided = true;
}

/* full screening will change the size of the canvas */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function createMetaTag() {
  let meta = createElement('meta');
  meta.attribute('name', 'viewport');
  meta.attribute('content', 'user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height');
  
  let head = select('head');
  meta.parent(head);
}

/* prevents the mobile browser from processing some default
 * touch events, like swiping left for "back" or scrolling the page.
 */
document.ontouchmove = function(event) {
    event.preventDefault();
}
