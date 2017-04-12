/*
  Arduino Code - for AnalogReadSerial
  Reads an analog input on pin 0, prints the result to the serial monitor.
  Attach the center pin of a potentiometer to pin A0, and the outside pins to +5V and ground.

 This example code is in the public domain.
 */

// the setup routine runs once when you press reset:
void setup() {
  // initialize Serial communication
  // in order to read out data
  Serial.begin(9600); //9600 is the rate of communication
  pinMode(11, OUTPUT);
}

// the loop routine runs over and over again forever:
//continuous 
void loop() {
  if(Serial.available() > 0){
    char input = Serial.parseInt();
    analogWrite(11, input);
  }
  // read our sensor value
  // analogRead on the pin that we plugged our sensor into 
//  int sensorValue = analogRead(A0);
  // print our data so we can see it! like console.log
//  Serial.println(sensorValue);
  // add a delay to slow things down a bit
  delay(1); 
  
}
