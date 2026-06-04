
import {Directive, OnInit} from '@angular/core';
import { HttpParams } from '@angular/common/http';
import {BaseReadRepository, ReadRepository} from '../repository/read-repository';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class BaseCommonTableComponent<R> implements OnInit {
  protected config: CommonTableConfig;

  // eslint-disable-next-line
  constructor(protected readRepository: BaseReadRepository<R>)  {
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
}

export class CommonTableConfig {
  constructor(public loadOnInit: boolean) {
  }
}

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class CommonTableComponent<R> implements OnInit {
  protected config: CommonTableConfig = new CommonTableConfig(true);
  protected httpParams: HttpParams = null;

  repositoryData$ = this.readRepository.loadDataAction$

  // eslint-disable-next-line
  constructor(protected readRepository: ReadRepository<R>)  {}

  protected loadRepositoryData(): void {
    this.readRepository.loadData({params: this.httpParams});
  }

  // OnInit
  ngOnInit() {
    if (this.config.loadOnInit) {
      this.loadRepositoryData();
    }
  }
}
