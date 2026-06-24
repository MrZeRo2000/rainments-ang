import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

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
    // Material date adapter — wired now (Phase 0), first consumed by the
    // reports-master date range picker in Phase 4. Native adapter keeps the
    // existing `Date` objects; DD.MM.YYYY display format is configured in Phase 4.
    provideNativeDateAdapter(),
    // Match the reference project (violetnote-ang): outlined form fields app-wide.
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
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
