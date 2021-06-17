import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserLoginDialogComponent } from './edit-user-login-dialog.component';

describe('EditUserLoginDialogComponent', () => {
  let component: EditUserLoginDialogComponent;
  let fixture: ComponentFixture<EditUserLoginDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserLoginDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserLoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
