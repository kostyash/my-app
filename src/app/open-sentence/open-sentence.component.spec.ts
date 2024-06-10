import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenSentenceComponent } from './open-sentence.component';

describe('OpenSentenceComponent', () => {
  let component: OpenSentenceComponent;
  let fixture: ComponentFixture<OpenSentenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenSentenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenSentenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
