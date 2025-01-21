import {Component, Input, OnInit} from '@angular/core';
import {Loadable} from '../../edit/edit-intf';

@Component({
    selector: 'app-core-loading-progress',
    templateUrl: './loading-progress.component.html',
    styleUrls: ['./loading-progress.component.scss'],
    standalone: false
})
export class LoadingProgressComponent implements OnInit {

  @Input() loadable: Loadable;

  @Input() message: string;

  constructor() { }

  ngOnInit() {
  }

}
