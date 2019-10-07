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
 
  //  of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes
  getHeroes(): Observable<Hero[]>{
    this.messsageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }
}
