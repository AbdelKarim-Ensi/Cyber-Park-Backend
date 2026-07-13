import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ajoutsalary } from './ajoutsalary';

describe('Ajoutsalary', () => {
  let component: Ajoutsalary;
  let fixture: ComponentFixture<Ajoutsalary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ajoutsalary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ajoutsalary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
