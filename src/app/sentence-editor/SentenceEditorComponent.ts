import { Component, Input, viewChild } from '@angular/core';
import { TextBlock } from './contracts';
import { NgFor } from '@angular/common';
import { InputWidthDirective } from '../input-width.directive';


@Component({
  selector: 'app-sentence-editor',
  standalone: true,
  imports: [NgFor, InputWidthDirective],
  templateUrl: './sentence-editor.component.html',
  styleUrl: './sentence-editor.component.scss'
})
export class SentenceEditorComponent {

 

  @Input() textBlocks!: TextBlock[];

  onblur() {
    console.log('onblur', window.getSelection());
  }
  
}
