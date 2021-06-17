import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDealsComponent } from './list-deals.component';

describe('ListDealsComponent', () => {
  let component: ListDealsComponent;
  let fixture: ComponentFixture<ListDealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
