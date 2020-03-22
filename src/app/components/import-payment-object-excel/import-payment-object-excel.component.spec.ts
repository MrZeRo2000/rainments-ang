import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportPaymentObjectExcelComponent } from './import-payment-object-excel.component';

describe('ImportPaymentObjectExcelComponent', () => {
  let component: ImportPaymentObjectExcelComponent;
  let fixture: ComponentFixture<ImportPaymentObjectExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportPaymentObjectExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportPaymentObjectExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
