
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {catchError} from 'rxjs/operators';
import {Inject, Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Article } from '../models/article';
import { AbstractService } from './generic/abstract.service';
import {APP_BASE_HREF} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DDCService extends AbstractService<Article> {

  constructor(private http: HttpClient, @Inject(APP_BASE_HREF) baseHref: string) {
    super(http, baseHref);
  }

  getAll(): Observable<Article[]> {
    return this.getAllGeneric(Article);
  }

  getById(id): Observable<Article> {
    return this.getGeneric(Article, id);
  }

  create(si: Article): Observable<Article> {
    return this.createGeneric(Article, si);
  }

  delete(si: Article): Observable<Article> {
    return this.deleteGeneric(Article, si.id);
  }

  update(si: Article): Observable<Article> {
    return this.updateGeneric(Article, si);
  }
}
