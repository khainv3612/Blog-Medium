import {Component, Input, OnInit} from '@angular/core';
import {AuthServiceSecu} from '../../auth/auth-service-secu.service';
import {UserDetailService} from '../../service/UserDetailService';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.css']
})
export class NavAdminComponent implements OnInit {

  @Input()
  avatar: string;

  constructor(private authService: AuthServiceSecu, private userService: UserDetailService) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

  redirectDetailPage() {
    this.userService.redirectDetailPage(sessionStorage.getItem('username'));
  }

  redirectEditProfilePage() {
    this.userService.redirectEditProfilePage(sessionStorage.getItem('username'));
  }


}
