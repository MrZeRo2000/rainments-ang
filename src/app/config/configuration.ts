import {InjectionToken} from '@angular/core';
import {environment} from '../../environments/environment';

export class Configuration {
}

export const RestUrl = new InjectionToken<string>('rest-url');
export const RestUrlEnv = {provide: RestUrl, useValue: environment.restUrl}
