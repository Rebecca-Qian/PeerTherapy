bool heartbeatDetected(int IRSensorPin, int delayVal) {
  static int maxValue = 0;
  static bool isPeak = false;
  int rawValue;
  bool result = false;
  
  rawValue = analogRead(IRSensorPin);
  rawValue *= (1000/delayVal);
  
  if (rawValue * 4L < maxValue) {
    maxValue = rawValue * 0.8;
  }
  
  if (rawValue > maxValue - (1000/delayVal)) {
    if (rawValue > maxValue) {
      maxValue = rawValue;
    }
    
    if (isPeak == false) {
      result = true;
    } 
    
    isPeak = true;
  } else if (rawValue < maxValue - (3000/delayVal)) {
    isPeak = false;
    maxValue -= (1000/delayVal);
  }
  
  return result;
}

// main code

int hrLedPin = 13;
int analogPin = 0;

int leftVibe = 3;
int rightVibe = 4;

const int delayMsec = 60;

String myInput = "";
bool stringComplete = false;
String leftValue = "0";
String rightValue = "0";
int beat = 0;

void setup() {
  pinMode(hrLedPin, OUTPUT);
  
  Serial.begin(9600);
  Serial.println("Initialize.");
}

void serialEvent() {
  while (Serial.available()) {
    char inChar = (char)(Serial.read());
    myInput += inChar;
    if (inChar == '\n') {
      stringComplete = true;
    }
  }
}

void loop () {
  static int beatMsec = 0;
  int heartRateBPM = 0;
  
  int value_left = myInput.lastIndexOf("Intensity: ") + 11;
  int value_right = value_left + 1;
  int value_end = value_right + 1;
  
  leftValue = String(myInput.substring(value_left, value_right));
  rightValue = String(myInput.substring(value_right, value_end));
  
  if (leftValue.equals("3")) {
    analogWrite(leftVibe, 255);
  } else if (leftValue.equals("1")) {
    analogWrite(leftVibe, 64);
  } else if (leftValue.equals("2")) {
    analogWrite(leftVibe, 128);
  } else {
    analogWrite(leftVibe, 0);
  }
  
  if (rightValue.equals("3")) {
    analogWrite(rightVibe, 255);
  } else if (rightValue.equals("1")) {
    analogWrite(rightVibe, 64);
  } else if (rightValue.equals("2")) {
    analogWrite(rightVibe, 128);
  } else {
    analogWrite(rightVibe, 0);
  }
  
  if (heartbeatDetected(analogPin, delayMsec)) {
    heartRateBPM = 60000 / beatMsec;
    digitalWrite(hrLedPin, 1);

    if (heartRateBPM > 160) {
      heartRateBPM = 160;
    } else if (heartRateBPM < 75) {
      heartRateBPM = 75;
    }
    
    Serial.print("HR: ");
    Serial.println(heartRateBPM);
    
    beatMsec = 0;
  } else {
    digitalWrite(hrLedPin, 0);
  }
  
  delay(delayMsec);
  beatMsec += delayMsec;
  stringComplete = false;
}
