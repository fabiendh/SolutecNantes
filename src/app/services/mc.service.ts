
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {catchError} from 'rxjs/operators';
import {Inject, Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';
import { AbstractService } from './generic/abstract.service';
import {APP_BASE_HREF} from '@angular/common';
import {GetServiceConfiguration, ServiceConfigurationKey} from './decorators/service-configuration.decorator.ts';

@Injectable()
export class MCService extends AbstractService<Customer> {

  protected SERVICE_URL: string = environment.uri_back + this.baseHref + (this.baseHref.endsWith('/') ? '' : '/') + environment.basePath;

  constructor(private http: HttpClient, @Inject(APP_BASE_HREF) baseHref: string) {
    super(http, baseHref);
  }

  getAll(): Observable<Customer[]> {
    return this.getAllGeneric(Customer);
  }

  getById(id): Observable<Customer> {
    return this.getGeneric(Customer, id);
  }

  create(si: Customer): Observable<Customer> {
    return this.createGeneric(Customer, si);
  }

  delete(si: Customer): Observable<Customer> {
    return this.deleteGeneric(Customer, si.id);
  }

  update(si: Customer): Observable<Customer> {
    return this.updateGeneric(Customer, si);
  }

  command(customerId: number, articleId: number) {
    return this.http
      .post<Customer>(
        this.SERVICE_URL +
        GetServiceConfiguration<Customer>(Customer, ServiceConfigurationKey.ServiceEndPoint) +
        '/' +
        customerId +
        '/command/' +
        articleId,
        {}
      ).pipe(
      catchError(this.errorHandler));
  }
}
