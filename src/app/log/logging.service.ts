
import { ApplicationInsights,IExceptionTelemetry,DistributedTracingModes  } from '@microsoft/applicationinsights-web';
import { Injectable } from '@angular/core';
import { environment } from './environment';
import {  filter } from 'rxjs/operators';
import {  
  Router,  
  NavigationEnd  
} from '@angular/router';

@Injectable({  
  providedIn: 'root',  
})
export class MyMonitoringService {
  appInsights: ApplicationInsights;
  constructor() {
    this.appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: environment.appInsights.instrumentationKey,
        enableAutoRouteTracking: true ,// option to log all route changes
        enableCorsCorrelation: true,
       }
    });
    
    this.appInsights.loadAppInsights();
    this.loadCustomTelemetryProperties(); 
     //this.createRouterSubscription(); 
    console.log("this is appinsights");
  }
  setUserId(userId: string) {  
    this.appInsights.setAuthenticatedUserContext(userId);  
   }  
  clearUserId() {  
    this.appInsights.clearAuthenticatedUserContext();  
  }  
  logPageView(name?: string, url?: string) { // option to call manually
    this.appInsights.trackPageView({
      name: name,
      uri: url
    });
  }

  logEvent(name: string, properties?: { [key: string]: any }) {
    this.appInsights.trackEvent({ name: name}, properties);
  }

  logMetric(name: string, average: number, properties?: { [key: string]: any }) {
    this.appInsights.trackMetric({ name: name, average: average }, properties);
  }

  logException(exception: Error, severityLevel?: number) {
    this.appInsights.trackException({ exception: exception, severityLevel: severityLevel });
  }

  logTrace(message: string, properties?: { [key: string]: any }) {
    this.appInsights.trackTrace({ message: message}, properties);
  }
  private loadCustomTelemetryProperties() {  
    this.appInsights.addTelemetryInitializer(envelope => {  
         console.log('app- loadCustomTelemetryProperties');
        envelope.name = 'This item passed through my telemetry initializer';
    });  
  }  
  private createRouterSubscription() {  
    //this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {  
       // this.logPageView('null', event.urlAfterRedirects);  
    //});  
  }  
}