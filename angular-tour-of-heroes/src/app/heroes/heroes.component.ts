import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero'
// Import the mocked heroes
// import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';

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
  // With the mocked heroes ...
  //  heroes = HEROES;

  // With the service ...
  heroes: Hero[];

  // property to get the selected hero.
  selectedHero: Hero;

  //  parameter simultaneously defines a private heroService property and identifies it as a HeroService injection site.
  constructor(
    private heroService: HeroService
  ) { }

  /**
   * Angular lifecycle hook
   */
  ngOnInit() {
    this.getHeroes();
      }

  /** 
   * Called when a hero is selected. 
   * */
  onSelect(hero: Hero): void {
    this.selectedHero = hero
  }

  /** 
   * Get the heroes from the service 
   * */
    // First getHeroes() method.
    // Assigns an array of heroes to the component's heroes property
    /*  
      getHeroes(): void{
        this.heroes = this.heroService.getHeroes();
      }
    */

   // With Observable getHeroes() method. (= Asynchronous)
   // waits for the Observable to emit the array of heroes—which could 
   // happen now or several minutes from now. The subscribe() method passes
   // the emitted array to the callback, which sets the component's heroes property.
  getHeroes(): void{
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes)
  }
}
