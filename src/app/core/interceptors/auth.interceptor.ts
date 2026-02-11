import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationService } from '../../shared/services/navigation.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const navigationService = inject(NavigationService);
  const headers = navigationService.buildHeaders();

  const authReq = req.clone({
    setHeaders: {
      'Accept': '*/*',
      'Authorization': headers.get('Authorization') ?? ''
    }
  });

  return next(authReq);
};