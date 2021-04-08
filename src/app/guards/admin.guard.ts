import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let mail: string | null = this.localStorageService.get<string>('userMail');
    return this.authService.isAuthorized(mail, ['admin']).pipe(
      map((response) => {
        console.log(response);
        return response.success;
      }),
      catchError(() => {
        this.router.navigate(['']);
        this.toastrService.info(
          'Gitmek istediğiniz sayfaya erişebilmek için yönetici olmalısınız'
        );
        return of(false);
      })
    );
  }
}
