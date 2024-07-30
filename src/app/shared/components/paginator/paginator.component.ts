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
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

  @Input() data: Pagination | undefined;
  @Output() pageChanged = new EventEmitter<number>();

  constructor(private utils: UtilsService) {}

  ngOnInit() {}

  previousPage() {
    this.emitPageNumber((this.data?.actualPage ?? 0) - 1);
  }

  nextPage() {
    this.emitPageNumber((this.data?.actualPage ?? 0) + 1);
  }

  getPage(page: string) {
    const numberPage = this.utils.parseToInt(page);
    this.emitPageNumber(numberPage);
  }

  emitPageNumber(page: number) {
    this.pageChanged.emit(page);
  }

  parseNumber(page: string) {
    return Number(page);
  }

  getDisplayedPages(): number[] {
    if (!this.data) {
      return [];
    }
    const totalPages = this.data.pages;
    const currentPage = this.data.actualPage;
    const maxPagesToShow = 6;

    if (totalPages <= maxPagesToShow) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    const half = Math.floor(maxPagesToShow / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push(-1);
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push(-1);
      }
      pages.push(totalPages);
    }

    return pages;
  }
}
