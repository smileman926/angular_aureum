import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipDialogDashboardComponent } from './tooltip-dialog-dashboard.component';

describe('TooltipDialogDashboardComponent', () => {
  let component: TooltipDialogDashboardComponent;
  let fixture: ComponentFixture<TooltipDialogDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TooltipDialogDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipDialogDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
