import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {APP_INFO_READ_REPOSITORY} from "../../repository/repository-tokens";
import {AsyncPipe} from "@angular/common";
import {shareReplay} from "rxjs";

@Component({
  selector: 'app-app-info',
  templateUrl: './app-info.component.html',
  styleUrls: ['./app-info.component.scss'],
  imports: [
    AsyncPipe
  ]
})
export class AppInfoComponent implements OnInit {
  readRepository = inject(APP_INFO_READ_REPOSITORY)

  repositoryData$ = this.readRepository.loadDataAction$.pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  )

  version = environment.VERSION;

  ngOnInit(): void {
    this.readRepository.loadData();
  }
}
