import { Component } from '@angular/core';
import { SentenceFormComponent } from './sentence-form/sentence-form.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [SentenceFormComponent, JsonPipe]
})
export class AppComponent {

  sentenceFormValue = ''

  onSentenceSubmit(value: string) {
    this.sentenceFormValue = value;
  }
}
