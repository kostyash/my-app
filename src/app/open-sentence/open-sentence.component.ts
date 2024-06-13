import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SentenceEditorComponent } from '../sentence-editor/SentenceEditorComponent';
import { TextBlock, TextInput } from '../sentence-editor/contracts';
import { PlaceholdersListComponent } from '../placeholders-list/placeholders-list.component';

@Component({
  selector: 'app-open-sentence',
  standalone: true,
  templateUrl: './open-sentence.component.html',
  styleUrl: './open-sentence.component.scss',
  imports: [PlaceholdersListComponent, SentenceEditorComponent]
})
export class OpenSentenceComponent implements OnChanges {


  textBlocks: TextBlock[] = [{
    text: '',
    placeholder: null
  }]

  @Input() placeholders: string[] = [];


  @Input() initialText = '';


  currentInput: TextInput = {
    cursorPosition: 0,
    index: this.textBlocks?.length - 1,
    value: ''
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialText']) {
      if (!this.initialText) {
        this.textBlocks = [{
          text: '',
          placeholder: null
        }]
      } else {
        this.buildTextBlocks();
      }
    }
    this.currentInput = {
      cursorPosition: this.textBlocks[this.textBlocks.length - 1].text.length,
      index: this.textBlocks.length - 1,
      value: this.textBlocks[this.textBlocks.length - 1].text
    };
  }

  onPlaceholderSelected(placeholder: string) {

    const leftText = this.currentInput.value.slice(0, this.currentInput.cursorPosition) || '';
    const rightText = this.currentInput.value.slice(this.currentInput.cursorPosition, this.currentInput.value.length) || '';

    this.textBlocks.forEach(block => block.hasFocus = false);

    const newTextBlock: TextBlock = {
      text: leftText,
      placeholder: placeholder      
    }

    this.textBlocks[this.currentInput.index].text = rightText;
    this.textBlocks[this.currentInput.index].hasFocus = true;    

    this.textBlocks = [...this.textBlocks.slice(0, this.currentInput.index), newTextBlock, ... this.textBlocks.slice(this.currentInput.index)];
    console.log(this.textBlocks);


  }

  setCurrentInput(currentInput: TextInput) {
    this.currentInput = currentInput;
  }

  private buildTextBlocks() {
    this.textBlocks = [];
    const textBlock: TextBlock = {
      placeholder: '',
      text: ''
    }
    let currentText = '';
    let currentPlaceholder = '';
    let buildingText = true;
    Array.from(this.initialText).forEach((char, ind) => {
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
        currentText = '';
        currentPlaceholder = '';
      }
    });
    this.textBlocks.push({
      text: currentText + currentPlaceholder,
      placeholder: null,
      hasFocus: true
    })
    console.log('textBlocks', this.textBlocks);
  }

}
