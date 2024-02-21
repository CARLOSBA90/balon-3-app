import { Component } from '@angular/core';
import { trigger, transition, style, animate, query } from '@angular/animations';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { HomeService } from '../../services/home/home.service';
import { Card } from '../../core/models/card.model';
import { Pagination } from '../../core/models/pagination.model';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '../../services/general/utils.service';

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
    imports: [ PaginatorComponent]
})
export class HomeComponent {

  cards: Card[] = [];
  paginationData: Pagination| undefined;
  pageNumber:number= 1;

  constructor(private service: HomeService,
             private router: ActivatedRoute,
             private utils: UtilsService) {}


  ngOnInit() {
    this.getParams();
    this.getData();
  }


  async getData(){
    try {
      const [cards, paginationData] = await this.service.getHomeData({page:this.pageNumber});
      this.cards = cards;
      this.paginationData = paginationData;
      this.pageNumber = this.paginationData.actualPage;
    } catch (error) {
      console.error("Error fetching data in Home Component: ",error);}
  }

  getParams(){
    let pageNumber= this.utils.parseToInt(this.router.snapshot.paramMap.get('page')??'');
    if (pageNumber) this.pageNumber = pageNumber;
  }


  onPageChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.getData();
  }

}
