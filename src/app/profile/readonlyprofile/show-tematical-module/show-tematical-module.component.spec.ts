import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTematicalModuleComponent } from './show-tematical-module.component';

describe('ShowTematicalModuleComponent', () => {
  let component: ShowTematicalModuleComponent;
  let fixture: ComponentFixture<ShowTematicalModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowTematicalModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTematicalModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
