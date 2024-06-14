import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appInputFocus]',
  standalone: true
})
export class InputFocusDirective implements OnChanges {

  @Input() appInputFocus: boolean | undefined;

  constructor(private el: ElementRef) {
  }  

  ngOnChanges(changes: SimpleChanges): void {
    this.setFocus();
  }

  private setFocus() {
    if(this.appInputFocus){
      this.el.nativeElement.focus();
      this.el.nativeElement.setSelectionRange(0, 0);  
    }    
  }
}
