import {RestDataSource} from './rest-data-source';

export class CommonRepository<T> {
  private data: T[] = new Array<T>();

  constructor(protected dataSource: RestDataSource, private resourceName: string) { }

  loadData(): void {
    this.dataSource.getResponse(this.resourceName).subscribe((data) => {
      if (data.ok) {
        Object.assign(this.data, data.body);
      } else {
        this.data = new Array<T>();
        // TODO: report error
      }
    }, error => {
      this.data = new Array<T>();
      // TODO: report error
    });
  }

  getData(): T[] {
    return this.data;
  }
}
