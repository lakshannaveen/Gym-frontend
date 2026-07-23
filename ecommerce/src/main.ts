import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { BACKEND_URL } from './app/shared/config/backend-url';

export { BACKEND_URL };

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
