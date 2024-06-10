import { Component, Input, viewChild } from '@angular/core';
import { TextBlock } from './contracts';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-sentence-editor',
  standalone: true,
  imports: [NgFor],
  templateUrl: './sentence-editor.component.html',
  styleUrl: './sentence-editor.component.scss'
})
export class SentenceEditorComponent {

  size = 2;

  @Input() textBlocks!: TextBlock[];

  onblur() {
    console.log('onblur', window.getSelection());
  }

  onInput(e: any) {
    console.log(e);
    this.size = e.target.value.length;
  }
}
