import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})
export class CountdownTimerComponent implements OnInit, OnDestroy {

intervalId = 0;
message = '';
seconds= 11;

clearTimer() {
   clearInterval(this.intervalId);
  }

constructor() { }

ngOnInit() {
  this.start();
}

ngOnDestroy(){
  this.clearTimer();
}

start(){
  this.countDown(); 
}

stop(){
  this.clearTimer();
  this.message = `Holding at T-${this.seconds} seconds`;
}

private countDown(){
  this.clearTimer();
  this.intervalId = window.setInterval(() => {
    this.seconds -= 1;
    if(this.seconds === 0){
      this.message = 'Blast off! ';
      } else{
        if(this.seconds <0){
          this.seconds = 10;  // RESET
        }
      }
    }, 1000);    
  }
}
