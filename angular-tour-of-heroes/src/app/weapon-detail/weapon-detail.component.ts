import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Weapon } from 'app/weapon';
import { ActivatedRoute } from '@angular/router';
import { WeaponsService } from 'app/weapons.service';
import { LogService } from 'app/log.service';

@Component({
  selector: 'app-weapon-detail',
  templateUrl: './weapon-detail.component.html',
  styleUrls: ['./weapon-detail.component.css']
})
export class WeaponDetailComponent implements OnInit {
  @Input() weapon : Weapon;
  constructor(
    private route: ActivatedRoute,
    private weaponService: WeaponsService,
    private logService: LogService
  ) { }

private TAG:string = "WeaponDetailComponent";

  ngOnInit():void {
    this.logService.addLog(this.TAG,"ngOnInit" );
    this.getWeapon()
  }

  getWeapon():void{
    this.logService.addLog(this.TAG,"getWeapon");
    const id = +this.route.snapshot.paramMap.get('id');
    this.weaponService.getWeapon(id)
    .subscribe(weapon => this.weapon = weapon)
  }

  ngOnChanges(changes: SimpleChanges){
    this.logService.addLog(this.TAG,"ngOnChanges");
    for(let propName in changes){
      let chng = changes[propName];
      let cur = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      
    }
  }

}
