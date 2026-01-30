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


    @Input() label:string='Filter';
    @Input() options:FilterOption[]=[];
    
    selectedValue:string='';


    @Output() selectionChange=new EventEmitter<string>();

    onSelect(value:string){
        this.selectionChange.emit(value);
    }
}