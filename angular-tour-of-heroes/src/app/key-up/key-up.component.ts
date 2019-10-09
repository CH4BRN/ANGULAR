import { Component, OnInit } from '@angular/core';
import { LogService } from '../log.service';

@Component({
  selector: 'app-key-up',
  templateUrl: './key-up.component.html',
  styleUrls: ['./key-up.component.css']
})
export class KeyUpComponent implements OnInit {

  private TAG = "KeyUpComponent";

  constructor(private logService:LogService) { }

  values ='';

  value = '';

  blurValue ='';

  /**
   * 
   * @param event First onKey() method
   *
  onKey(event: any){
    this.logService.addLog(this.TAG, "onKey");
    this.values += event.target.value + ' | ';
  }
  */

  /**
   * Second onKey Method
   */
  onKey(event: KeyboardEvent){
    this.values += (event.target as HTMLInputElement).value + ' | ';
  }

  /**
   * 
   * @param value Third onKey method.
   */
  onKey2(value: string){
    this.values += value + ' | ';
  }


  onEnter(value: string){
    this.value = value;
  }

  update(value: string)
  {
    this.blurValue = value ;
  }
  ngOnInit() {
  }

}
