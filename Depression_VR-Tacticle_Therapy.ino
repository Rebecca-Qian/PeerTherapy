
int heartBeat = A0;
int accelerate = A2;
int vibrator1 = 7;
String myInput = "";
bool stringComplete = false;
String myValue = "0";
String postOutHeart = "Heart: ";
String postOutSpeed = "Speed: ";
long number = 0;
int timeThing = true;
int avHeartBeat = 0;
int avAcc = 0;
int maxHeartBeat = 0;
int maxAcc = 0;


void setup() {
  Serial.begin(9600);
  pinMode(vibrator1, OUTPUT); 
  pinMode(heartBeat, INPUT);
  pinMode(accelerate, INPUT);
  }

void loop() {
  long check = millis();
  long heartRate = analogRead(heartBeat);
  long accelerateSpeed = analogRead(accelerate);
  postOutHeart += String(heartRate);
  postOutSpeed += String(accelerateSpeed);
  
Serial.println(heartRate);
Serial.println(accelerateSpeed);


//  if(check < 100000){
//   if (heartRate > maxHeartBeat){
//      maxHeartBeat = heartRate;
//   }
//   if(accelerate > maxAcc){
//    maxAcc = accelerate;
//   }
//   number += 1;
//   avHeartBeat += heartRate;
//   avAcc += accelerate;
//  }
//  else if (timeThing){
//    timeThing = false;
//    avHeartBeat = avHeartBeat / number;
//    avAcc = avAcc / number;
//    Serial.println("Average Heart Rate: " + String(avHeartBeat));
//    Serial.println("Average Acceleration: " + String(avAcc));
//    Serial.println("Max Heart Rate: " + String(maxHeartBeat));
//    Serial.println("Max Acceleration: " + String(maxAcc));
//  }


 
 int value1 = myInput.lastIndexOf("Intensity: ") + 11;
 int value2 = myInput.lastIndexOf("Intensity: ") + 12;
 myValue = String(myInput.substring(value1, value2));

  
  if (myValue.equals("1")){
  digitalWrite(vibrator1, HIGH);
  }
  if (myValue.equals("0")){
  digitalWrite(vibrator1, LOW);
  }
  myInput = "";
}
void serialEvent() {
  while (Serial.available()) {
    char inChar = (char)Serial.read();
    myInput += inChar;
    if (inChar == '\n') {
      stringComplete = true;
    }
  }
}
