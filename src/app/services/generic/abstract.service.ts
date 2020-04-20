
import {throwError as observableThrowError,  Observable } from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {GetServiceConfiguration, ServiceConfigurationKey} from '../decorators/service-configuration.decorator.ts';
import {Inject, Injectable} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {IdentifiedObjectModel} from '../../models/technical/identified-object-model';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';

@Injectable()
export class AbstractService<T extends IdentifiedObjectModel> {

  protected SERVICE_URL: string = environment.uri_back + this.baseHref + (this.baseHref.endsWith('/') ? '' : '/') + environment.basePath;

  constructor(protected httpClient: HttpClient, @Inject(APP_BASE_HREF) protected baseHref: string) {
  }

  protected getAllGeneric(type?: new () => T): Observable<T[]> {
    return this.httpClient
      .get<T[]>(this.SERVICE_URL + GetServiceConfiguration<T>(type, ServiceConfigurationKey.ServiceEndPoint) + '/');
  }

  protected getGeneric(type: new () => T, id: any): Observable<T> {
    return this.httpClient
      .get<T>(this.SERVICE_URL + GetServiceConfiguration<T>(type, ServiceConfigurationKey.ServiceEndPoint) + '/' + id);
  }

  protected createGeneric(type: new () => T, objet: T): Observable<T> {
    return this.httpClient
      .post<T>(this.SERVICE_URL + GetServiceConfiguration<T>(type, ServiceConfigurationKey.ServiceEndPoint) + '/create/', objet)
      .pipe(catchError(this.errorHandler));
  }

  protected updateGeneric(type: new () => T, objet: T): Observable<T> {
    return this.httpClient
      .post<T>(
        this.SERVICE_URL +
        GetServiceConfiguration<T>(type, ServiceConfigurationKey.ServiceEndPoint) + '/' + objet.id + '/update', objet)
      .pipe(catchError(this.errorHandler));
  }

  protected deleteGeneric(type: new () => T, id: any): Observable<T> {
    return this.httpClient
      .post<T>(
        this.SERVICE_URL +
        GetServiceConfiguration<T>(type, ServiceConfigurationKey.ServiceEndPoint) + '/' + id + '/delete', null)
      .pipe(catchError(this.errorHandler));
  }

  // tslint:disable-next-line:no-shadowed-variable
  protected getlinkedEntityGeneric<T, U>(typeT: new () => T, typeU: new () => U, id: number): Observable<U> {
    return this.httpClient
      .get<U>(
        this.SERVICE_URL
        + GetServiceConfiguration<T>(typeT, ServiceConfigurationKey.ServiceEndPoint)
        + '/' + id + '/'
        + GetServiceConfiguration<U>(typeU, ServiceConfigurationKey.ServiceEndPoint)
        + '/');
  }

  // tslint:disable-next-line:no-shadowed-variable
  protected getlinkedEntitiesGeneric<T, U>(typeT: new () => T, typeU: new () => U, id: number): Observable<U[]> {
    return this.httpClient
      .get<U[]>(
        this.SERVICE_URL
        + GetServiceConfiguration<T>(typeT, ServiceConfigurationKey.ServiceEndPoint)
        + '/' + id + '/'
        + GetServiceConfiguration<U>(typeU, ServiceConfigurationKey.ServiceEndPoint)
        + 's/');
  }

  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error && error.error && error.error.message ? error.error.message : 'Erreur inconnue');
  }
}
