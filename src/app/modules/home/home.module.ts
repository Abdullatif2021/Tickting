import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { TicketsComponent } from './components/tickets/tickets.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { MatButtonModule } from '@angular/material/button';
import { CreateTicketComponent } from './components/tickets/components/create-ticket/create-ticket.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { FilePickerModule } from 'ngx-awesome-uploader';
import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import {NameInputDialogComponent} from '../../shared/dialogs/name-input-dialog/name-input-dialog.component';
import {SharedModule} from '../../shared/shared.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CreateActivityComponent } from './components/activities/create-activity/create-activity.component';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import {PermissionGuard} from '../../shared/guard/permission-guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
/**
 * Custom angular notifier options
 */
 const customNotifierOptions: NotifierOptions = {
	position: {
		horizontal: {
			position: 'right',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 12,
			gap: 10
		}
	},
	theme: 'material',
	behaviour: {
		autoHide: 5000,
		onClick: false,
		onMouseover: 'pauseAutoHide',
		showDismissButton: true,
		stacking: 4
	},
	animations: {
		enabled: true,
		show: {
			preset: 'slide',
			speed: 300,
			easing: 'ease'
		},
		hide: {
			preset: 'fade',
			speed: 300,
			easing: 'ease',
			offset: 50
		},
		shift: {
			speed: 300,
			easing: 'ease'
		},
		overlap: 150
	}
};
@NgModule({
  declarations: [
    TicketsComponent,
    ActivitiesComponent,
    CreateTicketComponent,
    CreateActivityComponent,
    DashboardComponent
  ],
  imports: [
    TranslateModule,
    NotifierModule.withConfig(customNotifierOptions),
    NgbProgressbarModule,
    FilePickerModule,
    MatDatepickerModule,
    FontAwesomeModule,
    MatNativeDateModule,
    MatRippleModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    HttpClientModule,
    MatIconModule,
    HomeRoutingModule,
    CoreModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NgxEditorModule,
    FormsModule,
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        blockquote: 'Blockquote',
        underline: 'Underline',
        strike: 'Strike',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',

        // popups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
      },
    }),
    SharedModule,
    MatPaginatorModule,
  ],
  providers: [
    NameInputDialogComponent,
    PermissionGuard
  ]
})

export class HomeModule { }
