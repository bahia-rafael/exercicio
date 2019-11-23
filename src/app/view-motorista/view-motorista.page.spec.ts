import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMotoristaPage } from './view-motorista.page';

describe('ViewMotoristaPage', () => {
  let component: ViewMotoristaPage;
  let fixture: ComponentFixture<ViewMotoristaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMotoristaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMotoristaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
