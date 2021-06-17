import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupBonuscodeComponent } from './setup-bonuscode.component';

describe('SetupBonuscodeComponent', () => {
  let component: SetupBonuscodeComponent;
  let fixture: ComponentFixture<SetupBonuscodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupBonuscodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupBonuscodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
