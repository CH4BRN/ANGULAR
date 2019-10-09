import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-click-me',
  templateUrl: './click-me.component.html',
  styleUrls: ['./click-me.component.css']
})
export class ClickMeComponent implements OnInit {

  constructor() { }

  clickMessage = '';

  onClickMe(){
    this.clickMessage = "You r my hero ! ";
  }

  ngOnInit() {
  }

}
