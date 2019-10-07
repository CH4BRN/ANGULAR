import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

// Injectable marks the class to participate in the dependency injection system. 
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }
}
