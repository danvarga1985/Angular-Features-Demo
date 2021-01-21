import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from '@angular/common/http';
import {Post} from './post.model';
import {catchError, map, tap} from 'rxjs/operators';
import {Subject, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  error$ = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title, content};
    this.http
      // Setting the response-type here makes the subscription be aware of it.
      .post<{ name: string }>(
        /*
         '/posts.json' at the end of the URL is a firebase requirement, not Angular- or REST-. It can also be anything, not just 'posts'.
         Two post-request is going to be sent:
          A. Request method: OPTIONS - checks if POST is allowed (then if status is 200 ->);
          B. Request method: POST - actual request.
        */
        'https://angular-test-backend-eabce.firebaseio.com/posts.json',
        // 'postData' will be formatted to JSON by Angular.
        postData,
        {
          /*
           'observe' determines what will be int the response. Options are:
           A. 'response': contains the whole response.
           B. 'body': only contains the response-body.
           C. 'events': contains the http status-events (numeric codes).
          */
          observe: 'response'
        }
      )
      /*
       Http-requests are wrapped as Observables, so it's necessary to subscribe to them in order to access the response.
       Unsubscribing is not necessary - it is handled by Angular.
      */
      .subscribe(responseData => {
        console.log(responseData);
        // Subject-based error-handling.
      }, error => {
        this.error$.next(error.message);
      });

  }

  fetchPosts() {
    // In case of multiple params.
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');

    return this.http
      // Set the response-type in the Http-verb.
      .get<{ [key: string]: Post }>(
        'https://angular-test-backend-eabce.firebaseio.com/posts.json',
        {
          // Adding header(s) and param(s) to the request.
          headers: new HttpHeaders({'Custom-Header': 'Hello'}),
          // Changes the format the host returns the data.
          params: searchParams,
          /*
           In case of one param:
           params: new HttpParams().set('print', 'pretty')
          */
          // The default responseType is already 'json'.
          responseType: 'json'
        },
      )
      /*
       A. The response-type can be set in the map function, so that the Subscription will know about it - NO EXAMPLE. (More efficient is
       to set it in the Http-verb...
       B. With the 'map' pipe the response-data can be mapped to an array.
      */
      .pipe(
        map(responseData => {
          // The map function will return an array.
          const postArray: Post[] = [];
          for (const key in responseData) {
            // Only add data to the array if object has the 'key' property - not adding 'Prototype'.
            if (responseData.hasOwnProperty(key)) {
              /*
               A. The '...' spread operator will pull out all the key-value pairs of the nested object.
               B. Save the 'key' property as 'is' so that it can be used in other requests.
              */
              postArray.push({...responseData[key], id: key});
            }
          }
          // Returning the array makes it accessible for the subscribe function.
          return postArray;
        }),
        catchError(errorRes => {
          // Send to analytics server, log etc. ... (other generic error-handling practices) - Optional!
          return throwError(errorRes);
        }));
  }

  deletePosts() {
    return this.http
      .delete(
        'https://angular-test-backend-eabce.firebaseio.com/posts.json',
        {
          observe: 'events',
          // Content negotiation.
          responseType: 'json'
        }
      ).pipe(
        // 'tap' is analogous to 'forEach' - performs side-effects for each emission on the Observable, but does not modify it.
        tap(event => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            // Let the user know that the request was sent, and the app is waiting for a response...
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
