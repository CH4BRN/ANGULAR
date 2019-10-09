import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loop-back',
  template: 
  `
    <input #box (leyup)="0">
    <p>{{box.value}}</p>
  `
})
export class LoopBackComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
