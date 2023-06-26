import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginService } from '@app/services/user-login/user-login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isLoggedIn = false;

  constructor(
    private router: Router,
    private userLoginService: UserLoginService
  ) {
    this.userLoginService.getUserLoginStatus().subscribe((isUserLogin) => {
      this.isLoggedIn = isUserLogin;
    });
  }

  public ngOnInit(): void {
    this.isUserLoggedIn();
  }

  private isUserLoggedIn(): void {
    const token = localStorage.getItem('user');
    if (!token) {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
    }
  }

  logoutUser() {
    localStorage.clear();
    this.userLoginService.setUserLoginStatus(false);
    this.router.navigate(['']);
  }

  public get authenticated(): boolean {
    return this.isLoggedIn;
  }
}
