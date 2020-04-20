import { Injectable, Inject } from '@angular/core';
import { Stat } from '../../models/technical/stat';
import { HttpClient } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { AbstractService } from '../generic/abstract.service';

@Injectable({
  providedIn: 'root'
})
export class StatService extends AbstractService<Stat> {

  constructor(private http: HttpClient, @Inject(APP_BASE_HREF) baseHref: string) {
    super(http, baseHref);
  }

  public logStat( url: string, headers: object, method: string, body: any, status: boolean, returnCode: string, responseBody: any) {
    const stat: Stat = new Stat();

    stat.loginAui = localStorage.getItem('loginAui');
    stat.site = localStorage.getItem('site');
    stat.siteId = localStorage.getItem('siteId');
    stat.httpRequestUrl = url;
    stat.httpRequestHeaders = JSON.stringify(headers);
    stat.httpRequestMethod = method;
    stat.httpRequestBody = JSON.stringify(body);
    stat.statut = status;
    stat.httpResponseCode = returnCode;
    stat.httpResponseBody = JSON.stringify(responseBody).substring(0, 500);

    this.createGeneric(Stat, stat).subscribe();
  }
}
