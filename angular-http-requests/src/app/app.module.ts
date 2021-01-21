import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AuthInterceptorService} from './auth-interceptor.service';
import {LoggingInterceptorService} from './logging-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  // For HTTP requests 'HttpClientModule' has to be added to imports
  imports: [BrowserModule, FormsModule, HttpClientModule],
  // Register a service (or multiple services) under a different identifier. They execute in order!!!.
  providers: [
    {
      // 'provide' is the token by which the injection can be identified by Angular.
      provide: HTTP_INTERCEPTORS,
      // 'useClass' determines which classes are going to use the injected Interceptor.
      useClass: AuthInterceptorService,
      // In case of multiple interceptors 'multi' value should set to 'true'.
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
