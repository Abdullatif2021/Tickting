import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ActivitiesService } from '../services/activities.service';
import { ConfigService } from '../services/config.service';
import { FilterService } from '../services/filter.service';
import { ModalService } from '../services/modal.service';
import { PaginationService } from '../services/pagination.service';
import { TicketStatisticsService } from '../services/ticket-statistics.service';
import { TicketsService } from '../services/tickets.service';
import { UploadService } from '../services/upload.service';
import { UserService } from '../services/user.service';
import { CookieInterceptor } from './interceptors/cookie.interceptor';
import { HttpErrorInterceptor } from './interceptors/http.error.interceptor';
import { ActivityStatisticsService } from '../services/activity-statistics.service';
import { NameInputDialogComponent } from './dialogs/name-input-dialog/name-input-dialog.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  imports: [
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    HttpClient,
    UserService,
    TicketsService,
    UploadService,
    ActivitiesService,
    PaginationService,
    ModalService,
    ConfigService,
    TicketStatisticsService,
    ActivityStatisticsService,
    FilterService,
    NameInputDialogComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CookieInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
  ]
})

export class ProviderModule { }
