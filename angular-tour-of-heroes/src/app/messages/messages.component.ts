import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { LogService } from 'app/log.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // The messageService property must be public because you're going to bind to it in the template.
  constructor(
    public messageService:  MessageService,
    private logService:LogService
  ) { }


  private TAG:string = "MessagesComponent";

  ngOnInit() {
    this.logService.addLog(this.TAG, "ngOnInit");
  }

}
