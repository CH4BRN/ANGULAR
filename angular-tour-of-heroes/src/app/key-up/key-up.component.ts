import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-key-up',
  templateUrl: './key-up.component.html',
  styleUrls: ['./key-up.component.css']
})
export class KeyUpComponent implements OnInit {

  constructor() { }

  values ='';

  onKey(event: any){
    this.values += event.target.value + ' | ';
  }
  ngOnInit() {
  }

}
