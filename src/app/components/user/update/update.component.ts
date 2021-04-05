import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { UserDetailDto } from 'src/app/models/dtos/userDetailDto';
import { UserDetailForUpdate } from 'src/app/models/dtos/userDetailForUpdate';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  userUpdateForm: FormGroup;
  userDetailDto$: Observable<UserDetailDto | undefined> = this.authService
    .userDetailDto$;
  userDetailDto?: UserDetailDto;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUserDetailsFromStore();
  }

  getUserDetailsFromStore() {
    this.authService.userDetailDto$.pipe(first()).subscribe((userDetailDto) => {
      if (!userDetailDto) return;
      this.userDetailDto = userDetailDto;
      this.createAccountFrom();
    });
  }

  createAccountFrom() {
    this.userUpdateForm = this.formBuilder.group({
      firstName: [this.userDetailDto?.firstName, Validators.required],
      lastName: [this.userDetailDto?.lastName, Validators.required],
      companyName: [this.userDetailDto?.companyName, Validators.required],
      currentPassword: ['', Validators.required],
      newPassword: [''],
    });
  }

  updateAccount() {
    if (!this.userUpdateForm.valid) return;

    let userDetailUpdateModel: UserDetailForUpdate = {
      ...this.userDetailDto,
      ...this.userUpdateForm.value,
    };
    this.authService.update(userDetailUpdateModel).subscribe((response) => {
      if (!this.userDetailDto) {
        return null;
      }

      var newUserDetail: UserDetailDto = {
        ...this.userDetailDto,
        firstName: userDetailUpdateModel.firstName,
        lastName: userDetailUpdateModel.lastName,
        companyName: userDetailUpdateModel.companyName,
      };
      this.authService.setUserDetail(newUserDetail);

      this.toastrService.success(response.message);
      this.router.navigate(['']);
    });
  }
}
