import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero'
import { HEROES } from '../mock-heroes';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  /* My first hero :') 
  hero: Hero = {
    id: 1,
    name: 'Windstorm'  
  };
  */

  // property to expose the HEROES array for binding.
  heroes = HEROES;

  constructor() { }

  ngOnInit() {
      }

}
