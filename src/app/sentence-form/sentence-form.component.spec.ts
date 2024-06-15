import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentenceFormComponent } from './sentence-form.component';

describe('SentenceFormComponent', () => {
  let component: SentenceFormComponent;
  let fixture: ComponentFixture<SentenceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SentenceFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentenceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
