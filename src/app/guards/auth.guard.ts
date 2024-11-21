import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  const loggedInUser = localStorage.getItem('token');

  if (loggedInUser !== null) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};

