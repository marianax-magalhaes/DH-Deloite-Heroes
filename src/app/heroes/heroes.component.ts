import { Component, OnInit } from '@angular/core';
import { Hero } from '../Hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
    
  selectedHero?: Hero;
  heroes: Hero[]=[];
  
  constructor(private heroService: HeroService, private messageService: MessageService) { }
  
  ngOnInit() {
    this.getHeroes();
  }
  
  getHeroes(): void {
   this.heroService.getHeroes()
    .subscribe(x => this.heroes = x)
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  onSelected(hero: Hero): void{
    this.messageService.add(`You selected hero with id of ${hero.id} and name ${hero.name}`)
    console.log(hero);
    this.selectedHero = hero;
  }
}