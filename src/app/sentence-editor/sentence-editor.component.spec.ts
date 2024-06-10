import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentenceEditorComponent } from './SentenceEditorComponent';

describe('SentenceEditorComponent', () => {
  let component: SentenceEditorComponent;
  let fixture: ComponentFixture<SentenceEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SentenceEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentenceEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
