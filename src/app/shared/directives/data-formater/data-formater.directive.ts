import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appDataFormater]'
})
export class DataFormaterDirective implements OnInit {

  @Input('appDataFormater') date: string;
  private timeEstimated: string;
  private dateInternal:Date;


  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    
  }

     
}
