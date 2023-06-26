import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginService } from '@app/services/user-login/user-login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form!: FormGroup;
  public loginValid = true;
  showErrorMessage: string;

  userLoginServiceSubscription: Subscription;
  private readonly returnUrl: string;

  constructor(
    private userLoginService: UserLoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      accountNumber: ['', Validators.required],
      atmPin: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    this.loginValid = true;

    this.login();
  }

  get f() {
    return this.form.controls;
  }

  login(): void {
    this.userLoginServiceSubscription = this.userLoginService
      .login(this.f.accountNumber.value, this.f.atmPin.value)
      .subscribe({
        next: (userData) => {
          this.router.navigate(['/overview']);
          this.userLoginService.setUserLoginStatus(true);
        },
        error: () => {
          this.showErrorMessage = 'Invalid user';
        },
      });
  }
  public ngOnDestroy(): void {
    if (this.userLoginServiceSubscription) {
      this.userLoginServiceSubscription.unsubscribe();
    }
  }
}
