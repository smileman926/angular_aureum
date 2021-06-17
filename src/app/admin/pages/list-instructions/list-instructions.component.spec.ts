import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInstructionsComponent } from './list-instructions.component';

describe('ListInstructionsComponent', () => {
  let component: ListInstructionsComponent;
  let fixture: ComponentFixture<ListInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInstructionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
