import { Component } from '@angular/core';
import { OpenSentenceComponent } from "./open-sentence/open-sentence.component";
import { SentenceEditorComponent } from './sentence-editor/SentenceEditorComponent';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [OpenSentenceComponent, SentenceEditorComponent]
})
export class AppComponent {
  title = 'my-app';
}
