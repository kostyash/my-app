import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OpenSentenceComponent } from '../open-sentence/open-sentence.component';

@Component({
  selector: 'app-sentence-form',
  standalone: true,
  imports: [ReactiveFormsModule, OpenSentenceComponent],
  templateUrl: './sentence-form.component.html',
  styleUrl: './sentence-form.component.scss'
})
export class SentenceFormComponent implements OnInit {

  sentenceForm!: FormGroup;

  @Output() onSentenceSubmit = new EventEmitter<string>();

  ngOnInit(): void {
    this.sentenceForm = new FormGroup({
      name: new FormControl(''),
      phone: new FormControl(''),
      openSentence: new FormControl('vsdf [bbcv]fg f dg[hfghfghf]')
    });    
  }

  onSubmit() {
    this.onSentenceSubmit.emit(this.sentenceForm.value);
  }

}
