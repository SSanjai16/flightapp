import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightofcityComponent } from './flightofcity.component';

describe('FlightofcityComponent', () => {
  let component: FlightofcityComponent;
  let fixture: ComponentFixture<FlightofcityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightofcityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightofcityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
