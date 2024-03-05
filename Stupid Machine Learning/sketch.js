var tx,ty,word,weight;
var keys = [];
var arrCount = {};
// var request = "Train the computer so it gives out the correct answer.";
var question = "What is the background color of the screen?";
var img,index,answer,answerIndex,inputTimes,inputAnswer,colorToAdd,nonBlack;
var askComputerButton,inputBox,inputButton,continueButton,colorButton;
var wordArr = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "purple", "pink", "brown", "white", "gray", "cyan", "magenta","red", "orange", "yellow", "green", "blue", "indigo", "violet", "purple", "pink", "brown", "white", "gray", "cyan", "magenta"];


function preload() {
  img = loadImage('cloud.png');
}

function setup() {
  createCanvas(400, 600);
  inputTimes = 0;
  time = millis();
  // background(0);
  start();
  // defaultSetUp();
  fontSize = 25;
  nonBlack=0;
}

function start(){
  background(0);
  fill('white');
  text("Train the computer to output the correct answer.",30,100);
  continueButton = createButton('Continue');
  continueButton.position(300, 90);
  continueButton.mousePressed(() => {
    continueButton.remove();
    text("Use 'Ask Computer' button to see its response.",30,130);
    text("And then train the computer by replacing the answer with a new one.",30,150);
    continueButton = createButton('Continue');
    continueButton.position(300, 160);
    continueButton.mousePressed(() => {
      continueButton.remove();
      defaultSetUp();
    })
  })
}

function defaultSetUp(){
  background(0);
  index = 0;
  
  askComputerButton = createButton('Ask the computer');
  askComputerButton.position(50, 350);

  askComputerButton.mousePressed(() => {
    askComputer();
  })

  fill('white');
  // text(request,50,300);
  text(question,50,330);
  text('Training count: '+inputTimes,10,20);
  
  putWord();
}

function draw() {
  // input();
  // putWord();
}

function putWord(){
  imageMode(CENTER);
  img.loadPixels();
  for(var x = 0; x < img.width; x+=fontSize){
    for(var y = 0; y < img.height; y+=fontSize){
      var pix = img.get(x, y);
      if(pix[3] === 255){
        if(index < wordArr.length){
          if (wordArr[index]=='black'){
            fill('white');
            text(wordArr[index].toUpperCase(), x+random(-5,5), y+random(-5,5)); 
          } else {
            fill(wordArr[index])
            text(wordArr[index], x+random(-5,5), y+random(-5,5)); 
          }
          x += wordArr[index].length;
          index++;
        }
      }
    }
  }
}

function askComputer(){
  answerIndex = int(random(0,wordArr.length));
  answer = wordArr[answerIndex];
  fill('black')
  rect(200,350,100,20);
  fill(answer);
  text(answer,230,365);
  fill('white');
  if (answer == 'black'){
    answerCorrect();
  } else {
    answerIncorrect();
  }
}

function answerCorrect(){
  text("CORRECT.",50,400);
  askComputerButton.remove();
  text('Congratulations!',50,430);
  text('It took you ' + str(inputTimes) +' times to train the model!',50,460);
  text("The computer's brain contains: ",50,490);
  returnArrCount();
}

function answerIncorrect(){
  text("INCORRECT.",50,395);
  if (inputTimes>=5){
    text("Push the button to train the computer.",50,420);
    colorToAdd = wordArr[int(random(14))];
    colorButton = createButton(colorToAdd);
    colorButton.position(300,405);
    
    text("Or add your answer to train the computer.",50,445);
    inputBox = createInput();
    inputBox.position(width/2-150,460);
    inputButton = createButton('Submit');
    inputButton.position(width/2,460);
    
    colorButton.mousePressed(colorEditArr);
    inputButton.mousePressed(inputEditArr);
  } else {
    text("Push the button to train the computer.",50,420);
    colorToAdd = wordArr[int(random(14))];
    colorButton = createButton(colorToAdd);
    colorButton.position(300,405);
    colorButton.mousePressed(colorEditArr);
  } 
}

function colorEditArr(){
  if (inputTimes>=5){
    inputButton.remove();
    inputBox.remove();
  }
  colorButton.remove();
  inputTimes++;
  wordArr.splice(answerIndex, 1); 
  wordArr.push(colorToAdd);
  defaultSetUp();
}

function inputEditArr(){
  inputAnswer = inputBox.value();
  wordArr.splice(answerIndex, 1); 
  wordArr.push(inputAnswer);
  inputButton.remove();
  inputBox.remove();
  colorButton.remove();
  inputTimes++;
  defaultSetUp();
}

function returnArrCount(){
  for (const num of wordArr) {
    arrCount[num] = arrCount[num] ? arrCount[num] + 1 : 1;
  }
  keys = Object.keys(arrCount);
  
  text("Correct Answer: ",100,520);
  text(arrCount["black"],200,520);
  text("Non-correrct answers: ",100,550);
  text(wordArr.length-arrCount["black"],230,550);
}