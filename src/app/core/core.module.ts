import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingProgressComponent } from './components/loading-progress/loading-progress.component';
import { AddPanelComponent } from './components/add-panel/add-panel.component';
import { EditDeletePanelComponent } from './components/edit-delete-panel/edit-delete-panel.component';
import { SaveDialogPanelComponent } from './components/save-dialog-panel/save-dialog-panel.component';
import {DataSourceModule} from '../data-source/data-source.module';
import { UrlValidatorDirective } from './directives/url-validator.directive';
import { AmountPipe } from './pipes/amount.pipe';
import { ColoredValueLabelComponent } from './components/colored-value-label/colored-value-label.component';
import { EnumStringValuePipe } from './pipes/enum-string-value.pipe';
import {ConfirmationModalDialogComponent} from './components/confirmation-modal-dialog/confirmation-modal-dialog.component';
import { LoadingModalPanelComponent } from './components/loading-modal-panel/loading-modal-panel.component';
import { LoadingSpinnerElementComponent } from './components/loading-spinner-element/loading-spinner-element.component';
import { ColoredTrendLabelComponent } from './components/colored-trend-label/colored-trend-label.component';


@NgModule({
  declarations: [
    LoadingProgressComponent,
    AddPanelComponent,
    EditDeletePanelComponent,
    SaveDialogPanelComponent,
    UrlValidatorDirective,
    ColoredValueLabelComponent,
    ConfirmationModalDialogComponent,
    AmountPipe,
    EnumStringValuePipe,
    LoadingModalPanelComponent,
    LoadingSpinnerElementComponent,
    ColoredTrendLabelComponent,
  ],
  imports: [
    CommonModule,
    DataSourceModule
  ],
  // modal component not directly referenced in templates
  entryComponents: [
    ConfirmationModalDialogComponent
  ],
    exports: [
        LoadingProgressComponent,
        AddPanelComponent,
        EditDeletePanelComponent,
        SaveDialogPanelComponent,
        ColoredValueLabelComponent,
        ColoredTrendLabelComponent,
        ConfirmationModalDialogComponent,
        LoadingSpinnerElementComponent,
        LoadingModalPanelComponent,
        AmountPipe,
        EnumStringValuePipe
    ],
  providers: [
    AmountPipe,
    EnumStringValuePipe
  ]
})
export class CoreModule { }
