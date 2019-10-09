import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Weapon } from 'app/weapon';
import { WeaponsService } from 'app/weapons.service';
import { LogService } from 'app/log.service';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent implements OnInit {

  constructor(
    private weaponsService : WeaponsService,
    private logService : LogService
  ) { }

  weapons: Weapon[];

private TAG:string = "WeaponsComponent";

  ngOnInit() {
    this.getWeapons();
    this.logService.addLog(this.TAG, "ngOnInit");
  }


  changeLog : string[];

  ngOnChanges(changes: SimpleChanges){
    this.logService.addLog(this.TAG, "ngOnChanges");
    
  }

  getWeapons(): void{
    this.logService.addLog(this.TAG, "getWeapons");
    this.weaponsService.getWeapons()
    .subscribe(weapons => this.weapons = weapons)
  }

  add(name: string, atq: number): void{
    this.logService.addLog(this.TAG, "add");
    name = name.trim();
    atq = atq.valueOf();

    if((!name)||(!atq)){
      return;
    }
    this.weaponsService.addWeapon({name, atq} as Weapon)
    .subscribe(weapon => {
      this.weapons.push(weapon);
    });
  }

  delete(weapon: Weapon): void{
    this.logService.addLog(this.TAG, "delete");
    this.weapons = this.weapons.filter(w => w !== weapon);
    this.weaponsService.deleteWeapon(weapon).subscribe();
  }
}
