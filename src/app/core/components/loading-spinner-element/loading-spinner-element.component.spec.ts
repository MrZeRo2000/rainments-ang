import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSpinnerElementComponent } from './loading-spinner-element.component';

describe('LoadingSpinnerElementComponent', () => {
  let component: LoadingSpinnerElementComponent;
  let fixture: ComponentFixture<LoadingSpinnerElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingSpinnerElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingSpinnerElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
