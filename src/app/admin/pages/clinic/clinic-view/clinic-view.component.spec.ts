import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicViewComponent } from './clinic-view.component';

describe('ClinicViewComponent', () => {
  let component: ClinicViewComponent;
  let fixture: ComponentFixture<ClinicViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
