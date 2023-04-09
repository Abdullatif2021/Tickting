import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MeterComponent } from './components/meter/meter.component';
import { StatusComponent } from './components/status/status.component';
import { UserBadgeComponent } from './components/user-badge/user-badge.component';
import { SubstrNamePipe } from './pipes/substr-name.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from './_modal/modal.component';
import { NameInputDialogComponent } from './dialogs/name-input-dialog/name-input-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BaseDetailsComponentComponent } from './components/base-details-component/base-details-component.component';
import { StringFilterByPipe } from './pipes/string-filter.pipe';
import { MatSelectModule } from '@angular/material/select';
import { CommentComponent } from '../core/components/comment/comment.component';
import { NotAutComponent } from './components/not-aut/not-aut.component';
import { TimeTrackerComponent } from './components/time-tracker/time-tracker.component';
import { AssignUsersComponent } from '../core/components/assign-users/assign-users.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import { AlertDialogComponent } from './dialogs/alert-dialog/alert-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DataFilterPipe } from './pipes/data-filter.pipe';

@NgModule({
  declarations: [
    MeterComponent,
    StatusComponent,
    UserBadgeComponent,
    SubstrNamePipe,
    DataFilterPipe,
    StringFilterByPipe,
    PaginationComponent,
    ModalComponent,
    NameInputDialogComponent,
    AlertDialogComponent,
    BaseDetailsComponentComponent,
    CommentComponent,
    NotAutComponent,
    TimeTrackerComponent,
    NotAutComponent,
    AssignUsersComponent,
    LoaderComponent,
    DataFilterPipe
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    TranslateModule,
    FontAwesomeModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSelectModule,
    FormsModule
  ],
  exports: [
    MeterComponent,
    StatusComponent,
    UserBadgeComponent,
    PaginationComponent,
    SubstrNamePipe,
    DataFilterPipe,
    ModalComponent,
    TimeTrackerComponent,
    BaseDetailsComponentComponent,
    LoaderComponent
  ],
  providers: [
    BaseDetailsComponentComponent,
    ModalComponent,
    SubstrNamePipe,
    DatePipe
  ]
})

export class SharedModule { }
