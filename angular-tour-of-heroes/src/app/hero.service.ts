import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of, from} from 'rxjs';
// Service-in-service secnario : Message-s into hero-s into hero-c
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

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
   * 
   * You can swap between second and thrid method because both functions return an Observable<Hero[]> ("an observable of hero arrays")
   * HttpClient.get() returns the body of the response as an untyped JSON object by default. Applying the optional type specifier, <Hero[]> , gives you a typed result object.
   * 
   * catchError() operator intercepts an Observable that failed.
   */
  getHeroes (): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
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
