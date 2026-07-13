import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // 👈 L'import manquant est ici
import { routes } from './app.routes';
import { interceptInterceptor } from './core/interceptors/intercept-interceptor'; // 👈 Ton intercepteur personnalisé

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([interceptInterceptor]))
  ]
};