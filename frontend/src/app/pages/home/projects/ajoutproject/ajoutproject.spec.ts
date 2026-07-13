import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ajoutproject } from './ajoutproject';

describe('Ajoutproject', () => {
  let component: Ajoutproject;
  let fixture: ComponentFixture<Ajoutproject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ajoutproject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ajoutproject);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
