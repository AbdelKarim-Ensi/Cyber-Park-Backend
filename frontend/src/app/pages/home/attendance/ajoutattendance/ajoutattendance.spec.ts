import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ajoutattendance } from './ajoutattendance';

describe('Ajoutattendance', () => {
  let component: Ajoutattendance;
  let fixture: ComponentFixture<Ajoutattendance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ajoutattendance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ajoutattendance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
