import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  // links are styled as colored blocks by the dashboard.component.css.
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //  defines a heroes array property.
  heroes: Hero[] = [];

  //  expects Angular to inject the HeroService into a private heroService property.
  constructor(
    private heroService: HeroService
  ) { }

  //  lifecycle hook calls getHeroes()
  ngOnInit() {
    this.getHeroes();
  }

  /**
   * returns the sliced list of heroes at positions 1 and 5, returning only four of the Top Heroes (2nd, 3rd, 4th, and 5th).
   */
  getHeroes(): void{
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

}
