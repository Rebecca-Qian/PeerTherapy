

// pin constants

#define HEART_ON 4 // digital pin 4; turns on heart rate sensor
#define HEART_SIGNAL 2 // digital pin 2; reads heart signal digitally
#define ACCEL A2 // analog pin 2
#define VIBE 7 // digital pin 7

String myInput = "";
bool stringComplete = false;
String myValue = "0";
int beat = 0;

void setup() {
  // initialize Serial with baud 9600
  Serial.begin(9600);

  // digital output
  pinMode(VIBE, OUTPUT); 
  pinMode(HEART_ON, OUTPUT);

  // digital input
  pinMode(HEART_SIGNAL, INPUT);
}

int getHeartRate(int heartOn, int heartSignal) {
  // measures 10ms intervals
  int counter;
  int reading;
  bool spike = false;
  
  // first activate the heart monitor
  digitalWrite(heartOn, HIGH);
  counter = millis();
  delay(10);
  digitalWrite(heartOn, LOW);

  // now get the reading
  while (spike == false) { 
    reading = digitalRead(heartSignal);
    if (reading != 0) {
      spike = true;
      counter = millis() - counter;
    }
  }

  return counter;
}

void loop() { // main function
 //Serial.println(getHeartRate(HEART_ON, HEART_SIGNAL));  
digitalWrite(HEART_ON, HIGH);
Serial.println(digitalRead(HEART_SIGNAL));
 /*
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
  delay(20);
  */
}

/*
void serialEvent() {
  while (Serial.available()) {
    char inChar = (char)Serial.read();
    myInput += inChar;
    if (inChar == '\n') {
      stringComplete = true;
    }
  }
}

*/
