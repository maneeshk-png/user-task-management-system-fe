import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/buttton.component';
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
  if (this.totalPages <= 5) {
    // Show all pages
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  } else {
    // Show first 3 + ellipsis + last
    this.pages = [1, 2, 3, '...', this.totalPages];
  }
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