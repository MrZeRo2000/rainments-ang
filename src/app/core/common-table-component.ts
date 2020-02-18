import {ReadWriteRepository} from './read-write-repository';
import {OnInit} from '@angular/core';
import {HttpParams} from '@angular/common/http';

export class CommonTableComponent<T> implements OnInit {
  protected config: CommonTableConfig;

  constructor(protected repository: ReadWriteRepository<T>)  {
    this.config = this.getConfig();
  }

  getConfig(): CommonTableConfig {
    return new CommonTableConfig(true);
  }

  getHttpParams(): HttpParams {
    return null;
  }

  loadRepositoryData(): void {
    this.repository.loadData(this.getHttpParams());
  }

  // OnInit
  ngOnInit() {
    if (this.config.loadOnInit) {
      this.loadRepositoryData();
    }
  }

}

export class CommonTableConfig {
  constructor(public loadOnInit: boolean) {
  }
}
