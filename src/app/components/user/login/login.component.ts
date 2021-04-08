import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserForLoginDto } from 'src/app/models/dtos/userForLoginDto';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }
    let loginModel: UserForLoginDto = { ...this.loginForm.value };
    this.authService.login(loginModel).subscribe(
      (response) => {
        this.localStorageService.set('tokenModel', response.data);
        this.localStorageService.set(
          'userMail',
          this.loginForm.get('email')?.value
        );
        this.getUserDetailByEmail(this.loginForm.get('email')?.value);
        this.toastrService.info('Giriş Yapıldı', 'Başarılı');
        this.router.navigateByUrl('');
      },
      (errorResponse) => this.toastrService.error(errorResponse.error)
    );
  }
  getUserDetailByEmail(mail: string) {
    this.userService.getUserDetailByEmail(mail).subscribe((response) => {
      this.authService.setUserDetail(response.data);
    });
  }
}
