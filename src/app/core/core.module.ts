import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingProgressComponent } from './loading-progress/loading-progress.component';
import { AddPanelComponent } from './add-panel/add-panel.component';
import { EditDeletePanelComponent } from './edit-delete-panel/edit-delete-panel.component';
import { SaveDialogPanelComponent } from './save-dialog-panel/save-dialog-panel.component';
import {DataSourceModule} from '../data-source/data-source.module';
import { UrlValidatorDirective } from './url-validator.directive';



@NgModule({
  declarations: [
    LoadingProgressComponent,
    AddPanelComponent,
    EditDeletePanelComponent,
    SaveDialogPanelComponent,
    UrlValidatorDirective
  ],
  imports: [
    CommonModule,
    DataSourceModule
  ],
  exports: [
    LoadingProgressComponent,
    AddPanelComponent,
    EditDeletePanelComponent,
    SaveDialogPanelComponent
  ]
})
export class CoreModule { }
