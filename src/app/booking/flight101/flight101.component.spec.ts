import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Flight101Component } from './flight101.component';

describe('Flight101Component', () => {
  let component: Flight101Component;
  let fixture: ComponentFixture<Flight101Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Flight101Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Flight101Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
