import {Component, computed, effect, inject, OnInit, Signal, signal} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {SCAN_LATEST_READ_REPOSITORY} from "../../repository/repository-tokens";
import {LoadingProgressComponent} from "../../core/components/loading-progress/loading-progress.component";
import {PaymentObject} from "../../model/payment-object";
import {HttpParams} from "@angular/common/http";
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {DecimalPipe} from "@angular/common";
import {toSignal} from "@angular/core/rxjs-interop";
import {catchError, finalize, Observable, of, Subject, switchMap, tap} from "rxjs";
import {PaymentImport, ScanResult} from "../../model/scan";
import {Payment} from "../../model/payment";
import {RowsAffectedResult} from "../../model/result";
import {RestDataSource} from "../../data-source/rest-data-source";
import {MessagesService} from "../../messages/messages.service";
import {RepositoryUtils} from "../../core/repository/repository-utils";
import {ErrorMessage, SuccessMessage} from "../../messages/message.model";
import {form, FormField} from '@angular/forms/signals';

interface ImportDataItem {
  paymentId?: number
  scan: ScanResult
}

interface ImportDataModel {
  items: ImportDataItem[]
}

@Component({
  selector: 'app-payments-import-dialog',
  imports: [
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    MatButton,
    MatDialogClose,
    LoadingProgressComponent,
    MatSelectionList,
    MatListOption,
    DecimalPipe,
    FormField,
  ],
  templateUrl: './payments-import-dialog.component.html',
  styleUrl: './payments-import-dialog.component.scss',
})
export class PaymentsImportDialogComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef);
  private readonly dataSource: RestDataSource = inject(RestDataSource)
  private readonly messagesService: MessagesService = inject(MessagesService)

  readonly readRepository = inject(SCAN_LATEST_READ_REPOSITORY)

  readonly data = inject<{paymentObject: PaymentObject, payments: Payment[]}>(MAT_DIALOG_DATA);
  readonly productNames = this.data.payments.map(p => p.product!.name);

  readonly dataSignal: Signal<ImportDataItem[]> = toSignal(this.readRepository.loadDataAction$.pipe(
    switchMap(data => {
      const scan =  Object.fromEntries(
        data.map(v => [v.productName, new ScanResult(v.productName, v.scanValue, this.productNames.indexOf(v.productName) == -1)])
      ) as {[index: string]: ScanResult}
      const found = this.data.payments.map(
        v => {return {paymentId: v.id!, scan: scan[v.product!.name!]}}
      ).filter(v => !!v.scan)
      const notFound = Object.entries(scan)
        .filter(([key]) => this.productNames.indexOf(key) == -1)
        .map(([, scan]) => {return {paymentId: undefined, scan: new ScanResult(scan.productName, scan.scanValue, true)}})
      return of([... found, ... notFound])
    }),
  ), {initialValue: []})

  importModel = signal<ImportDataModel>({items: []})
  importForm = form(this.importModel)
  importTotals = computed(() =>
    this.importForm().value().items.reduce((a, v) => a + v.scan.scanValue, 0)
  )

  importSubject = new Subject<PaymentImport[]>()

  importAction$: Observable<RowsAffectedResult> = this.importSubject.pipe(
    tap(() => this.importLoadingSignal.set(true)),
    switchMap(v =>
      this.dataSource.patchBulkResponse<RowsAffectedResult>("payments:update_amount", v).pipe(
        switchMap(data => {
          return of(data.body as RowsAffectedResult)
        }),
        catchError(err => {
          const message = `Network error: ${RepositoryUtils.getNetworkErrorMessage(err)}`;
          this.messagesService.reportMessage(new ErrorMessage( message));
          return of({ rowsAffected: 0 } as RowsAffectedResult)
        }),
        finalize(() => {
          console.log('Finalize')
          this.importLoadingSignal.set(false)
        })
      )
    ),

  )
  importActionSignal = toSignal(this.importAction$)

  importLoadingSignal = signal(false)
  loadingSignal = computed(() => this.readRepository.loadingSignal() || this.importLoadingSignal())

  constructor() {
    effect(() => {
      const importActionData = this.importActionSignal()
      console.log(`Import action data: ${JSON.stringify(importActionData)}`)
      const rowsAffected = importActionData?.rowsAffected ?? 0
      if (rowsAffected > 0) {
        this.messagesService.reportMessage(new SuccessMessage(`Successfully updated ${rowsAffected} rows`))
        this.dialogRef.close(this.importModel().items)
      }
    })
  }

  ngOnInit(): void {
    const httpParams = new HttpParams().append("objectName", this.data.paymentObject!.name!)
    this.readRepository.loadData({ params: httpParams })
  }

  importOnClick(): void {
    console.log(`Importing data: ${JSON.stringify(this.importModel())}`)
    const importDataValue: PaymentImport[] = this.importModel().items
      .map(v => {return {paymentId: v.paymentId, paymentAmount: v.scan.scanValue} as PaymentImport})
    this.importSubject.next(importDataValue)
  }
}
