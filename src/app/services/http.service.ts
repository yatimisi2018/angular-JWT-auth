import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  serverURL = environment.serverURL;

  constructor(private httpClient: HttpClient) { }

  get<T>(url: string, options?: object): Observable<T> {
    return this.httpClient.get<T>(this.serverURL + url, options);
  }

  post<T>(url: string, data: any, options?: object): Observable<T> {
    return this.httpClient.post<T>(this.serverURL + url, data, options);
  }

  put<T>(url: string, data: any, options?: object): Observable<T> {
    return this.httpClient.put<T>(this.serverURL + url, data, options);
  }

  patch<T>(url: string, data: any, options?: object): Observable<T> {
    return this.httpClient.patch<T>(this.serverURL + url, data, options);
  }

  delete<T>(url: string, options?: object): Observable<T> {
    return this.httpClient.delete<T>(this.serverURL + url, options);
  }
}
