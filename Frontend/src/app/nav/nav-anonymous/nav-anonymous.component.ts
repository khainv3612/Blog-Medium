import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-nav-anonymous',
  templateUrl: './nav-anonymous.component.html',
  styleUrls: ['./nav-anonymous.component.css']
})
export class NavAnonymousComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
