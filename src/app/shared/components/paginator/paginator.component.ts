import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HomeService } from '../../../services/home/home.service';
import { Pagination } from '../../../core/models/pagination.model';
import { CommonModule } from '@angular/common';
import { UtilsService } from '../../../services/general/utils.service';


@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {

  @Input() data: Pagination| undefined;
  @Output() pageChanged = new EventEmitter<number>();

  constructor(private service: HomeService, public utils: UtilsService) {}

  ngOnInit() {
    //setTimeout(()=>{console.log(this.data);},1000);
  }

  previousPage(){
    this.emitPageNumber((this.data?.actualPage??0)-1);
  }

  nextPage(){
    this.emitPageNumber((this.data?.actualPage??0)+1);
   }

   getPage(page:string){
    const numberPage = this.utils.parseToInt(page);
    this.emitPageNumber(numberPage);
   }

   emitPageNumber(page:number){
    this.pageChanged.emit(page);
   }

   parseNumber(page:string){
    return Number(page);
   }


}
