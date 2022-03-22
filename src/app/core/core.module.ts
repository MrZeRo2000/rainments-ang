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
import { DisplayIconElementComponent } from './components/display-icon-element/display-icon-element.component';
import { ColoredTrendLabelComponent } from './components/colored-trend-label/colored-trend-label.component';
import { DragGripComponent } from './components/drag-grip/drag-grip.component';
import {DragHandlerService} from './services/drag-handler.service';
import { DropDownMoreMenuComponent } from './components/drop-down-more-menu/drop-down-more-menu.component';
import { ShortMonthYearPipe } from './pipes/short-month-year.pipe';
import {FontAwesomeIconsModule} from '../font-awesome-icons/font-awesome-icons.module';
import { ReportNavComponent } from './components/report-nav/report-nav.component';
import { LocaleDatePipe } from './pipes/locale-date.pipe';
import { DropDownMultiSelectComponent } from './components/drop-down-multi-select/drop-down-multi-select.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { InputPasteFloatControlDirective } from './directives/input-paste-float-control.directive';
import { InputPasteFloatModelDirective } from './directives/input-paste-float-model.directive';
import { CoreSelectablePanelComponent } from './components/core-selectable-panel/core-selectable-panel.component';


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
        DisplayIconElementComponent,
        ColoredTrendLabelComponent,
        DragGripComponent,
        DropDownMoreMenuComponent,
        ShortMonthYearPipe,
        ReportNavComponent,
        LocaleDatePipe,
        DropDownMultiSelectComponent,
        InputPasteFloatControlDirective,
        InputPasteFloatModelDirective,
        CoreSelectablePanelComponent
    ],
    imports: [
        CommonModule,
        DataSourceModule,
        FontAwesomeIconsModule,
        BsDropdownModule
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
        DisplayIconElementComponent,
        LoadingModalPanelComponent,
        AmountPipe,
        EnumStringValuePipe,
        DragGripComponent,
        DropDownMoreMenuComponent,
        ShortMonthYearPipe,
        ReportNavComponent,
        LocaleDatePipe,
        DropDownMultiSelectComponent,
        InputPasteFloatControlDirective,
        InputPasteFloatModelDirective
    ],
    providers: [
        AmountPipe,
        EnumStringValuePipe,
        DragHandlerService
    ]
})
export class CoreModule { }
