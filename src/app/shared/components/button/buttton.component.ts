import { CommonModule } from "@angular/common";
import { Component,Input,Output,EventEmitter } from "@angular/core";

@Component({
    selector:'app-button',
    templateUrl:'./button.component.html',
    styleUrls:['./button.component.css'],
    imports:[CommonModule],
    standalone:true,

})

export class ButtonComponent {
    @Input() label:string ='click'; //showinf label
    @Input() type:string='button';  //showing type
    @Input() variant:string='primary';  //color
    @Input() disabled:boolean=false; //
    @Input() routerLink:string | null = null;



    @Output() btnClick=new EventEmitter<void>();


    onClick(){
        this.btnClick.emit();
    }
}