/*
SparkFun Tinker Kit
Circuit 10: Motor Basics

Learn how to control one motor with the motor driver. 

This sketch was written by SparkFun Electronics, with lots of help from the Arduino community.
This code is completely free for any use.

View circuit diagram and instructions at: https://learn.sparkfun.com/tutorials/activity-guide-for-sparkfun-tinker-kit/circuit-10-motor-basics
Download drawings and code at: https://github.com/sparkfun/SparkFun_Tinker_Kit_Code/
*/

//PIN VARIABLES
//the motor will be controlled by the motor A pins on the motor driver
const int AIN1 = 8;           //control pin 1 on the motor driver for the right motor
const int AIN2 = 9;            //control pin 2 on the motor driver for the right motor
const int PWMA = 10;            //speed control pin on the motor driver for the right motor
const int BIN1 = 7;           //control pin 1 on the motor driver for the right motor
const int BIN2 = 6;            //control pin 2 on the motor driver for the right motor
const int PWMB = 5;            //speed control pin on the motor driver for the right motor

//VARIABLES
int motorSpeed = 0;       //starting speed for the motor

int photoresistor = 0;              //this variable will hold a value based on the position of the knob
int threshold = 700;                //if the photoresistor reading is below this value the light will turn on

int buzzer = 12;           //pin that the buzzer is connected to

long startTime = 0;           //timer variable for time limit on button press
long timeLimit = 20000;        //time limit to hit a button

boolean started = false;      //variable to tell the game whether or not to play the start sequence

int spin_count=0;
int hold_count=0;

/* 
  We Wish You a Merry Christmas - Traditional Christmas song
  Connect a piezo buzzer or speaker to pin 11 or select a new pin.
  More songs available at https://github.com/robsoncouto/arduino-songs                                            
                                              
                                              Robson Couto, 2019
*/
#define NOTE_B0  31
#define NOTE_C1  33
#define NOTE_CS1 35
#define NOTE_D1  37
#define NOTE_DS1 39
#define NOTE_E1  41
#define NOTE_F1  44
#define NOTE_FS1 46
#define NOTE_G1  49
#define NOTE_GS1 52
#define NOTE_A1  55
#define NOTE_AS1 58
#define NOTE_B1  62
#define NOTE_C2  65
#define NOTE_CS2 69
#define NOTE_D2  73
#define NOTE_DS2 78
#define NOTE_E2  82
#define NOTE_F2  87
#define NOTE_FS2 93
#define NOTE_G2  98
#define NOTE_GS2 104
#define NOTE_A2  110
#define NOTE_AS2 117
#define NOTE_B2  123
#define NOTE_C3  131
#define NOTE_CS3 139
#define NOTE_D3  147
#define NOTE_DS3 156
#define NOTE_E3  165
#define NOTE_F3  175
#define NOTE_FS3 185
#define NOTE_G3  196
#define NOTE_GS3 208
#define NOTE_A3  220
#define NOTE_AS3 233
#define NOTE_B3  247
#define NOTE_C4  262
#define NOTE_CS4 277
#define NOTE_D4  294
#define NOTE_DS4 311
#define NOTE_E4  330
#define NOTE_F4  349
#define NOTE_FS4 370
#define NOTE_G4  392
#define NOTE_GS4 415
#define NOTE_A4  440
#define NOTE_AS4 466
#define NOTE_B4  494
#define NOTE_C5  523
#define NOTE_CS5 554
#define NOTE_D5  587
#define NOTE_DS5 622
#define NOTE_E5  659
#define NOTE_F5  698
#define NOTE_FS5 740
#define NOTE_G5  784
#define NOTE_GS5 831
#define NOTE_A5  880
#define NOTE_AS5 932
#define NOTE_B5  988
#define NOTE_C6  1047
#define NOTE_CS6 1109
#define NOTE_D6  1175
#define NOTE_DS6 1245
#define NOTE_E6  1319
#define NOTE_F6  1397
#define NOTE_FS6 1480
#define NOTE_G6  1568
#define NOTE_GS6 1661
#define NOTE_A6  1760
#define NOTE_AS6 1865
#define NOTE_B6  1976
#define NOTE_C7  2093
#define NOTE_CS7 2217
#define NOTE_D7  2349
#define NOTE_DS7 2489
#define NOTE_E7  2637
#define NOTE_F7  2794
#define NOTE_FS7 2960
#define NOTE_G7  3136
#define NOTE_GS7 3322
#define NOTE_A7  3520
#define NOTE_AS7 3729
#define NOTE_B7  3951
#define NOTE_C8  4186
#define NOTE_CS8 4435
#define NOTE_D8  4699
#define NOTE_DS8 4978
#define REST      0

