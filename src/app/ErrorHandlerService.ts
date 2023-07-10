import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { MyMonitoringService } from './log/logging.service';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {

    constructor(private injector: Injector) {
       // super();
              console.log("ErrorHandlerService is Constructor");
    }

     handleError(error: Error): void    {
        this.injector.get < MyMonitoringService > (MyMonitoringService).logException(error);  
        console.log(error); 
        console.log("myMonitoringService is null");
    }
}