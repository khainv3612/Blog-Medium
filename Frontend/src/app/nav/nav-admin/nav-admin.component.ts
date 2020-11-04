import {Component, OnInit} from '@angular/core';
import {AuthServiceSecu} from '../../auth/auth-service-secu.service';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.css']
})
export class NavAdminComponent implements OnInit {

  constructor(private authService: AuthServiceSecu) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }


}
