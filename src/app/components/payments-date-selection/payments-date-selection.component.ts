import {Component, computed, inject, input, OnInit, output, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {DateRangeGenerator, PeriodInfo} from '../../core/utils/date-range-generator';
import {PaymentObjectTotals} from '../../model/payment-object-totals';
import {NgClass} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-payments-date-selection',
  templateUrl: './payments-date-selection.component.html',
  imports: [
    ReactiveFormsModule,
    NgClass,
    FaIconComponent
  ],
  styleUrls: ['./payments-date-selection.component.scss']
})
export class PaymentsDateSelectionComponent implements OnInit {
  private fb = inject(FormBuilder)

  paymentObjectTotals = input<PaymentObjectTotals>();

  selectedDate = output<Date>();

  editForm = this.fb.group({
    periodSelect: new FormControl<number | null>(null, Validators.required),
    yearSelect: new FormControl<number | null>(null, Validators.required)
  });

  private readonly minSelectionDate: Date;
  private readonly maxSelectionDate: Date;

  private readonly lastSelectedDate = signal<Date>(new Date());
  private readonly period = signal<string | undefined>(undefined);
  private readonly dr = signal<DateRangeGenerator | undefined>(undefined);

  readonly periods = computed<PeriodInfo[]>(() => this.dr()?.getPeriods() ?? []);
  readonly years = computed<number[]>(() => this.dr()?.getYears() ?? []);

  readonly selectedFirstDate = computed(() => {
    const dr = this.dr();
    return !!dr && dr.addPeriod(this.lastSelectedDate(), -1) < this.minSelectionDate;
  });

  readonly selectedLastDate = computed(() => {
    const dr = this.dr();
    return !!dr && dr.addPeriod(this.lastSelectedDate(), 1) > this.maxSelectionDate;
  });

  constructor() {
    const currentDate = new Date();
    this.minSelectionDate = new Date(currentDate.getFullYear() - 3, 0, 1);
    this.maxSelectionDate = new Date(currentDate.getFullYear() + 1, 11, 31);

    // Emit when the user changes the dropdowns (period must be initialised first).
    this.editForm.valueChanges.pipe(takeUntilDestroyed()).subscribe(v => {
      const dr = this.dr();
      if (this.period() && dr && v.yearSelect != null && v.periodSelect != null) {
        this.emitSelectedDate(dr.getPeriodDate(v.yearSelect, v.periodSelect));
      }
    });
  }

  ngOnInit() {
    const totals = this.paymentObjectTotals();
    this.lastSelectedDate.set(totals?.paymentDate ?? new Date());
    this.setPeriod(totals?.paymentObject?.period ?? 'M');
    this.emitSelectedDate(this.lastSelectedDate());
  }

  addPeriod(value: number): void {
    const dr = this.dr();
    if (!dr) {
      return;
    }
    if ((value > 0 && !this.selectedLastDate()) || (value < 0 && !this.selectedFirstDate())) {
      const newDate = dr.addPeriod(this.lastSelectedDate(), value);
      this.emitSelectedDate(newDate);
      this.editForm.patchValue({periodSelect: dr.getPeriodValue(newDate), yearSelect: newDate.getFullYear()});
    }
  }

  private setPeriod(period: string) {
    if (period && this.period() !== period) {
      const dr = new DateRangeGenerator(this.minSelectionDate, this.maxSelectionDate, period);
      this.dr.set(dr);

      // Set both controls at once so valueChanges fires a single time.
      this.editForm.patchValue({
        yearSelect: this.lastSelectedDate().getFullYear(),
        periodSelect: dr.getPeriodValue(this.lastSelectedDate())
      });
      this.period.set(period);
    }
  }

  private emitSelectedDate(date: Date): void {
    this.lastSelectedDate.set(date);
    this.selectedDate.emit(date);
  }
}
