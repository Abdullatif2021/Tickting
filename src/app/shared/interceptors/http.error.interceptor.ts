import {
    HttpEvent, HttpHandler, HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators';
import { Config } from 'src/app/config/constants';
import { UserService } from 'src/app/services/user.service';
import { ConfigService } from 'src/app/services/config.service';
import {NotifierService} from 'angular-notifier';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(
      private router: Router,
    ) {    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log('intreceptor is working')
        // Ignore requests with `ignorehttperrors` header
        if (request.headers.get('ignorehttperrors')) {
            return next.handle(request);
        }

        // Check for errors, and handle them using the error status code
        return next.handle(request).pipe(
            catchError(e => {
                // if the server returned that the token is invalid, logout
                if (e.status === 401) {
                    // this.router.navigate(['/login'], { replaceUrl: true });
                    window.location.href = Config.LOGIN_URL;
                }
                throw e;
            }));

    }

}
