import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from 'src/app/config/constants';
import { CookieService } from 'ngx-cookie-service';

@Injectable()

export class CookieInterceptor implements HttpInterceptor {

    constructor(private cookieService: CookieService) { }
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const cookies = this.cookieService.getAll() ? this.cookieService.getAll() : window.sessionStorage
        const PHPSESSID = cookies.PHPSESSID ? cookies.PHPSESSID : { PHPSESSID: null }
        const session = Config.development ? PHPSESSID : { PHPSESSID: Config.temp_PHPSESSID };
        if (session) {
            console.log('PHPSESSID', session);
            request = request.clone({
                withCredentials: true,
                // setHeaders: {
                //     Authorization: `${session}`,
                // }
            });
        }
        return next.handle(request);
    }
}
