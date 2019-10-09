import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-parent',
  templateUrl: './hero-parent.component.html',
  styleUrls: ['./hero-parent.component.css']
})
export class HeroParentComponent implements OnInit {

  heroes:Observable<Array<any>>;

  constructor(private heroService : HeroService) { 


  }

  master = 'The Master';

  
  ngOnInit() {
    this.heroes = this.heroService.getHeroes();

  }

}
