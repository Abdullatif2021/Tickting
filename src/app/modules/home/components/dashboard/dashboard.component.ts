import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //configs
  size: number = 70;
  border: number = 3;
  show: boolean = true;

  constructor(private configService: ConfigService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getConfig();
  }

  getUser(): void {
    this.userService.getCurrentUser();
  }

  getConfig(): void {
    this.configService.loadConfig().subscribe(
      results => {
        if (results){
          this.getUser();
          this.show = false;
          this.redirectHome();
        }
      }
    );
  }

  redirectHome() {
    this.router.navigate(['/tickets']);
  }

}
