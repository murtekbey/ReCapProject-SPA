import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserForRegisterDto } from 'src/app/models/dtos/userForRegisterDto';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      companyName: ['', Validators.required]
    });
  }

  register() {
    if (this.registerForm.valid) {
      let registerModel: UserForRegisterDto = Object.assign(
        {},
        this.registerForm.value
      );
      this.authService.register(registerModel).subscribe(
        (response) => {
          this.localStorageService.set('tokenModel', response.data);
          this.localStorageService.set(
            'userMail',
            this.registerForm.get('email')?.value
          );
          this.getUserDetailByEmail(this.registerForm.get('email')?.value);
          this.toastrService.info(
            'Anasayfaya yönlendiriliyorsunuz.',
            'Kayıt başarılı'
          );
          setTimeout(() => {
            this.router.navigate(['']);
          }, 1000);
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Tüm alanları doldurmak zorunludur', 'Uyarı');
    }
  }

  getUserDetailByEmail(mail: string) {
    this.userService.getUserDetailByEmail(mail).subscribe((response) => {
      this.authService.setUserDetail(response.data);
    });
  }
}
