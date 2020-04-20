import { Customer } from './customer';
import { Article } from './article';
import {ServiceConfiguration, ServiceConfigurationKey} from '../services/decorators/service-configuration.decorator.ts';
import {IdentifiedObjectModel} from './technical/identified-object-model';

@ServiceConfiguration([
  { key: ServiceConfigurationKey.ServiceEndPoint, value: 'command' },
  { key: ServiceConfigurationKey.ServiceModelName, value: 'command' }
])
export class Command extends IdentifiedObjectModel {
    purchaseDate: Date;

    article: Article;
    customer: Customer;
  }

