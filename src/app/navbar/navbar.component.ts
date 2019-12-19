import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/security/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAuthenticated$ = this.auth.isAuthenticated$;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }
}
