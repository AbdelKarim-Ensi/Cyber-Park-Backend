import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Updateproject } from './updateproject';

describe('Updateproject', () => {
  let component: Updateproject;
  let fixture: ComponentFixture<Updateproject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Updateproject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Updateproject);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
