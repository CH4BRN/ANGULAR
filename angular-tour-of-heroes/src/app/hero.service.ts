import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of, from} from 'rxjs';
// Service-in-service secnario : Message-s into hero-s into hero-c
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Injectable marks the class to participate in the dependency injection system. 
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private messsageService: MessageService,
    private http: HttpClient
    
  ) { }

  private heroesUrl = 'api/heroes'; // URL to the web api

  /** Log a HeroService message with the MessageService */
  private log(message: string){
    this.messsageService.add(`HeroService: ${message}`);
  }

  /**First getHeroes method :
    
    getHeroes(): Hero[]{
      return HEROES;
    }
    
  */
 
  /** Second getHeroes method :
    - of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes
    - return an array of mock heroes as an Observable.

    getHeroes(): Observable<Hero[]>{
      this.log('fetched heroes');
      return of(HEROES);
    }

  */

  /** Third getHeroes method :
   * - GET heroes from the server. Uses the HttpClient.
   */
  getHeroes (): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    
  }



  /**
   * Get hero by ID.
   * @param id 
   */
  //  Has an asynchronous signature. It returns a mock hero as an Observable, using the RxJS of() function.
  getHero(id: number): Observable<Hero>{
    // TODO: send the message _after_ fetching the hero
    //   backticks ( ` ) define a JavaScript template literal for embedding the id.
    this.log(`fetched hero id=${id}`);    
    return of(HEROES.find(hero => hero.id === id))
  }
}
