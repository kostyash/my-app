import { Component } from '@angular/core';
import { OpenSentenceComponent } from "./open-sentence/open-sentence.component";
import { SentenceEditorComponent } from './sentence-editor/sentence-editor.component';
import { SentenceFormComponent } from './sentence-form/sentence-form.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [SentenceFormComponent]
})
export class AppComponent {
  title = 'my-app';
}
