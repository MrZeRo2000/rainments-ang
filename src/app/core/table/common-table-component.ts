import {ReadWriteRepository} from '../read-write-repository';
import {OnInit} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {ReadRepository} from '../read-repository';

export class CommonTableComponent<R, W> implements OnInit {
  protected config: CommonTableConfig;

  constructor(protected readRepository: ReadRepository<R>, protected repository: ReadWriteRepository<W>)  {
    this.config = this.getConfig();
  }

  getConfig(): CommonTableConfig {
    return new CommonTableConfig(true);
  }

  getHttpParams(): HttpParams {
    return null;
  }

  loadRepositoryData(): void {
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
