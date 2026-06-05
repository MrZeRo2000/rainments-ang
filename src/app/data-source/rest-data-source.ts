import {inject, Injectable} from '@angular/core';
import {RestUrl} from '../config/configuration';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class RestDataSource {
  private http = inject(HttpClient);
  private restUrl = inject(RestUrl);

  getResponse<T>(resourceName: string, params?: HttpParams): Observable<HttpResponse<T>> {
    return this.http.get<T>(this.restUrl + resourceName, { observe: 'response', params });
  }

  postResponse<T>(resourceName: string, body: any, httpParams?: HttpParams, headers?: HttpHeaders): Observable<HttpResponse<T>> {
    return this.http.post<T>(this.restUrl + resourceName, body, { headers, observe: 'response', params: httpParams });
  }

  putResponse<T>(resourceName: string, id: number, body: T): Observable<HttpResponse<T>> {
    return this.http.put<T>(this.restUrl + resourceName + '/' + id, body, { observe: 'response' });
  }

  deleteResponse<T>(resourceName: string, id: number): Observable<HttpResponse<T>> {
    return this.http.delete<T>(this.restUrl + resourceName + '/' + id, { observe: 'response' });
  }

  patchResponse<T>(resourceName: string, id: number, body: T): Observable<HttpResponse<T>> {
    return this.http.patch<T>(this.restUrl + resourceName + '/' + id, body, { observe: 'response' });
  }

  postFormDataResponse(resourceName: string, formData: FormData): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', undefined);
    headers.append('Accept', 'application/json');

    return this.http.post(this.restUrl + resourceName, formData, {headers, observe: 'response'});
  }
}
