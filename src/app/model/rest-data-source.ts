import {Inject, Injectable} from '@angular/core';
import {RestUrl} from '../config/configuration';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class RestDataSource {
  restUrl: string;

  constructor(private http: HttpClient, @Inject(RestUrl) restUrl: string) {
    this.restUrl = restUrl;
  }

  getResponse(resourceName: string): Observable<HttpResponse<any>> {
    return this.http.get(this.restUrl + resourceName, { observe: 'response' });
  }
}
