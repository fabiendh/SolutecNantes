export enum ServiceConfigurationKey {
  ServiceEndPoint = 'serviceEndPoint',
  ServiceModelName = 'serviceModelName'
}

export function ServiceConfiguration(config: ServiceConfigurationItem[]) {
  return function (target) {
    config.forEach(c => {
      Object.defineProperty( target.prototype, c.key, { value: () => c.value } );
      console.log('Decorator defined: ' + c.key + ':' + c.value);
    });
  };
}

export function GetServiceConfiguration<T>(type: new () => T, key: ServiceConfigurationKey): string {
  const obj = new type();
  return obj[key]();
}

export class ServiceConfigurationItem {
  key: ServiceConfigurationKey;
  value: any;
}
