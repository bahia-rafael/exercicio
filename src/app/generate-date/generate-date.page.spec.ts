import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateDatePage } from './generate-date.page';

describe('GenerateDatePage', () => {
  let component: GenerateDatePage;
  let fixture: ComponentFixture<GenerateDatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateDatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateDatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
