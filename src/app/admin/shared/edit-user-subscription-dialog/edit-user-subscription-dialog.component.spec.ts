import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserSubscriptionDialogComponent } from './edit-user-subscription-dialog.component';

describe('EditUserSubscriptionDialogComponent', () => {
  let component: EditUserSubscriptionDialogComponent;
  let fixture: ComponentFixture<EditUserSubscriptionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserSubscriptionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserSubscriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