// change this to make the song slower or faster
int tempo = 140;

// notes of the moledy followed by the duration.
// a 4 means a quarter note, 8 an eighteenth , 16 sixteenth, so on
// !!negative numbers are used to represent dotted notes,
// so -4 means a dotted quarter note, that is, a quarter plus an eighteenth!!
int melody[] = {

  // We Wish You a Merry Christmas
  // Score available at https://musescore.com/user/6208766/scores/1497501
  
  NOTE_C5,4,
  NOTE_F5,4, NOTE_F5,8, NOTE_G5,8, NOTE_F5,8, NOTE_E5,8,
  NOTE_D5,4, NOTE_D5,4, NOTE_D5,4,
  NOTE_G5,4, NOTE_G5,8, NOTE_A5,8, NOTE_G5,8, NOTE_F5,8,
  NOTE_E5,4, NOTE_C5,4, NOTE_C5,4,
  NOTE_A5,4, NOTE_A5,8, NOTE_AS5,8, NOTE_A5,8, NOTE_G5,8,
  NOTE_F5,4, NOTE_D5,4, NOTE_C5,8, NOTE_C5,8,
  NOTE_D5,4, NOTE_G5,4, NOTE_E5,4,
  NOTE_F5,2
};

// sizeof gives the number of bytes, each int value is composed of two bytes (16 bits)
// there are two values per note (pitch and duration), so for each note there are four bytes
int notes = sizeof(melody) / sizeof(melody[0]) / 2;

// this calculates the duration of a whole note in ms
int wholenote = (60000 * 4) / tempo;

int divider = 0, noteDuration = 0;


void setup() {
  Serial.begin(9600);               //start a serial connection with the computer

  //set the motor contro pins as outputs
  pinMode(AIN1, OUTPUT);
  pinMode(AIN2, OUTPUT);
  pinMode(PWMA, OUTPUT);
  pinMode(BIN1, OUTPUT);
  pinMode(BIN2, OUTPUT);
  pinMode(PWMB, OUTPUT);

}

void loop() {
  photoresistor = analogRead(A0);   //set photoresistor to a number between 0 and 1023 based on how far the knob is turned
  // Serial.println(photoresistor);    //print the value of photoresistor in the serial monitor on the computer

  if (!started){
    while (photoresistor < threshold){
      Serial.println(hold_count);
      hold_count++;
    } 
    if (hold_count>100){
      started=true;
      tone(buzzer, 200, 250); 
      delay(275);
      tone(buzzer, 130, 250);  
    }
  } else if (started){
    Serial.println("yes");


    while (count < 20000){
      //if the photoresistor value is below the threshold turn the light on, otherwise turn it off
      //drive motor forward (positive speed)
      digitalWrite(AIN1, HIGH);                         //set pin 1 to high
      digitalWrite(BIN1, HIGH);                         //set pin 1 to high
      analogWrite(PWMA, 150);               //now that the motor direction is set, drive it at max speed
      analogWrite(PWMB, 150);               //now that the motor direction is set, drive it at max speed
      count++;
      Serial.println(count);
    }
    digitalWrite(AIN1, LOW);                          //set pin 1 to low
    digitalWrite(BIN1, LOW);                          //set pin 1 to low
    analogWrite(PWMA, 0);               //now that the motor direction is set, stop motor
    analogWrite(PWMB, 0);               //now that the motor direction is set, stop motor
    delay(275);

    for (int thisNote = 0; thisNote < notes * 2; thisNote = thisNote + 2) {
      // calculates the duration of each note
      divider = melody[thisNote + 1];
      if (divider > 0) {
        // regular note, just proceed
        noteDuration = (wholenote) / divider;
      } else if (divider < 0) {
        // dotted notes are represented with negative durations!!
        noteDuration = (wholenote) / abs(divider);
        noteDuration *= 1.5; // increases the duration in half for dotted notes
      }

      // we only play the note for 90% of the duration, leaving 10% as a pause
      tone(buzzer, melody[thisNote], noteDuration * 0.9);

      // Wait for the specief duration before playing the next note.
      delay(noteDuration);

      // stop the waveform generation before the next note.
      noTone(buzzer);
    }
    started=false;
  }
    
}
