import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, Output, QueryList, SimpleChanges, ViewChildren, viewChild } from '@angular/core';
import { TextBlock, TextInput } from './contracts';
import { NgFor, NgIf } from '@angular/common';
import { InputWidthDirective } from '../input-width.directive';


@Component({
  selector: 'app-sentence-editor',
  standalone: true,
  imports: [NgFor, InputWidthDirective, NgIf],
  templateUrl: './sentence-editor.component.html',
  styleUrl: './sentence-editor.component.scss'
})
export class SentenceEditorComponent implements AfterViewInit, OnChanges {


  currentInputIndex = 0;


  @Input() textBlocks!: TextBlock[];
  @Output() currentInputChange = new EventEmitter<TextInput>();

  @ViewChildren('input') inputs!: QueryList<ElementRef>;

  trackByIndex(index: number, textBlock: TextBlock) {
    return index;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['textBlocks'].firstChange)
      this.setFocus();
  }


  ngAfterViewInit(): void {
    this.setFocus();
  }


  setCurrent(currentInputIndex: number, input: HTMLInputElement) {
    this.currentInputIndex = currentInputIndex;
    this.currentInputChange.emit({
      cursorPosition: input.selectionStart ?? 0,
      value: input.value,
      index: currentInputIndex
    });
    console.log(input.selectionStart, input.value, currentInputIndex);
  }

  private setFocus() {
    const focusedElementIndex = this.textBlocks.findIndex(block => block.hasFocus);
    const focusedElement = focusedElementIndex === -1 ? this.inputs.first.nativeElement : this.inputs.filter((input, index) => index === focusedElementIndex)[0].nativeElement;
    focusedElement.focus();    
    setTimeout(() => focusedElement.setSelectionRange(0,0));
  }

}
