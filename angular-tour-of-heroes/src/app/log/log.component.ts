import { Component, OnInit } from '@angular/core';
import { LogService } from 'app/log.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  constructor(
    private logService:LogService
  ) {

    this.logService.addLog(this.TAG,"constructor");
   }

  private TAG:string = "LogComponent";

  logs:string[] = [];

  ngOnInit() {
    this.logService.addLog(this.TAG, "ngOnInit");
    this.logs = this.logService.getLogs();
  }

  ngOnDestroy(){
    this.logService.addLog(this.TAG, "ngOnDestroy");
    this.logs = this.logService.getLogs();
  }

}
