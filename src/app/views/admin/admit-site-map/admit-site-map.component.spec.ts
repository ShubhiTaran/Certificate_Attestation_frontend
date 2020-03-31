import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmitSiteMapComponent } from './admit-site-map.component';

describe('AdmitSiteMapComponent', () => {
  let component: AdmitSiteMapComponent;
  let fixture: ComponentFixture<AdmitSiteMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmitSiteMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmitSiteMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
