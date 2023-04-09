import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './components/activities/activities.component';
import { CreateTicketComponent } from './components/tickets/components/create-ticket/create-ticket.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { CreateActivityComponent } from './components/activities/create-activity/create-activity.component';
import { PermissionGuard } from '../../shared/guard/permission-guard';
import { EPermission } from '../../config/permissions-enum';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'tickets',
    component: TicketsComponent,
    //   data: {
    //     // permissions: [EPermission.VIEW_TICKETS_PERMISSION]
    //   },
    //   canActivate: [PermissionGuard]
  },
  // Todo: Check permission of this action from back-enf
  {
    path: 'create-ticket',
    component: CreateTicketComponent,
  },
  {
    path: 'create-activity',
    component: CreateActivityComponent,
    data: {
      permissions: [
        EPermission.ADD_ACTIVITY_PERMISSION,
        EPermission.VIEW_ACTIVITIES_PERMISSION
      ],
    },
    canActivate: [PermissionGuard]
  },
  {
    path: 'activities',
    component: ActivitiesComponent,
    data: {
      permissions: [EPermission.VIEW_ACTIVITIES_PERMISSION]
    }
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule { }
