import { Component } from '@angular/core';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { HomeService } from '../../services/home/home.service';
import { Card } from '../../core/models/card.model';
import { Pagination } from '../../core/models/pagination.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../../services/general/utils.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    animations: [],
    imports: [PaginatorComponent]
})
export class HomeComponent  {
  cards: Card[] = [];
  paginationData: Pagination| undefined;
  pageNumber:number= 1;

  constructor(private service: HomeService,
             private router: Router,
             private activedRoute: ActivatedRoute,
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
    let pageNumber= this.utils.parseToInt(this.activedRoute.snapshot.paramMap.get('page')??'');
    if (pageNumber) this.pageNumber = pageNumber;
  }


  onPageChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.getData();
  }

  onCardClick(id:number){
    this.router.navigate(['/c',id]);
  }

}
