import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductLaunchByAdminComponent } from './edit-product-launch-by-admin.component';

describe('EditProductLaunchByAdminComponent', () => {
  let component: EditProductLaunchByAdminComponent;
  let fixture: ComponentFixture<EditProductLaunchByAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProductLaunchByAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductLaunchByAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
