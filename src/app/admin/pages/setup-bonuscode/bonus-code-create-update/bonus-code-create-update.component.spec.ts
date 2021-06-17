import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusCodeCreateUpdateComponent } from './bonus-code-create-update.component';

describe('BonusCodeCreateUpdateComponent', () => {
  let component: BonusCodeCreateUpdateComponent;
  let fixture: ComponentFixture<BonusCodeCreateUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonusCodeCreateUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusCodeCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
