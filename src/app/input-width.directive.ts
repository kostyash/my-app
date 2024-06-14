import { AfterViewChecked, Directive, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[inputWidth]',
  standalone: true
})
export class InputWidthDirective implements OnInit, AfterViewChecked, OnDestroy {

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }  

  private span!: HTMLSpanElement;

  ngOnInit(): void {
    this.span = this.renderer.createElement('span');
    this.renderer.setStyle(this.span, 'font-size', getComputedStyle(this.el.nativeElement).fontSize);
    this.renderer.setStyle(this.span, 'font-family', getComputedStyle(this.el.nativeElement).fontFamily);
    this.renderer.setStyle(this.span, 'font-weight', getComputedStyle(this.el.nativeElement).fontWeight);
    this.renderer.setStyle(this.span, 'white-space-collapse', 'preserve');
    this.renderer.addClass(this.span, 'pseudo')
    this.renderer.appendChild(this.el.nativeElement.parentNode, this.span);
  }

  ngAfterViewChecked(): void {
    this.span.innerHTML = this.el.nativeElement.value;
    this.setWidth();
  }

  ngOnDestroy(): void {
    this.span.parentNode?.removeChild(this.span);
  }

  private setWidth() {
    this.el.nativeElement.style.width = Math.max(7, this.span.offsetWidth) + 'px';
  }

}
