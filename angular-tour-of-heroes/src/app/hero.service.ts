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
    private messageService: MessageService,
    private http: HttpClient
    
  ) { }

  private heroesUrl = 'api/heroes'; // URL to the web api

  /** Log a HeroService message with the MessageService */
  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
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
   * 
   * tap() operator looks at the observable values, does something with those values, and passes them along. 
   * The tap() call back doesn't touch the values themselves.
   * 
   * The pipe takes in data as input and transforms it to the desired output.
   */
  getHeroes (): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }
      
   /**
   * Get hero by ID 1st 
   * @param id 
   */
  /*
  //  Has an asynchronous signature. It returns a mock hero as an Observable, using the RxJS of() function.
  getHero(id: number): Observable<Hero>{
    // TODO: send the message _after_ fetching the hero
    //   backticks ( ` ) define a JavaScript template literal for embedding the id.
    this.log(`fetched hero id=${id}`);    
    return of(HEROES.find(hero => hero.id === id))
  }
  */

  /** GET hero by id. Will 404 if id not found 
   * - getHero() constructs a request URL with the desired hero's id. The server should respond with a single hero rather than an array of heroes.
   * returns an Observable<Hero> ("an observable of Hero objects") rather than an observable of hero arrays .
  */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** PUT: Update the hero on the server. */
  updateHero (hero: Hero):Observable<any>{
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST : Create an hero on the server
   *  expects the server to generate an id for the new hero, which it returns in the Observable<Hero> to the caller.
   */
  addHero (hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE : delete the hero from the server
   * 
   */
  deleteHero(hero: Hero | number): Observable<Hero>{
    // If hero is a number, get the number, else if hero is an object, get its ID
    const id = typeof hero === 'number' ? hero : hero.id;
    // Gets the server url concatenated withe id
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleted hero'))
      );
  }

  /**GET heroes whos name contains search term
   * 
   */
  searchHeroes(term: string): Observable<Hero[]>{
    if(!term.trim()){
      // If there is no search term, return empty hero array
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    )

  }

  

  /**
   * handle errors.
   * @param operation 
   * @param result 
   */
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
   * The heroes web API expects a special header in HTTP save requests. That header is that httpOptions constant 
   */
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

}
