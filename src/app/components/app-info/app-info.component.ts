import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {AppInfoRepository} from '../../repository/app-info-repository';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-app-info',
    templateUrl: './app-info.component.html',
    styleUrls: ['./app-info.component.scss'],
})
export class AppInfoComponent implements OnInit, OnDestroy {
  protected readRepository = inject(AppInfoRepository)

  version = environment.VERSION;
  appVersion: string;

  private appInfoSubscription: Subscription;

  constructor() {
    this.appInfoSubscription = this.readRepository.getLoadSuccessObservable().subscribe(v => {
      if (v) {
        this.appVersion = this.readRepository.getData()[0].version;
      }
    });
  }

  ngOnInit(): void {
    this.readRepository.loadData();
  }

  ngOnDestroy(): void {
    this.appInfoSubscription.unsubscribe();
  }
}
