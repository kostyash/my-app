import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceholdersListComponent } from './placeholders-list.component';

describe('PlaceholdersListComponent', () => {
  let component: PlaceholdersListComponent;
  let fixture: ComponentFixture<PlaceholdersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceholdersListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceholdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
