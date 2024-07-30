import { Component } from '@angular/core';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { HomeService } from '../../services/home/home.service';
import { Card } from '../../core/models/card.model';
import { Pagination } from '../../core/models/pagination.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../../services/general/utils.service';
import { SpinnerComponent } from "../../shared/components/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';


@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, PaginatorComponent, SpinnerComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    animations: [
      trigger('smoothChange', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('400ms ease-in', style({ opacity: 1 }))
        ]),
      ])
    ]
})
export class HomeComponent  {
  cards: Card[] = [];
  paginationData: Pagination| undefined;
  pageNumber:number= 1;
  inRequest: boolean = false;

  constructor(private service: HomeService,
             private router: Router,
             private activedRoute: ActivatedRoute,
             private utils: UtilsService,
             private route: ActivatedRoute) {}


  ngOnInit() {
    this.getParams();
    this.getData();
  }

  getParams(){
    let pageNumber= this.utils.parseToInt(this.activedRoute.snapshot.paramMap.get('page')??'');
    if (pageNumber) this.pageNumber = pageNumber;
  }

  async getData(){
    this.inRequest = true;
    try {
      const [cards, paginationData] = await this.service.getHomeData({page:this.pageNumber});
      this.inRequest = false;
      this.cards = cards;
      this.paginationData = paginationData;
      this.pageNumber = this.paginationData.actualPage;
      this.router.navigate(['/p', this.pageNumber], { relativeTo: this.route });
    } catch (error) {
      this.inRequest = false;
      console.error("Error fetching data in Home Component: ",error);}
  }


  onPageChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.getData();
  }

  onCardClick(id:number){
    this.router.navigate(['/c',id]);
  }

}
