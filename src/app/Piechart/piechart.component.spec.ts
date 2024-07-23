import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerdetailsComponent } from './piechart.component';

describe('CustomerdetailsComponent', () => {
  let component: CustomerdetailsComponent;
  let fixture: ComponentFixture<CustomerdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
