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
getPageLinks(): any {
throw new Error('Method not implemented.');
}
currentPage: any;
totalPages: any;
goToPage(_t10: any) {
throw new Error('Method not implemented.');
}
isActivePage(_t10: any) {
return "class";
}

  @Input() data: Pagination| undefined;

  constructor(private service: HomeService) {}

  ngOnInit() {
    //test purposes
    setTimeout(()=>{console.log(this.data);},1000);
  }

}
