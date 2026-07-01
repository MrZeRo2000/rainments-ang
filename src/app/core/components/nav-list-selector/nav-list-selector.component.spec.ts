import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavListSelectorComponent } from './nav-list-selector.component';

describe('NavListSelectorComponent', () => {
  let component: NavListSelectorComponent;
  let fixture: ComponentFixture<NavListSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavListSelectorComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavListSelectorComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', ['Chart', 'Table']);
    fixture.componentRef.setInput('selected', 'Chart');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
