import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Flight102Component } from './flight102.component';

describe('Flight102Component', () => {
  let component: Flight102Component;
  let fixture: ComponentFixture<Flight102Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Flight102Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Flight102Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
