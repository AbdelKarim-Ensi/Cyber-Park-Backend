import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ajoutannouncement } from './ajoutannouncement';

describe('Ajoutannouncement', () => {
  let component: Ajoutannouncement;
  let fixture: ComponentFixture<Ajoutannouncement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ajoutannouncement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ajoutannouncement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
