import {Component, OnInit} from '@angular/core';
import {CurrentUser} from '../security/current-user.service';
import {LoginService} from '../security/login.service';
import {MenuItem} from './menu-item.model';
import {Router} from '@angular/router';

@Component({
  selector: 'cf-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  private loggedIn: boolean;
  menu: MenuItem[] = [
    {label: 'about us', url: '/about'},
    {label: 'partners', url: '/partners'},
    {label: 'FAQ', url: '/faq'},
    // {label: 'schedule', url: '/schedule'},
    {label: 'presentations', url: '/presentations', show: () => this.currentUser.isAdmin()},
    // {label: 'speakers', url: '/speakers'},
    {label: 'profile', action: () => this.goToProfile(), show: () => this.loggedIn},
    {
      label: 'admin', show: () => this.currentUser.isPrivileged(),
      children: [
        {label: 'scanner', url: '/admin/scanner', show: () => this.currentUser.isPrivileged()},
        {label: 'participants', url: '/admin/participants', show: () => this.currentUser.isAdmin()},
        {label: 'manage schedule', url: '/admin/agenda', show: () => this.currentUser.isAdmin()},
        {label: 'users', url: '/admin/users', show: () => this.currentUser.isAdmin()},
      ]
    },
    {label: 'Call 4 Papers', url: '/login', show: () => !this.loggedIn, clazz: 'pink'},
    {label: 'logout', action: () => this.logout(), show: () => this.loggedIn, clazz: 'pink'},
  ];


  constructor(private currentUser: CurrentUser,
              private login: LoginService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loggedIn = this.currentUser.isAvailable();
    this.currentUser
      .onLogin.subscribe(() => this.loggedIn = this.currentUser.isAvailable());
  }

  logout() {
    this.login.logout();
  }

  goToProfile() {
    this.router.navigate([`/profile/${this.currentUser.get().jti}`]);

  }


}
