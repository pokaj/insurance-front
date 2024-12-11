import {HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";
import {NotificationService} from "../services/notification/notification.service";
import {catchError} from "rxjs/operators";
import {Injectable} from "@angular/core";

@Injectable()
export class HttpInterceptor implements HttpInterceptor {
  constructor(
    private spinner: NgxSpinnerService,
    private notificationService: NotificationService,
  ) { }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      // @ts-ignore
      catchError(errorData => {
        console.log(errorData)
        if (errorData.status != 200 || errorData.status != 201 || errorData.status != 202 || errorData.stat != 401) {
          this.spinner.hide()
          return this.notificationService.showNotification({
            status: 'error',
            title: 'Error',
            text: errorData.error.message,
            autoclose: false
          })
        }
      })
    )
  }
}
