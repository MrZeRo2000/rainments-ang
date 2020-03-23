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


@NgModule({
  declarations: [
    LoadingProgressComponent,
    AddPanelComponent,
    EditDeletePanelComponent,
    SaveDialogPanelComponent,
    UrlValidatorDirective,
    ColoredValueLabelComponent,
    AmountPipe,
    EnumStringValuePipe,
  ],
  imports: [
    CommonModule,
    DataSourceModule
  ],
    exports: [
        LoadingProgressComponent,
        AddPanelComponent,
        EditDeletePanelComponent,
        SaveDialogPanelComponent,
        ColoredValueLabelComponent,
        AmountPipe,
        EnumStringValuePipe
    ],
  providers: [
    AmountPipe,
    EnumStringValuePipe
  ]
})
export class CoreModule { }
