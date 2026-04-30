import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { todoReducer } from './features/todo/reducers/todo.reducer';
import { TodoEffect } from './features/todo/effects/todo-effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({todoList:todoReducer}),
    provideEffects([TodoEffect]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
