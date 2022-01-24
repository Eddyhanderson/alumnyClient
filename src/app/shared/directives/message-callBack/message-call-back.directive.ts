import { Directive, ElementRef, HostListener, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appMessageCallBack]'
})
export class MessageCallBackDirective implements OnInit{

  @Input('appearance') appearance:string;
  @Input('mode') mode:string;
  @Input("appMessageCallBack") type:string;  

  private messageFallBack:string;

  constructor(private el:ElementRef) { }

  ngOnInit(): void {
    this.setMessageFallBack();
  }

  private setMessageFallBack(){
    
    switch (this.type) {
      case 'cancelingRequest':
        this.messageFallBack = "pedido cancelado";
        break;
      case 'makingRequest' :
        this.messageFallBack = "pedido enviado";
        break;
      case 'acceptingRequest' :
          this.messageFallBack = "pedido aceite"
      default:
        break;
    }
  }

  @HostListener('click')
  private sendMessageFallBack(){
    switch (this.mode) {
      case 'all':
        (this.el.nativeElement as HTMLElement).parentElement.innerHTML = `<span class="${this.appearance}"> ${this.messageFallBack}</span>`    
        break;  
      default:
        (this.el.nativeElement as HTMLElement).innerHTML = `<span class="${this.appearance}"> ${this.messageFallBack}</span>`
        break;
    }
  }
}
