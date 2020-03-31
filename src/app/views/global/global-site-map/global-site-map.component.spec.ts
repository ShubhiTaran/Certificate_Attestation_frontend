import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSiteMapComponent } from './global-site-map.component';

describe('GlobalSiteMapComponent', () => {
  let component: GlobalSiteMapComponent;
  let fixture: ComponentFixture<GlobalSiteMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalSiteMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalSiteMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
