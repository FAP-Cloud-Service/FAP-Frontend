import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutVerificationComponent } from './logout-verification.component';

describe('LogoutVerificationComponent', () => {
  let component: LogoutVerificationComponent;
  let fixture: ComponentFixture<LogoutVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
