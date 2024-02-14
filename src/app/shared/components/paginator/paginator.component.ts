import { Component, Input } from '@angular/core';
import { HomeService } from '../../../services/home/home.service';
import { Pagination } from '../../../core/models/pagination.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {

  @Input() data: Pagination| undefined;

  constructor(private service: HomeService) {}

  ngOnInit() {
    //setTimeout(()=>{console.log(this.data);},1000);
  }



  previousPage(){
   console.log("previous page");
  }

  nextPage(){
    console.log("next page");
   }

   getPage(page:string){
    console.log("get page",page);
   }

   parseNumber(page:string){
    return Number(page);
   }


}
