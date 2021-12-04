import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddflightsComponent } from './addflights.component';

describe('AddflightsComponent', () => {
  let component: AddflightsComponent;
  let fixture: ComponentFixture<AddflightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddflightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddflightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
