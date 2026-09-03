import { HttpInterceptorFn } from '@angular/common/http';

// Agrega el token guardado por AuthService a cada petición hacia la API
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return next(req);
  }
  const cloned = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });
  return next(cloned);
};
