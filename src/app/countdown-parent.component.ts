import { AfterViewInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Component }                from '@angular/core';
import { CountdownTimerComponent }  from './countdown-timer.component';


//// Local variable, #timer, version
@Component({
  selector: 'app-countdown-parent-lv',
  template: `
  <h3>Countdown to Liftoff (via local variable)</h3>
  <button (click)="timer.start()">Start</button>
  <button (click)="timer.stop()">Stop</button>
  <div class="seconds">{{timer.seconds}}</div>
  <app-countdown-timer [totalSeconds] = "totalSeconds" #timer></app-countdown-timer>
  `,
  styleUrls: ['../assets/demo.css']
})
export class CountdownLocalVarParentComponent { totalSeconds = 11; }

//// View Child version
@Component({
  selector: 'app-countdown-parent-vc',
  template: `
  <h3>Countdown to Liftoff (via ViewChild)</h3>
  <button (click)="start()">Start</button>
  <button (click)="stop()">Stop</button>
  <div class="seconds">{{ seconds1() }}</div>
  <div class="seconds">{{ seconds2() }}</div>
  <app-countdown-timer [totalSeconds] = "totalSeconds1"></app-countdown-timer>
  <app-countdown-timer [totalSeconds] = "totalSeconds2"></app-countdown-timer>
  `,
  styleUrls: ['../assets/demo.css']
})
export class CountdownViewChildParentComponent implements AfterViewInit {

  @ViewChildren(CountdownTimerComponent)
  private timerComponents: QueryList<CountdownTimerComponent>;

  totalSeconds1 = 11;
  totalSeconds2 = 20;

  seconds1() { return 0; }
  seconds2() { return 0; }

  ngAfterViewInit() {
    // Redefine `seconds()` to get from the `CountdownTimerComponent.seconds` ...
    // but wait a tick first to avoid one-time devMode
    // unidirectional-data-flow-violation error
    setTimeout(() => this.seconds1 = () => this.timerComponents.toArray()[0].seconds, 0);
    setTimeout(() => this.seconds2 = () => this.timerComponents.toArray()[1].seconds, 0);
  }

  start() { this.timerComponents.toArray()[0].start(); this.timerComponents.toArray()[1].start(); }
  stop() { this.timerComponents.toArray()[0].stop(); this.timerComponents.toArray()[1].stop();}
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/