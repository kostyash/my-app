import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appInputFocus]',
  standalone: true
})
export class InputFocusDirective implements OnChanges {

  @Input() appInputFocus: boolean | undefined;
  @Input() caretPosition = 0;


  constructor(private el: ElementRef) {
  }  

  ngOnChanges(changes: SimpleChanges): void {
    this.setFocus();
  }

  private setFocus() {
    if(this.appInputFocus){
      this.el.nativeElement.focus();
      this.el.nativeElement.setSelectionRange(this.caretPosition, this.caretPosition);  
    }    
  }
}
