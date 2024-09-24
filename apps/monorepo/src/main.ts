import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';  // Root module of the Angular app
import { environment } from './environments/environment';  // Environment configuration

if (environment.production) {
  enableProdMode();  // Enables production mode if the environment is set to production
}

// Bootstrapping the Angular app with AppModule
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));  // Log any errors that occur during bootstrapping
