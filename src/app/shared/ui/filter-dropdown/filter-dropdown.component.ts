import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";

export interface FilterOption {
    label:string;
    value:string;
}

@Component({
    selector:'app-filter-dropdown',
    standalone:true,
    imports:[FormsModule,CommonModule],
    templateUrl:'./filter-dropdown.component.html',
    styleUrls:['./filter-dropdown.component.css']
})

export class FilterDropdownComponent {


    @Input() label:string=''; // Label for the dropdown
    @Input() options:FilterOption[]=[];// Options for the dropdown
    
    @Input() selectedValue:string='all'; // Currently selected value


    @Output() selectionChange=new EventEmitter<string>(); // Emits when selection changes

    // Handle selection change
    onSelect(value:string){
        this.selectionChange.emit(value);
    }
}