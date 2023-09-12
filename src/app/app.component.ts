import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, InteractionStatus, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { Observable } from 'rxjs';
import { MyMonitoringService } from './log/logging.service';
import { ErrorHandlerService } from './ErrorHandlerService';
import { Exception, IExceptionTelemetry } from '@microsoft/applicationinsights-web';
const API_ENDPOINT = "/api/WeatherForecast";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  
  showResponse:boolean =false;
  responseTxt:string='';
  responseOk:boolean =false;

 
  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService ,private _http: HttpClient,
    private myMonitoringService: MyMonitoringService
  ) {

    console.log("MSAL_GUARD_CONFIG #############################");
  }

  
  ngOnInit(): void {
   console.log("oninit called");
  }
  title = 'DemoWebAPI';

   OnShowMessage(): void
  {

    console .log ("show message");

      /*  console .log ("auth req",this.msalGuardConfig.authRequest)
        this.authService.loginPopup()
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
          console .log ("auth message");/*/
         
          this._http.get(API_ENDPOINT,{
            responseType:'text',
         headers: new HttpHeaders({ 'access-control-allow-origin': "*",
                 'Access-Control-Allow-Methods': '*'}
         )
          }).subscribe(response => { this.responseTxt = response});

          console.log("result",this.responseTxt);
         this.myMonitoringService.logTrace("This is Azure Tracing ");
        
        
          
        
    }
}




