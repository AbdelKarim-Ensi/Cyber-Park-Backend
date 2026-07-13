import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryAdvances } from './salary-advances';

describe('SalaryAdvances', () => {
  let component: SalaryAdvances;
  let fixture: ComponentFixture<SalaryAdvances>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalaryAdvances]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaryAdvances);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
