import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRuaPage } from './list-rua.page';

describe('ListRuaPage', () => {
  let component: ListRuaPage;
  let fixture: ComponentFixture<ListRuaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRuaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRuaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
