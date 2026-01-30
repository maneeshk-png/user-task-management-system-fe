import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output, output } from "@angular/core";

@Component({
    selector:'app-summary-card',
    standalone:true,
    imports:[CommonModule],
    templateUrl:'./summary-card.component.html',
    styleUrls:['./summary-card.component.css']
})

export class SummaryCardComponent {

    
    @Input() title:string='';
    @Input() value :number=0;
    @Input() description:string='';

    @Output() cardClick = new EventEmitter<void>(); 

    onClick(event:Event){
        event.stopPropagation();// prevents parent click 
        this.cardClick.emit();
    }

      
}