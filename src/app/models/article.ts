import { Command } from './command';
import {ServiceConfiguration, ServiceConfigurationKey} from '../services/decorators/service-configuration.decorator.ts';
import {IdentifiedObjectModel} from './technical/identified-object-model';

@ServiceConfiguration([
  { key: ServiceConfigurationKey.ServiceEndPoint, value: 'article' },
  { key: ServiceConfigurationKey.ServiceModelName, value: 'article' }
])
export class Article extends IdentifiedObjectModel {
  name: string;
  stock: number;

  commands: Command[];

  constructor() {
    super();
    this.commands = new Array<Command>();
  }
}
