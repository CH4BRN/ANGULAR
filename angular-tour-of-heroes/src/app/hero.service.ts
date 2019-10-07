import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of, from} from 'rxjs';
// Service-in-service secnario : Message-s into hero-s into hero-c
import { MessageService } from './message.service';

// Injectable marks the class to participate in the dependency injection system. 
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private messsageService: MessageService
  ) { }

  /**First getHeroes method
  
  getHeroes(): Hero[]{{
    return HEROES;
  }}

  */
 
  /**
   *  Get the heroes.
   */
  //  of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes
  getHeroes(): Observable<Hero[]>{
    this.messsageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  /**
   * Get hero by ID.
   * @param id 
   */
  //  Has an asynchronous signature. It returns a mock hero as an Observable, using the RxJS of() function.
  getHero(id: number): Observable<Hero>{
    // TODO: send the message _after_ fetching the hero
    //   backticks ( ` ) define a JavaScript template literal for embedding the id.
    this.messsageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id))
  }
}
