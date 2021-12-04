import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteflightsComponent } from './deleteflights.component';

describe('DeleteflightsComponent', () => {
  let component: DeleteflightsComponent;
  let fixture: ComponentFixture<DeleteflightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteflightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteflightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
