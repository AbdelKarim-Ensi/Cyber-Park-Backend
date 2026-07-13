import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Updateannouncement } from './updateannouncement';

describe('Updateannouncement', () => {
  let component: Updateannouncement;
  let fixture: ComponentFixture<Updateannouncement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Updateannouncement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Updateannouncement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
