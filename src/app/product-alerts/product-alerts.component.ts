import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
//   indicates that the following class is a component. also exports the class
@Component({
  //  identifies the component.
  selector: 'app-product-alerts',
  //  reference the HTML and CSS files
  templateUrl: './product-alerts.component.html',
  styleUrls: ['./product-alerts.component.css']
})
export class ProductAlertsComponent implements OnInit {

  //  indicates that the property value passes in from the 
  //  component's parent
   @Input() product;
   // allows the product alert component to emit an event 
   // when the value of the notify property changes.
  @Output() notify = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  

}