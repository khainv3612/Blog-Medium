import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.css']
})
export class NavAdminComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }


}
