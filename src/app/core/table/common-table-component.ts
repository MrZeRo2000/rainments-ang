import {ReadWriteRepository} from '../repository/read-write-repository';
import {OnInit} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {ReadRepository} from '../repository/read-repository';

export class CommonTableComponent<R, W> implements OnInit {
  protected config: CommonTableConfig;

  constructor(protected readRepository: ReadRepository<R>, protected repository: ReadWriteRepository<W>)  {
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
