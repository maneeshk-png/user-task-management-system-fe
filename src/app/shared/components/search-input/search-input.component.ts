import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {

  @Input() placeholder:string ='Search...';
  @Input() debounceTime:number=300;
  @Input() value:string='';

  @Output() search =new EventEmitter<string>();

  private timeout:any;

  onInputChange(event:Event){
    const val=(event.target as HTMLInputElement).value;
    this.value=val;

    clearTimeout(this.timeout);
    this.timeout=setTimeout(()=>{
      this.search.emit(this.value);
    },this.debounceTime);
  }

}
