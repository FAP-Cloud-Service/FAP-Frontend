import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsmapComponent } from './friendsmap.component';

describe('FriendsmapComponent', () => {
  let component: FriendsmapComponent;
  let fixture: ComponentFixture<FriendsmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
