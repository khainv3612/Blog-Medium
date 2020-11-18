import { Component, OnInit } from '@angular/core';
import {AuthServiceSecu} from '../../auth/auth-service-secu.service';

@Component({
  selector: 'app-nav-anonymous',
  templateUrl: './nav-anonymous.component.html',
  styleUrls: ['./nav-anonymous.component.css']
})
export class NavAnonymousComponent implements OnInit {

  constructor(private authService: AuthServiceSecu) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
