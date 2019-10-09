import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { LogService } from 'app/log.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  //  ActivatedRoute holds information about the route to this instance of the HeroDetailComponent. 
  //  This component is interested in the route's parameters extracted from the URL. The "id" parameter is the id of the hero to display.
  //  HeroService gets hero data from the remote server and this component will use it to get the hero-to-display.
  //  The location is an Angular service for interacting with the browser. 

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private logService: LogService
  ) { }

  private TAG:string = "HeroDetailComponent";

  ngOnInit(): void {
    this.getHero();
    this.logService.addLog(this.TAG, "ngOnInit");
  }

  /**
   * GetHero by heroService
   */
  getHero(): void{
    this.logService.addLog(this.TAG, "getHero");
    //  route.snapshot is a static image of the route information shortly after the component was created.
    //  paramMap is a dictionary of route parameter values extracted from the URL. The "id" key returns the id of the hero to fetch.
    //  The JavaScript (+) operator converts the string to a number, which is what a hero id should be.
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
    .subscribe(hero => this.hero = hero)
  }

  save(): void{
    this.logService.addLog(this.TAG, "save");
    this.heroService.updateHero(this.hero)
    .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.logService.addLog(this.TAG, "goBack");
    this.location.back();
  }
}
