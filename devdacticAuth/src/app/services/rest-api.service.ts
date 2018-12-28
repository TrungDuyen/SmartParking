import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

	url = environment.url;
  	constructor(private http: HttpClient) { }

  	private handleError(error: HttpErrorResponse) {
	  if (error.error instanceof ErrorEvent) {
	    // A client-side or network error occurred. Handle it accordingly.
	    console.error('An error occurred:', error.error.message);
	  } else {
	    // The backend returned an unsuccessful response code.
	    // The response body may contain clues as to what went wrong,
	    console.error(
	      `Backend returned code ${error.status}, ` +
	      `body was: ${error.error}`);
	  }
	  // return an observable with a user-facing error message
	  return throwError('Something bad happened; please try again later.');
	}

	private extractData(res: Response) {
	  let body = res;
	  return body || { };
	}

	getClassSlots(): Observable<any> {
	  	return this.http.get(`${this.url}/api/rooms`).pipe(
	    map(this.extractData),
	    catchError(this.handleError));
	}
	submitSlot(){
		
	}
}
