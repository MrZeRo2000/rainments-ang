import {CommonRepository} from './common-repository';
import {OnInit} from '@angular/core';

export class CommonTableComponent<T> implements OnInit {
  protected config: CommonTableConfig;

  constructor(protected repository: CommonRepository<T>)  {
    this.config = this.getConfig();
  }

  getConfig(): CommonTableConfig {
    return new CommonTableConfig(true);
  }

  // OnInit
  ngOnInit() {
    if (this.config.loadOnInit) {
      this.repository.loadData();
    }
  }

}

export class CommonTableConfig {
  constructor(public loadOnInit: boolean) {
  }
}
