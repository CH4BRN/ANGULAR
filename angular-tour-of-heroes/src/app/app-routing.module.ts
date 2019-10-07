import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';

/**
 A typical Angular Route has two properties:
    path: a string that matches the URL in the browser address bar.
    component: the component that the router should create when navigating to this route.

 */
const routes: Routes =[
  { 
    path: 'heroes', 
    component: HeroesComponent }
];

@NgModule({
  //  First imports RouterModule and Routes so the app can have routing functionality.
  //  Routes tell the Router which view to display when a user clicks a link or pastes a URL into the browser address bar.
  //  forRoot() method supplies the service providers and directives needed for routing, 
  //  and performs the initial navigation based on the current browser URL
  imports: [RouterModule.forRoot(routes)],
  //  Gives the Router somewhere to go once you configure the routes.
  exports: [RouterModule]
})
export class AppRoutingModule { }
