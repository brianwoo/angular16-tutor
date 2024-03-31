import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WishItem } from 'src/shared/models/wishItem';


@Injectable({
  providedIn: 'root'
})
export class WishService {

  constructor(private http: HttpClient) { }

  private getStandardOptions(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }


  getWishes() {
    const options = this.getStandardOptions();

    options.params = new HttpParams({
      // this will add ?format=json to the url
      fromObject: {
        format: 'json'
      }
    });

    return this.http.get('assets/wishes.json', options).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {

    // status === 0 means not a server error
    // it's a client or network error 4XX
    if (error.status === 0) {
      console.error('Issue with the client or network:', error.error);
    }
    else { // server side error 5XX
      console.error('Server-side error:', error.error);
    }

    return throwError(() => new Error('Cannot retrieve wishes from server, try again'));
  }



  addWish(wish: WishItem) {
    const options = this.getStandardOptions();
    options.headers = options.headers.set('Authorization', 'value-needed');

    return this.http.post('xxxx.com/wish', wish, options);
  }
}
