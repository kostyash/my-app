import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { InputFocusDirective } from '../input-focus.directive';
import { InputWidthDirective } from '../input-width.directive';
import { TextBlock, TextInput } from './contracts';


@Component({
  selector: 'app-sentence-editor',
  standalone: true,
  imports: [NgFor, InputWidthDirective, NgIf, InputFocusDirective],
  templateUrl: './sentence-editor.component.html',
  styleUrl: './sentence-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SentenceEditorComponent {


  currentInputIndex = 0;


  @Input() textBlocks!: TextBlock[];
  @Output() currentInputChange = new EventEmitter<TextInput>();
  @Output() keyDownChange = new EventEmitter<string>();
  @Output() keyUpChange = new EventEmitter<void>();

  trackByIndex(index: number, textBlock: TextBlock) {
    return index;
  }

  setCurrent(currentInputIndex: number, input: HTMLInputElement) {
    this.currentInputIndex = currentInputIndex;
    this.currentInputChange.emit({
      caretPosition: input.selectionStart ?? 0,
      value: input.value,
      index: currentInputIndex    
    });
  }

  onKeyDown(value: string) {
    this.keyDownChange.emit(value);
  }

  onKeyUp(value: string) {
    this.keyUpChange.emit();
  }
}
