import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersDatabaseComponent } from './orders-database.component';

describe('OrdersDatabaseComponent', () => {
  let component: OrdersDatabaseComponent;
  let fixture: ComponentFixture<OrdersDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
