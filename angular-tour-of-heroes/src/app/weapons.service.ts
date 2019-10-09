import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Weapon } from './weapon';
import { catchError, map, tap } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class WeaponsService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }



  getWeapon(id: number): Observable<Weapon>{
    const url = `${this.weaponsUrl}/${id}`;
    return this.http.get<Weapon>(url).pipe(
      tap(_ => this.log(`fetched weapon id=${id}`)),
      catchError(this.handleError<Weapon>(`getWeapon id=${id}`))
    );

  }
    /** Log a HeroService message with the MessageService */
    private log(message: string){
      this.messageService.add(`HeroService: ${message}`);
    }

  private weaponsUrl = 'api/weapons';

  getWeapons (): Observable<Weapon[]>{
    return this.http.get<Weapon[]>(this.weaponsUrl)
  .pipe(
    tap(_ => this.log('fetched weapons')),
    catchError(this.handleError<Weapon[]>('getWeapons', []))
  );
 }

  addWeapon (weapon: Weapon): Observable<Weapon>{
    return this.http.post<Weapon>(this.weaponsUrl, weapon, this.httpOptions).pipe(
      tap((newWeapon: Weapon) => this.log(`added weapon w/ id=${newWeapon.id}`)),
      catchError(this.handleError<Weapon>('addWeapon'))
    )
  }


  deleteWeapon(weapon: Weapon | number): Observable<Weapon>{
    const id = typeof weapon === 'number' ? weapon : weapon.id;

    const url = `${this.weaponsUrl}/${id}`;

    return this.http.delete<Weapon>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted weapon id=${id}`)),
      catchError(this.handleError<Weapon>('deleted weapon'))
    );
  }
  /*
  
  /** DELETE : delete the hero from the server
   * 
   
  

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleted hero'))
      );
  }

  */

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
