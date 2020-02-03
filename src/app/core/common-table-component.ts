import {CommonRepository} from './common-repository';
import {OnInit} from '@angular/core';

export class CommonTableComponent<T> implements OnInit {

  constructor(protected repository: CommonRepository<T>)  {
  }

  // OnInit
  ngOnInit() {
    this.repository.loadData();
  }

}
