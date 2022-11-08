/**
 * Please implement an alarm clock using Object Oriented Programming. If you are not familiar or comfortable with
object-oriented programming, we suggest you give this article a quick read to ensure you understand it before you
attempt it.
The alarm clock should have the following features:
• It displays the current time
• A user can create any number of alarms by specifying the alarm time and day of the week and time when the
alarm should alert
• A user can snooze an alarm maximum of 3 times at an interval of 5 minutes each.
• A user can delete an alarm
 */


const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Alarm {
  constructor() {
    this.currentDateTime;
    this.hours;
    this.min;
    this.sec;
    this.date;
    this.mon;
    this.year;
    this.day;

    this.keyday = {
      1: "mon",
      2: "tue",
      3: "wed",
      4: "thu",
      5: "fri",
      6: "sat",
      0: "sun",
    };
    this.setClock();
    this.startClock();
    this.userInteraction = false;
    this.no_of_alarm = {};
  }
  setClock() {
    this.currentDateTime = new Date();
    this.hours = this.currentDateTime.getHours();
    this.min = this.currentDateTime.getMinutes();
    this.sec = this.currentDateTime.getSeconds();
    this.date = this.currentDateTime.getDate();
    this.mon = this.currentDateTime.getMonth();
    this.year = this.currentDateTime.getFullYear();
    this.day = this.keyday[this.currentDateTime.getDay()];
  }
  checkAlarm() {
    for (let key in this.no_of_alarm) {
      let split = this.no_of_alarm[key].alertTime.split(":");
      let hr = split[0];
      let min = split[1];
      if (this.hours == hr && this.min == min && this.userInteraction==false) {
        this.notifyUser(key)
      }
    }
  }
  snoozeAlarm(key) {
    console.log("snozzing", this.no_of_alarm[key],"hello");
    this.no_of_alarm[key].snoozed = this.no_of_alarm[key].snoozed+1;
    console.log("snozzing", this.no_of_alarm[key], "hello");

    let altime = this.no_of_alarm[key].alertTime.split(":");
        console.log("snozzing", altime, "altime");

    let inc_alertTime = new Date(new Date().setHours(parseInt(altime[0]),parseInt(altime[1])));
    console.log(
      "snozzing",
      inc_alertTime,
      "inc_alertTime",
     inc_alertTime
    );
    inc_alertTime = new Date(inc_alertTime.getTime() + 1 * 60000);
    console.log("snozzing", inc_alertTime, "inc_alertTime");
    this.no_of_alarm[
      key
    ].alertTime = `${inc_alertTime.getHours()}:${inc_alertTime.getMinutes()}`;
    
    console.log("snozzed", this.no_of_alarm[key]);
    this.userInteraction = false;

  }
  notifyUser(key) {
    let ac_key = key;
    key = key.split("-");
    let day = key[0];
    let time = key[1];
    console.log(`Alarm for ${day},${time}`);
    this.userInteraction=true;
     console.log(this.userInteraction, "userInteraction");
    /**Ask the user wants to snooze ? */
    if (this.no_of_alarm[ac_key].snoozed < 3){
        
      readline.question("snooze Y or N ? ", (val) => {
        console.log("callback triggered", val, this.no_of_alarm[ac_key]);
        if (val.toUpperCase() == "Y") {
          if (this.no_of_alarm[ac_key].snoozed < 3) {
            this.snoozeAlarm(ac_key);
          }
        }
      });
    }

   
  }
  startClock() {
    setInterval(() => {
      this.setClock();
      if (Object.keys(this.no_of_alarm).length > 0 && !this.userInteraction) {
        this.checkAlarm();
      }
    }, 1000);
  }

  parseTime() {
    // display 24 and 12
    let hour_12;
    if (this.hours > 12) {
      hour_12 = this.hours - 12;
    }
    console.log(
      `24 hour based - ${this.hours}:${this.min}:${
        this.sec
      }\n12 hour based - ${hour_12}:${this.min}:${this.sec} ${
        this.hours > 12 ? "PM" : "AM"
      }`
    );
  }

  displayCurrentTime() {
    this.parseTime();
  }
  getAlarmKey(day,hour,min) {
    let key = `${
      !isNaN(day) ? this.keyday[parseInt(day)] : day.toLowerCase()
    }-${parseInt(hour)}:${parseInt(min)}`;
    if (key.includes("undefined") || key.includes("null")) {
      console.log("invalid param's", key);
      return false;
    }
    return key;
  }
  createAlarm(day, hour, min, alertTime) {
    console.log(isNaN(day), day);

    let value = this.getAlarmKey(day, hour, min);

    if (value != false) {
      this.no_of_alarm[value] = {
        alertTime: alertTime,
        snoozed: 0,
      };
    //   console.log(this.no_of_alarm);
    }
  }

  deleteAlarm(day, hr, min) {
    let value = getAlarmKey;
    day, hr, min;
    if (value) {
      if (this.no_of_alarm[value] == undefined)
        console.log("No Such Alarm Created!");
      else delete this.no_of_alarm[value];
    }
  }
}

let clock = new Alarm();
clock.displayCurrentTime();
clock.createAlarm("Tue", "16", "06", "19:57");


// setTimeout(() => {
//   clock.displayCurrentTime();
//   clock.createAlarm("01", "20", "30", "14:50");
//   clock.createAlarm("01", "20", "30", "14:55");
// }, 10000);
