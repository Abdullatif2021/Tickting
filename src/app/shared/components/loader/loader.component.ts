import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})

export class LoaderComponent implements OnInit { 

  @Input() show:boolean = true;

  constructor() { }

  ngOnInit(): void {}

}
