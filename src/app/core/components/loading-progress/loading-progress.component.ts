import {Component, input} from '@angular/core';
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

  loading = input<boolean>();

  message = input<string>();

}
