import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeStreetPage } from './change-street.page';

describe('ChangeStreetPage', () => {
  let component: ChangeStreetPage;
  let fixture: ComponentFixture<ChangeStreetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeStreetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeStreetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
