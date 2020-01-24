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

  postResponse(resourceName: string, body: any): Observable<HttpResponse<any>> {
    return this.http.post(this.restUrl + resourceName, body, { observe: 'response' });
  }

  putResponse(resourceName: string, id: number, body: any): Observable<HttpResponse<any>> {
    return this.http.put(this.restUrl + resourceName + '/' + id, body, { observe: 'response' });
  }

  deleteResponse(resourceName: string, id: number): Observable<HttpResponse<any>> {
    return this.http.delete(this.restUrl + resourceName + '/' + id, { observe: 'response' });
  }
}
