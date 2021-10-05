import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAngleLeft, faAngleRight, faCaretDown, faCaretUp,
  faCheckCircle,
  faClone, faEdit, faEllipsisH, faEquals, faExclamation, faEye,
  faFileExport, faGripVertical,
  faLock,
  faPen, faPlus,
  faPlusCircle,
  faSave, faSearch,
  faSignInAlt,
  faSignOutAlt, faSpinner, faTimes,
  faTrash, faWindowClose, faChartLine, faCog
} from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    FontAwesomeModule
  ]
})
export class FontAwesomeIconsModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faLock, faSignInAlt, faSignOutAlt, faSave, faFileExport, faPlusCircle, faTrash, faPen, faClone, faSpinner, faSearch,
      faCheckCircle, faWindowClose, faEllipsisH, faTimes, faAngleLeft, faAngleRight, faPlus, faEye, faEdit, faGripVertical, faExclamation,
      faCaretUp, faCaretDown, faEquals, faChartLine, faCog);
  }
}
