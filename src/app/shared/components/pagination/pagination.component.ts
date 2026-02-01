import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone:true,
  imports: [ButtonComponent,CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
@Input() totalItems:number=0;
@Input() pageSize:number=10;
@Input() currentPage:number=1;

@Output() pageChange = new EventEmitter<number>();

pages: (number | string)[] = [];
totalPages: number = 0;

ngOnChanges() {
  this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  this.generatePages();
}

private generatePages() {
 const pages: (number | string)[] = [];

  // If pages are small, show all
  if (this.totalPages <= 5) {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    return;
  }

  let start = this.currentPage - 1;
  let end = this.currentPage + 1;

  // Fix lower bound
  if (start < 1) {
    start = 1;
    end = 3;
  }

  // Fix upper bound
  if (end > this.totalPages) {
    end = this.totalPages;
    start = this.totalPages - 2;
  }

  // First page
  if (start > 1) {
    pages.push(1);
    // if (start > 2) {
    //   pages.push('...');
    // }
  }

  // Middle pages
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // Last page
  if (end < this.totalPages) {
    if (end < this.totalPages - 1) {
      pages.push('...');
    }
    pages.push(this.totalPages);
  }

  this.pages = pages;
}


changePage(page: number | string) {
  if (typeof page === 'number' && page !== this.currentPage) {
    this.pageChange.emit(page); // now page is guaranteed to be number
  }
}

next() {
  if (this.currentPage < this.totalPages) {
    this.pageChange.emit(this.currentPage + 1);
  }
}

prev() {
  if (this.currentPage > 1) {
    this.pageChange.emit(this.currentPage - 1);
  }
}
}