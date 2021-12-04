import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditflightsComponent } from './editflights.component';

describe('EditflightsComponent', () => {
  let component: EditflightsComponent;
  let fixture: ComponentFixture<EditflightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditflightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditflightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
