import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {UserService} from '../../../services/user.service';
import {EPermission} from '../../../config/permissions-enum';
import { Config } from 'src/app/config/constants';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})

export class UserNavComponent implements OnInit {

  user: any;
  canViewActivities: boolean;
  constructor(public translate: TranslateService, private userService: UserService) {
    translate.use('it');
    this.canViewActivities = this.userService.currentUserCan([EPermission.VIEW_ACTIVITIES_PERMISSION]);
  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    console.log('user nav')
  }

  logout() {
    this.userService.logoutUser().subscribe(response => {
      if (response.success) {
        this.userService.flushUserInfo();
        window.location.href = Config.LOGIN_URL;//redirect to integra after logout
      }
    });
  }

}
