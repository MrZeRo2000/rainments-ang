import {Component, Input, OnInit} from '@angular/core';
import {Loadable} from '../edit-intf';

@Component({
  selector: 'app-core-loading-progress',
  templateUrl: './loading-progress.component.html',
  styleUrls: ['./loading-progress.component.css']
})
export class LoadingProgressComponent implements OnInit {

  @Input() loadable: Loadable;

  constructor() { }

  ngOnInit() {
  }

}
