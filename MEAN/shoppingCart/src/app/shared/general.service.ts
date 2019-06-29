import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";

import { catchError } from "rxjs/operators";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class GeneralService {
  constructor(private http: HttpClient) {}

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string): Observable<any> {
    return this.http
      .get(`${environment.api_url}${path}`)
      .pipe(catchError(this.formatErrors));
  }
  post(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post(`${environment.api_url}${path}`, body,{
        headers: new HttpHeaders({
          "content-Type": "application/json"
        })
      })
      .pipe(catchError(this.formatErrors));
  }
  delete(path: string): Observable<any> {
    return this.http
      .delete(`${environment.api_url}${path}`)
      .pipe(catchError(this.formatErrors));
  }
}
