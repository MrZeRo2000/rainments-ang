import {Component, Input} from '@angular/core';
import {Loadable} from '../../edit/edit-intf';
import {LoadingSpinnerElementComponent} from "../loading-spinner-element/loading-spinner-element.component";

@Component({
  selector: 'app-core-loading-progress',
  templateUrl: './loading-progress.component.html',
  imports: [
    LoadingSpinnerElementComponent
  ],
  styleUrls: ['./loading-progress.component.scss']
})
export class LoadingProgressComponent {

  @Input() loadable: Loadable;

  @Input() message: string;

}
