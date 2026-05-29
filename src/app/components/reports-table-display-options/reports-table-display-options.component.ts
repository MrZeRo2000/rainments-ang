import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {DisplayIconElementComponent} from "../../core/components/display-icon-element/display-icon-element.component";

export class ReportsTableDisplayOptions {
  private readonly KEY = 'reportsTableDisplayOptions';

  public showDate: boolean;
  public showGroup: boolean;
  public showProduct: boolean;
  public displayColors: boolean;

  public static fromLocalStorage(): ReportsTableDisplayOptions {
    const instance = new ReportsTableDisplayOptions();
    instance.loadFromLocalStorage();

    return instance;
  }

  public getColumnNumber(): number {
    return Number(this.showDate) + Number(this.showGroup) + Number(this.showProduct);
  }

  public saveToLocalStorage(): void {
    localStorage.setItem(this.KEY, JSON.stringify(this));
  }

  public loadDefaults(): void {
    this.showDate = true;
    this.showGroup = true;
    this.showProduct = true;
    this.displayColors = true;
  }

  public loadFromLocalStorage(): void {
    const localItem = localStorage.getItem(this.KEY);
    this.loadDefaults();
    if (localItem !== null) {
      try {
        const localObject = JSON.parse(localItem);
        this.displayColors = localObject.displayColors;
      } catch (e) {
        this.loadDefaults();
      }
    }
  }
}


@Component({
  selector: 'app-reports-table-display-options',
  templateUrl: './reports-table-display-options.component.html',
  imports: [
    BsDropdownModule,
    DisplayIconElementComponent,
    ReactiveFormsModule
  ],
  styleUrls: ['./reports-table-display-options.component.scss']
})
export class ReportsTableDisplayOptionsComponent implements OnInit {
  private fb = inject(UntypedFormBuilder)

  @Input()
  reportsTableDisplayOptions: ReportsTableDisplayOptions;

  @Output()
  selectionChanged = new EventEmitter<ReportsTableDisplayOptions>();

  displayOptionsForm: UntypedFormGroup;

  private buildForm(): UntypedFormGroup {
    const formGroup = this.fb.group({
        showDate: [this.reportsTableDisplayOptions?.showDate],
        showGroup: [this.reportsTableDisplayOptions?.showGroup],
        showProduct: [this.reportsTableDisplayOptions?.showProduct],
        displayColors: [this.reportsTableDisplayOptions?.displayColors]
      }
    );

    formGroup.valueChanges.subscribe((value => {
      Object.assign(this.reportsTableDisplayOptions, value);
      this.selectionChanged.emit(this.reportsTableDisplayOptions);
    }))

    return formGroup;
  }

  ngOnInit(): void {
    this.displayOptionsForm = this.buildForm();
  }

}
