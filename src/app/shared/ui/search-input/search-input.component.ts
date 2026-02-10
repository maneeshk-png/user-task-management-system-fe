import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent {

  @Input() placeholder:string ='Search...'; // Placeholder text
  @Input() debounceTime:number=300; // milliseconds
  @Input() value:string=''; // Current input value

  @Output() search =new EventEmitter<string>(); // Emits search input changes

  private timeout:any; // Timer for debounce

  // Handle input changes with debounce
  onInputChange(event:Event){
    const val=(event.target as HTMLInputElement).value;
    this.value=val;

    // Reset debounce timer
    clearTimeout(this.timeout);
    this.timeout=setTimeout(()=>{
      this.search.emit(this.value);
    },this.debounceTime);
  }

}
