import { ServiceConfigurationKey, ServiceConfiguration } from '../../services/decorators/service-configuration.decorator.ts';
import { IdentifiedObjectModel } from './identified-object-model';

@ServiceConfiguration([
    { key: ServiceConfigurationKey.ServiceEndPoint, value: 'stat' },
    { key: ServiceConfigurationKey.ServiceModelName, value: 'stat' }
  ])
export class Stat extends IdentifiedObjectModel {
    public dateStat: Date;
    public loginAui: String;
    public site: String;
    public siteId: String;
    public httpRequestHeaders: String;
    public httpRequestUrl: String;
    public httpRequestMethod: String;
    public httpRequestBody: String;
    public statut: boolean;
    public httpResponseCode: String;
    public httpResponseBody: String;
}
