import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { routes } from './app.routes';
import { RestUrlEnv } from './config/configuration';
import { RepositoryModule } from './repository/repository.module';
import { FontAwesomeIconsModule } from './font-awesome-icons/font-awesome-icons.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withHashLocation()),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    RestUrlEnv,
    // ngx-bootstrap 21.x removed forRoot(): its services are providedIn 'root'
    // and its directives are imported per-component, so no module registration
    // is needed here.
    importProvidersFrom(
      RepositoryModule,
      FontAwesomeIconsModule
    )
  ]
};
