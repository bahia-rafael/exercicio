import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListCronogramaPage } from './view-list-cronograma.page';

describe('ViewListCronogramaPage', () => {
  let component: ViewListCronogramaPage;
  let fixture: ComponentFixture<ViewListCronogramaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewListCronogramaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewListCronogramaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
