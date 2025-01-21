import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {AppInfoRepository} from '../../repository/app-info-repository';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-app-info',
    templateUrl: './app-info.component.html',
    styleUrls: ['./app-info.component.scss'],
    standalone: false
})
export class AppInfoComponent implements OnInit, OnDestroy {
  version = environment.VERSION;
  appVersion: string;

  private appInfoSubscription: Subscription;

  constructor(protected readRepository: AppInfoRepository) {
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
