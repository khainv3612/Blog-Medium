import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-nav-user',
  templateUrl: './nav-user.component.html',
  styleUrls: ['./nav-user.component.css']
})
export class NavUserComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
