import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {

  /*
   A. The Interceptor will write code (1.) after the request has been created, but before is was sent, and (2.) right before the response is
   subscribed to.
   B. The 'next' parameter is a function that closes the Interceptor, and forwards the request.
  */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Extra logic can be executed here: e.g. filtering for URL, content-type etc.
    // Modify the request by cloning the original, modifying it and sending it in its place.
    const modifiedRequest = req.clone({
      headers: req.headers.append('Auth', 'xyz')
    });

    // A. Without calling the 'handle' function, the request would never been sent.
    return next.handle(modifiedRequest);
  }

}
