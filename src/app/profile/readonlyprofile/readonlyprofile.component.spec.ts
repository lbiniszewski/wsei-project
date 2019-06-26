import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadonlyprofileComponent } from './readonlyprofile.component';

describe('ReadonlyprofileComponent', () => {
  let component: ReadonlyprofileComponent;
  let fixture: ComponentFixture<ReadonlyprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadonlyprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadonlyprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
