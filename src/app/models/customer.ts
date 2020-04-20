import { Command } from './command';
import {ServiceConfiguration, ServiceConfigurationKey} from '../services/decorators/service-configuration.decorator.ts';
import {IdentifiedObjectModel} from './technical/identified-object-model';

@ServiceConfiguration([
  { key: ServiceConfigurationKey.ServiceEndPoint, value: 'customer' },
  { key: ServiceConfigurationKey.ServiceModelName, value: 'customer' }
])
export class Customer  extends IdentifiedObjectModel {
  lastName: string;
  firstName: string;
  email: string;
  telephone: string;
  creationDate: Date;

  commands: Command[];

  constructor() {
    super();
    this.commands = new Array<Command>();
  }
}
