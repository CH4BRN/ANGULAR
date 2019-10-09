import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  logs : string[] = [];

  addLog(tag:string, log:string){
    this.logs.push(`${tag} -     ${log}`);
  }

  getLogs():string[]{

    if(!this.logs)
    {
      return;
    }
    return this.logs;
  }
  constructor() { }
}
