import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Updateattendance } from './updateattendance';

describe('Updateattendance', () => {
  let component: Updateattendance;
  let fixture: ComponentFixture<Updateattendance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Updateattendance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Updateattendance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
