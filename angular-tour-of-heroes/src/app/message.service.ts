import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  /**
   * Add a message to the messages.
   * @param message 
   */
  add(message: string){
    this.messages.push(message)
  }

  /**
   * Clear the messages list.
   */
  clear(){
    this.messages = []
  }

  constructor() { }
}
