import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[inputWidth]',
  standalone: true
})
export class InputWidthDirective {

  constructor(private el: ElementRef) {    
  }

  @HostListener('input', ['$event.target']) onInput(input: HTMLInputElement) {
    this.setWidth(input.value.length);
  }

  private setWidth(length: number) {
    this.el.nativeElement.style.width = 7*length + 'px';
  }

}
