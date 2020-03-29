import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingModalPanelComponent } from './loading-modal-panel.component';
import {LoadingSpinnerElementComponent} from '../loading-spinner-element/loading-spinner-element.component';
import {LoadingProgressComponent} from '../loading-progress/loading-progress.component';

describe('LoadingModalPanelComponent', () => {
  let component: LoadingModalPanelComponent;
  let fixture: ComponentFixture<LoadingModalPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingModalPanelComponent, LoadingSpinnerElementComponent, LoadingProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingModalPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
