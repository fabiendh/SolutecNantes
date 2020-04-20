import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    // return this.http.get<any>(environment.basePath + 'version');
    // Bypass version pour test
    return of('0.0.1')
  }

}
