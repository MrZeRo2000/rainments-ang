
import {Directive, OnDestroy, OnInit} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {ReadRepository} from '../repository/read-repository';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class CommonTableComponent<R> implements OnInit, OnDestroy {
  protected config: CommonTableConfig;

  constructor(protected readRepository: ReadRepository<R>)  {
    this.config = this.getConfig();
  }

  protected getConfig(): CommonTableConfig {
    return new CommonTableConfig(true);
  }

  protected getHttpParams(): HttpParams {
    return null;
  }

  protected loadRepositoryData(): void {
    this.readRepository.loadData(this.getHttpParams());
  }

  // OnInit
  ngOnInit() {
    if (this.config.loadOnInit) {
      this.loadRepositoryData();
    }
  }

  ngOnDestroy(): void {
  }

}

export class CommonTableConfig {
  constructor(public loadOnInit: boolean) {
  }
}
