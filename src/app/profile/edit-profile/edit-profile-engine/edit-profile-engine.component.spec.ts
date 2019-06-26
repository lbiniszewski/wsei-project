import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileEngineComponent } from './edit-profile-engine.component';

describe('EditProfileEngineComponent', () => {
  let component: EditProfileEngineComponent;
  let fixture: ComponentFixture<EditProfileEngineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfileEngineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
