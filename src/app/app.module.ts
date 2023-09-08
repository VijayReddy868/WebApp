import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MsalModule, MsalService, MsalGuard, MsalInterceptor, MsalBroadcastService, MsalRedirectComponent } from "@azure/msal-angular";
import { PublicClientApplication, InteractionType, BrowserCacheLocation } from "@azure/msal-browser";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandlerService } from './ErrorHandlerService';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MsalModule.forRoot( new PublicClientApplication({ // MSAL Configuration
      auth: {
          clientId: "c389a1b4-e001-457e-b823-4ebf0a123f27",
          authority: "https://login.microsoftonline.com/51f434bc-1d65-40a6-b6e7-cda61d8f24b2/",
           redirectUri: "/",
      },
      cache: {
          cacheLocation : BrowserCacheLocation.LocalStorage,
          storeAuthStateInCookie: true, // set to true for IE 11
      },
      system: {
          loggerOptions: {
              loggerCallback: () => {},
              piiLoggingEnabled: false
          }
      },
      
            
  }), {
      interactionType: InteractionType.Redirect, // MSAL Guard Configuration
  }, {
      interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
      protectedResourceMap: new Map([
          ['https://graph.microsoft.com/v1.0/me', ['user.read']],
          ['https://api.myapplication.com/users/*', ['customscope.read']],
          ['https://jolly-coast-08121020f.3.azurestaticapps.net', ['user.read','profile','openid']] 
      ])
  })
  ,
 
],
  providers: [{ provide: ErrorHandler, useClass: ErrorHandlerService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
