import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightformcityComponent } from './flightformcity.component';

describe('FlightformcityComponent', () => {
  let component: FlightformcityComponent;
  let fixture: ComponentFixture<FlightformcityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightformcityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightformcityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
