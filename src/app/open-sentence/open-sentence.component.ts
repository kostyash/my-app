import { Component, Input, OnChanges, SimpleChanges, forwardRef } from '@angular/core';
import { PlaceholdersListComponent } from '../placeholders-list/placeholders-list.component';
import { SentenceEditorComponent } from '../sentence-editor/SentenceEditorComponent';
import { TextBlock, TextInput } from '../sentence-editor/contracts';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Block } from '@angular/compiler';

@Component({
  selector: 'app-open-sentence',
  standalone: true,
  templateUrl: './open-sentence.component.html',
  styleUrl: './open-sentence.component.scss',
  imports: [PlaceholdersListComponent, SentenceEditorComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OpenSentenceComponent),
      multi: true
    }
  ]
})
export class OpenSentenceComponent implements OnChanges, ControlValueAccessor {

  // region control value accessor

  onChange: any = () => { };
  onTouch: any = () => { };

  writeValue(initialText: string): void {
    this.buildTextBlocks(initialText || '');
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {

  }

  // endregion

  textBlocks: TextBlock[] = [{
    text: '',
    placeholder: null
  }]

  @Input() placeholders: string[] = [];


  @Input() initialText = '';


  finalPlaceholders = this.placeholders;


  currentInput: TextInput = {
    caretPosition: 0,
    index: this.textBlocks?.length - 1,
    value: ''
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialText']) {
      this.buildTextBlocks(this.initialText || '');
    }
    this.currentInput = {
      caretPosition: this.textBlocks[this.textBlocks.length - 1].text.length,
      index: this.textBlocks.length - 1,
      value: this.textBlocks[this.textBlocks.length - 1].text
    };
  }

  onPlaceholderSelected(placeholder: string) {
    this.addPlaceholder(placeholder);
    this.onChange(this.convertTextBlocksToString());
  }

  onKeyDown(key: string) {
    if (key === 'Delete' && this.currentInput.caretPosition === this.currentInput.value.length && this.currentInput.index < this.textBlocks?.length - 1) {
      this.removePlaceholderByDelete(this.currentInput.index)
    }
    if (key === 'Backspace' && this.currentInput.caretPosition === 0 && this.currentInput.index > 0) {
      this.removePlaceholderByBackspace(this.currentInput.index)
    }
  }

  onKeyUp(){
    this.onChange(this.convertTextBlocksToString());
  }

  setCurrentInput(currentInput: TextInput) {
    this.currentInput = currentInput;
    this.textBlocks[this.currentInput.index].text = this.currentInput.value;    
  }

  // Private Methods

  private buildTextBlocks(initialText: string = "") {
    const placeholders = [...this.placeholders];
    this.textBlocks = [];
    const textBlock: TextBlock = {
      placeholder: '',
      text: ''
    }
    let currentText = '';
    let currentPlaceholder = '';
    let buildingText = true;
    Array.from(initialText).forEach((char, ind) => {
      if (char !== '[' && buildingText) {
        currentText += char;
        return;
      }
      if (char === '[' && buildingText) {
        buildingText = false;
        return;
      }
      if (char !== ']' && !buildingText) {
        currentPlaceholder += char;
        return;
      }
      if (char === ']' && !buildingText) {
        buildingText = true;
        this.textBlocks.push({
          text: currentText,
          placeholder: currentPlaceholder
        })
        placeholders.push(currentPlaceholder);
        currentText = '';
        currentPlaceholder = '';
      }
    });
    this.textBlocks.push({
      text: currentText + currentPlaceholder,
      placeholder: null
    })
    this.finalPlaceholders = placeholders;
    console.log('textBlocks', this.textBlocks);
  }

  private addPlaceholder(placeholder: string) {
    const leftText = this.currentInput.value.slice(0, this.currentInput.caretPosition) || '';
    const rightText = this.currentInput.value.slice(this.currentInput.caretPosition, this.currentInput.value.length) || '';

    this.textBlocks.forEach(block => block.hasFocus = false);

    const newTextBlock: TextBlock = {
      text: leftText,
      placeholder: placeholder
    }

    this.textBlocks[this.currentInput.index].text = rightText;
    this.textBlocks[this.currentInput.index].hasFocus = true;

    this.textBlocks = [...this.textBlocks.slice(0, this.currentInput.index), newTextBlock, ... this.textBlocks.slice(this.currentInput.index)];

    this.currentInput = {
      caretPosition: 0,
      index: this.currentInput.index + 1,
      value: rightText
    };
  }

  private removePlaceholderByDelete(index: number) {
    this.textBlocks.forEach(block => block.hasFocus = false);
    this.textBlocks[index + 1].text = this.textBlocks[index].text + this.textBlocks[index + 1].text;
    this.textBlocks[index + 1].hasFocus = true;
    this.textBlocks[index + 1].caretPosition = this.currentInput.value.length;
    this.textBlocks = [...this.textBlocks.slice(0, index), ... this.textBlocks.slice(index + 1)];
  }

  private removePlaceholderByBackspace(index: number) {
    this.textBlocks.forEach(block => block.hasFocus = false);
    this.textBlocks[index - 1].hasFocus = true;
    this.textBlocks[index - 1].caretPosition = this.textBlocks[index - 1].text.length;
    this.textBlocks[index - 1].text = this.textBlocks[index - 1].text + this.textBlocks[index].text;
    this.textBlocks = [...this.textBlocks.slice(0, index), ... this.textBlocks.slice(index + 1)];
  }

  private convertTextBlocksToString(): string {
    let sentence = '';

    this.textBlocks.forEach(block => {
      sentence += block.text;
      if (block.placeholder) {
        sentence += '[' + block.placeholder + ']';
      }
    })
    return sentence;
  }

}
