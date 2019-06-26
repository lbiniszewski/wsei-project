import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOpinionComponent } from './show-opinion.component';

describe('ShowOpinionComponent', () => {
  let component: ShowOpinionComponent;
  let fixture: ComponentFixture<ShowOpinionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowOpinionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
