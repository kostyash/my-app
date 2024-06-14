import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PlaceholdersListComponent } from '../placeholders-list/placeholders-list.component';
import { SentenceEditorComponent } from '../sentence-editor/SentenceEditorComponent';
import { TextBlock, TextInput } from '../sentence-editor/contracts';

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
    this.addPlaceholder(placeholder);
  }

  setCurrentInput(currentInput: TextInput) {
    this.currentInput = currentInput;
    
    if (currentInput.keyPressed === 'Delete' && currentInput.cursorPosition === currentInput.value.length && currentInput.index < this.textBlocks?.length - 1) {
      this.removePlaceholder(currentInput.index)
    }
    if (currentInput.keyPressed === 'BackSpace' && currentInput.index > 0) {
      this.removePlaceholder(currentInput.index - 1)
    }
  }

  // Private Methods

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

  private addPlaceholder(placeholder: string) {
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

    this.currentInput = {
      cursorPosition: 0,
      index: this.currentInput.index + 1,
      value: rightText
    };
  }

  private removePlaceholder(index: number) {
    this.textBlocks.forEach(block => block.hasFocus = false);
    this.textBlocks[index + 1].text = this.textBlocks[index].text + this.textBlocks[index + 1].text;
    this.textBlocks[index + 1].hasFocus = true;
    this.textBlocks = [...this.textBlocks.slice(0, index), ... this.textBlocks.slice(index + 1)];
  }
}
