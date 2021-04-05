import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UserDetailDto } from 'src/app/models/dtos/userDetailDto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  userDetailDto$: Observable<UserDetailDto | undefined> = this.authService
    .userDetailDto$;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
    this.toastrService.info('Çıkış yaptınız');
    setTimeout(() => {
      this.router.navigate(['']);
    }, 1000);
  }
}
