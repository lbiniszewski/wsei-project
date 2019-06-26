import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProfileEngineComponent } from './show-profile-engine.component';

describe('ShowProfileEngineComponent', () => {
  let component: ShowProfileEngineComponent;
  let fixture: ComponentFixture<ShowProfileEngineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowProfileEngineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProfileEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
