import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingProgressComponent } from './loading-progress/loading-progress.component';
import { AddPanelComponent } from './add-panel/add-panel.component';
import { EditDeletePanelComponent } from './edit-delete-panel/edit-delete-panel.component';



@NgModule({
  declarations: [
    LoadingProgressComponent,
    AddPanelComponent,
    EditDeletePanelComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingProgressComponent,
    AddPanelComponent,
    EditDeletePanelComponent
  ]
})
export class CoreModule { }
