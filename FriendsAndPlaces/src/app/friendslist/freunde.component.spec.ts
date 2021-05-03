import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreundeComponent } from './freunde.component';

describe('FreundeComponent', () => {
  let component: FreundeComponent;
  let fixture: ComponentFixture<FreundeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreundeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreundeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
