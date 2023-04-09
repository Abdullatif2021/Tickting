import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserNavComponent } from './components/user-nav/user-nav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { TableComponent } from './components/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { SearchPanelComponent } from './components/search-panel/search-panel.component';
import { TicketsSidebarComponent } from './components/tickets-sidebar/tickets-sidebar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { MatBadgeModule } from '@angular/material/badge';
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from '@angular/material/input';
import { NgxEditorModule, schema } from 'ngx-editor';
import { TicketDetailsComponent } from './components/ticket-details/ticket-details.component';
import { ActivityDetailsComponent } from './components/activity-details/activity-details.component';
import { SubActivityComponent } from './components/sub-activity/sub-activity.component';
import { LevelListComponent } from './components/level-list/level-list.component';
import { AssignListComponent } from './components/assign-list/assign-list.component';
import { AcceptTicketComponent } from './components/accept-ticket/accept-ticket.component';
import { MatButtonModule } from '@angular/material/button';
import { SidebarListComponent } from './components/sidebar-list/sidebar-list.component';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ActivitiesSidebarComponent } from './components/activities-sidebar/activities-sidebar.component';
import { FilePickerModule } from 'ngx-awesome-uploader';
import { FoldersComponent } from './components/folders/folders.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { RouterModule } from '@angular/router';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MomentModule } from 'ngx-moment';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    UserNavComponent,
    TableComponent,
    SearchPanelComponent,
    TicketsSidebarComponent,
    // CommentComponent,
    TicketDetailsComponent,
    ActivityDetailsComponent,
    SubActivityComponent,
    LevelListComponent,
    AssignListComponent,
    AcceptTicketComponent,
    SidebarListComponent,
    ActivitiesSidebarComponent,
    FoldersComponent,
    DropDownComponent,
  ],
  imports: [
    CommonModule,
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        'm': 59
      }
    }),
    FontAwesomeModule,
    MatRadioModule,
    FilePickerModule,
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
    MatIconModule,
    MatButtonModule,
    MatTreeModule,
    ReactiveFormsModule,
    NgbModule,
    MatInputModule,
    NgbCollapseModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule,
    MatSortModule,
    MatBadgeModule,
    FormsModule,
    TranslateModule,
    SharedModule,
    MatDialogModule,
    MatProgressBarModule,
    RouterModule,
    MatAutocompleteModule,
    NgxMatSelectSearchModule,
    MatExpansionModule,
    MatMenuModule
  ],
  exports: [
    UserNavComponent,
    // CommentComponent,
    TableComponent,
    TicketsSidebarComponent,
    SearchPanelComponent,
    LevelListComponent,
    SidebarListComponent,
    AssignListComponent,
    AcceptTicketComponent,
    ActivitiesSidebarComponent,
    FoldersComponent,
    MatProgressBarModule,
  ]
})

export class CoreModule {
  constructor(library: FaIconLibrary) {
    // Add multiple icons to the library
    library.addIcons(farBell, farBell);
  }
}

