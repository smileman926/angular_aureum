import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsellersComponent } from './listsellers.component';

describe('ListsellersComponent', () => {
  let component: ListsellersComponent;
  let fixture: ComponentFixture<ListsellersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsellersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
