/* images */
let flag_img,text_img,paulista_img,homeless_img,broken_glass_img,church_img,
    high_art_img,batman_valley_img,nego_valley_img,black_art_img,inhotim_img,mining_disaster_img,
    ouro_preto_img,op_mine_img,red_img,sink_img,view_ma_img,mining_mountain_img,batman_img,nego_img,
    ims_img,working_img,sp_img,commute_img;

/* image flip setup */
var flipped; // if the image is flipped
var flip_count=0; // counter for flip extend
let cover_color; // text cover color

/* video */
let canvas;
let video;
let handpose;
let predictions = [];

/* video hand interaction */
let handPoseModel;
let currHandPose = null;
let isHandPoseModelInitialized = false;
const options = {flipHorizontal: false}
var mid_fing=[];

function preload() {
  flag_img = loadImage("assets/flag.png");
  text_img = loadImage("assets/text.png");
  paulista_img = loadImage("assets/paulista.jpg");
  homeless_img = loadImage("assets/homeless.jpeg");
  broken_glass_img = loadImage("assets/broken_glass.png");
  church_img = loadImage("assets/church.png");
  high_art_img = loadImage("assets/high_art.png");
  black_art_img = loadImage("assets/black_art.png");
  batman_valley_img = loadImage("assets/batman_valley.png");
  ngeo_valley_img = loadImage("assets/nego_valley.png");
  inhotim_img = loadImage("assets/inhotim.png");
  mining_disaster_img = loadImage("assets/mining_disaster.jpeg");
  ouro_preto_img = loadImage("assets/ouro_preto.png");
  op_mine_img = loadImage("assets/op_mine.jpeg");
  red_img = loadImage("assets/red.png");
  sink_img = loadImage("assets/sink.png");
  view_ma_img = loadImage("assets/view_ma.jpg");
  mining_mountain_img = loadImage("assets/mining_mountain.png");
  batman_img = loadImage("assets/batman.png");
  nego_img = loadImage("assets/nego.jpg");
  ims_img = loadImage("assets/ims.png");
  working_img = loadImage("assets/working.png");
  sp_img = loadImage("assets/sp.png");
  commute_img = loadImage('assets/commute.jpg');
  
  soundFormats('mp3');
  girl = loadSound('assets/girl.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // noStroke();
  // imageMode(CENTER);
  textAlign(CENTER);
  
  flag = new Flag();
  imagePair_100_10 = new imagePair(100,10,paulista_img,homeless_img);
  imagePair_540_10 = new imagePair(540,10,church_img,broken_glass_img);
  imagePair_980_10 = new imagePair(980,10,sp_img,commute_img);
  imagePair_90_275 = new imagePair(90,275,batman_valley_img,ngeo_valley_img);
  // imagePair_360_250 = new imagePair(360,250,high_art_img,black_art_img);
  imagePair_990_275 = new imagePair(990,275,inhotim_img,mining_disaster_img);
  imagePair_100_540 = new imagePair(100,540,ouro_preto_img,op_mine_img);
  imagePair_540_540 = new imagePair(540,540,ims_img,working_img);
  imagePair_980_540 = new imagePair(980,540,high_art_img,black_art_img);
  
  video = createCapture(VIDEO);
  video.size(width, height);

  handPoseModel = ml5.handpose(video,options, onHandPoseModelReady);
  handPoseModel.on("predict", onNewHandPosePrediction);

  video.hide();
}

function onHandPoseModelReady() {
  console.log("HandPose model ready!");
  isHandPoseModelInitialized = true;
}

function onNewHandPosePrediction(predictions) {
  if (predictions && predictions.length > 0) {
    currHandPose = predictions[0];
    // console.log(curHandPose);
  } else {
    currHandPose = null;
  }
}

function detectHand(handPose){  
  // for (let j = 0; j < handPose.landmarks.length; j += 1) {
  //   const landmark = handPose.landmarks[j];
  //   fill(0, 255, 0);
  //   noStroke();
  //   text(j,windowWidth-landmark[0]/640*windowWidth, landmark[1]/480*windowHeight);
  // }
  stroke('white');
  noFill();
  mid_fing[0] = windowWidth-handPose.landmarks[11][0]/640*windowWidth;
  mid_fing[1] = handPose.landmarks[11][1]/480*windowHeight;
  ellipse(mid_fing[0],mid_fing[1],10,10);
  // print(mid_fing);
  return mid_fing;
}

function draw() {
  // girl.play();
  background(0);
  image(text_img,540,275);
  cover_color = color(0,0,0,255*flip_count/8);
  noStroke();
  fill(cover_color);
  rect(540,275,350,127);
  cover_color = color(0,0,0,255-255*flip_count/8);
  noStroke();
  fill(cover_color);
  rect(540,401.5,350,120);
  // image(video, 0, 0, width, height);

  if(currHandPose){
    hand_loc = detectHand(currHandPose);
    print(hand_loc);
    imagePair_100_10.show(hand_loc);
    imagePair_540_10.show(hand_loc);
    imagePair_980_10.show(hand_loc);
    imagePair_90_275.show(hand_loc);
    imagePair_990_275.show(hand_loc);
    imagePair_100_540.show(hand_loc);
    imagePair_540_540.show(hand_loc);
    imagePair_980_540.show(hand_loc);
  } else {
    imagePair_100_10.appear();
    imagePair_540_10.appear();
    imagePair_980_10.appear();
    imagePair_90_275.appear();
    // imagePair_360_25appear(););
    imagePair_990_275.appear();
    imagePair_100_540.appear();
    imagePair_540_540.appear();
    imagePair_980_540.appear();
  }
}

class imagePair {
  constructor(x, y,image1,image2) {
    this.x = x;
    this.y = y;
    this.image1 = image1;
    this.image2 = image2;
    this.i = 0;
    this.c = 0;
    this.flipped=0;
  }
  
  appear(){
    image(this.image1,this.x,this.y,360,240);
  }　

  show(hand_loc){
    // print(this.flipped);
    if(hand_loc[0] >this.x && hand_loc[0] <this.x+360 && hand_loc[1] > this.y && hand_loc[1] < this.y+240){
      this.flip();
    } else {
      if (this.flipped==0){
        image(this.image1,this.x,this.y,360,240);
      } else if (this.flipped==1){
        image(this.image2,this.x,this.y,360,240);
      }
    }
  }

  flip() {
    // print('flip:',this.flipped);
    // print('c:',this.c);
    if (this.flipped==0){
      if (this.c<90){
        this.shrink(this.image1);
      } else if (this.c<180) {
        this.expand(this.image2);
      } else {
        this.flipped=1;
        this.c=0;
        this.i=0;
        flip_count++;
      }
    } else if (this.flipped==1){
      if (this.c<90) {
        this.shrink(this.image2);
      } else if (this.c<180) {
        this.expand(this.image1);
      } else {
        this.c=0;
        this.flipped=0;
        this.i=0;
        flip_count--;
      }
    }
    this.c++;
  }
  
  shrink(img){
    image(img,this.x+this.i,this.y,360-2*this.i,240);
    this.i+=2;
  }
  
  expand(img){
    image(img,this.x+this.i,this.y,360-2*this.i,240);
    this.i-=2;
  }
  
}

