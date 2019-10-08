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

  // property to get the selected hero. No longer used because of HeroesComponent class.
  // selectedHero: Hero;

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
   * Called when a hero is selected. No longer used because of HeroesComponent class.
   * */
  /*
  onSelect(hero: Hero): void {
    this.selectedHero = hero
  }
  */

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


  /**
   * 
   * @param name 
   * When the given name is non-blank, the handler creates a Hero-like object from the name and passes it to the services addHero() method.
   * When addHero() saves successfully, the subscribe() callback receives the new hero and pushes it into to the heroes list for display.
   */
  add(name: string): void {
    // Remove the white space
    name = name.trim();
    // If there is no name return empty string
    if(!name) { return;}
    // else add casted hero
    this.heroService.addHero({ name}as Hero)
    .subscribe(hero => {
      this.heroes.push(hero);
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
