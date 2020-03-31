import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSiteMapComponent } from './user-site-map.component';

describe('UserSiteMapComponent', () => {
  let component: UserSiteMapComponent;
  let fixture: ComponentFixture<UserSiteMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSiteMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSiteMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
