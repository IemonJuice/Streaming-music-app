import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {CookieService} from "ngx-cookie-service";

export const authGuard: CanActivateFn = async (route, state) => {
  const token = inject(CookieService).get('token');
  const router = inject(Router);
  if(token === ''){
    await router.navigateByUrl('/auth')
    return false
  }
    return true;
};
