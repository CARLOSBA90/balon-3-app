import { Component } from '@angular/core';
import { trigger, transition, style, animate, query } from '@angular/animations';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { HomeService } from '../../services/home/home.service';
import { Card } from '../../core/models/card.model';
import { Pagination } from '../../core/models/pagination.model';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    animations: [
        trigger('listAnimations', [
            transition(':enter', [
                query('a.card-football', [
                    style({ opacity: 0, transform: 'translateY(-5px)' }),
                    animate('1s ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
                ])
            ])
        ])
    ],
    imports: [HeaderComponent, PaginatorComponent]
})
export class HomeComponent {

  cards: Card[] = [];
  paginationData: Pagination| undefined;

  constructor(private service: HomeService) {}


  ngOnInit() {
    this.getData();
  }


  async getData(){
    try {
      const [cards, paginationData] = await this.service.getHomeData();
      this.cards = cards;
      this.paginationData = paginationData;
    } catch (error) {
      console.error("Error fetching data in Home Component: ",error);}
  }


}
