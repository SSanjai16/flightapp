import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTheFlightComponent } from './edit-the-flight.component';

describe('EditTheFlightComponent', () => {
  let component: EditTheFlightComponent;
  let fixture: ComponentFixture<EditTheFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTheFlightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTheFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
