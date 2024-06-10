import { Component, Input } from '@angular/core';
import { BadgeComponent } from "../badge/badge.component";
import { SentenceEditorComponent } from '../sentence-editor/SentenceEditorComponent';
import { TextBlock } from '../sentence-editor/contracts';

@Component({
  selector: 'app-open-sentence',
  standalone: true,
  templateUrl: './open-sentence.component.html',
  styleUrl: './open-sentence.component.scss',
  imports: [BadgeComponent, SentenceEditorComponent]
})
export class OpenSentenceComponent {

  @Input() initialText!: string;

  textBlocks: TextBlock[] = [];

  onBadgeSelect(placeholder: string) {
   this.textBlocks.push({text: '', placeholder: placeholder});
  }

}
