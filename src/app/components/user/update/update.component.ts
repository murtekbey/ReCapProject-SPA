import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UserDetailDto } from 'src/app/models/dtos/userDetailDto';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { UserDetailForUpdate } from 'src/app/models/dtos/userDetailForUpdate';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  userUpdateForm: FormGroup;
  userDetail$: Observable<UserDetailDto | undefined> = this.authService
    .userDetail$;
  userDetail?: UserDetailDto;
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
    this.authService.userDetail$.pipe(first()).subscribe((userDetail) => {
      console.log(userDetail);
      if (!userDetail) return;

      this.userDetail = userDetail;
      this.createAccountFrom();
    });
  }

  createAccountFrom() {
    this.userUpdateForm = this.formBuilder.group({
      firstName: [this.userDetail?.firstName, Validators.required],
      lastName: [this.userDetail?.lastName, Validators.required],
      companyName: [this.userDetail?.companyName, Validators.required],
      currentPassword: ['', Validators.required],
      newPassword: [''],
    });
  }

  updateAccount() {
    if (!this.userUpdateForm.valid) return;

    let userDetailUpdateModel: UserDetailForUpdate = {
      ...this.userDetail,
      ...this.userUpdateForm.value,
    };
    this.authService.update(userDetailUpdateModel).subscribe((response) => {
      if (!this.userDetail) {
        return null;
      }

      var newUserDetail: UserDetailDto = {
        ...this.userDetail,
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
