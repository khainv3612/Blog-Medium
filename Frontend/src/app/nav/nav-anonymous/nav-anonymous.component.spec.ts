import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAnonymousComponent } from './nav-anonymous.component';

describe('NavAnonymousComponent', () => {
  let component: NavAnonymousComponent;
  let fixture: ComponentFixture<NavAnonymousComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavAnonymousComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavAnonymousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
