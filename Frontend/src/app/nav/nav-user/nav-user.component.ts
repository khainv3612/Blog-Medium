import { Component, OnInit } from '@angular/core';
import {AuthServiceSecu} from '../../auth/auth-service-secu.service';

@Component({
  selector: 'app-nav-user',
  templateUrl: './nav-user.component.html',
  styleUrls: ['./nav-user.component.css']
})
export class NavUserComponent implements OnInit {

  constructor(private authService: AuthServiceSecu) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
