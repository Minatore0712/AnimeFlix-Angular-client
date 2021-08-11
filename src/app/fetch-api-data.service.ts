import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://anime-flix-db.herokuapp.com/';

abstract class FetchServiceBase {
  public handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later');
  }

  // non-typed response extraction
  public extractResponseData(res: Response | {}): any {
    const body = res;
    return body || {};
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService extends FetchServiceBase {
  /**
   *
   * @param http
   * @param router
   */
  constructor(private http: HttpClient) {
    super();
  }

  /**
   * API call to register new user account
   * @param userDetails
   * @returns
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }
}

/**
 * API call to user login endpoint
 * @param userDetails - login details for existing user
 */

// login endpoint
@Injectable({
  providedIn: 'root',
})
export class UserLoginService extends FetchServiceBase {
  constructor(private http: HttpClient) {
    super();
  }

  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }
}

/**
 * API call to fetch user account details
 * @param user - userID
 */
// get user endpoint
@Injectable({
  providedIn: 'root',
})
export class GetUserService extends FetchServiceBase {
  constructor(private http: HttpClient) {
    super();
  }

  public getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .get(`${apiUrl}users/${user}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

/**
 * API call to update user details
 * @param userDetails
 */
// edit user
@Injectable({
  providedIn: 'root',
})
export class EditUserService extends FetchServiceBase {
  constructor(private http: HttpClient) {
    super();
  }

  public editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .put(`${apiUrl}users/${user}`, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

//add fav movie
@Injectable({
  providedIn: 'root',
})
export class AddFavouriteMovieService extends FetchServiceBase {
  constructor(private http: HttpClient) {
    super();
  }

  public addFavouriteMovie(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .post(`${apiUrl}users/${user}/movies/${id}`, id, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

// delete fav movie
@Injectable({
  providedIn: 'root',
})
export class DeleteFavouriteMovieService extends FetchServiceBase {
  constructor(private http: HttpClient) {
    super();
  }

  public deleteFavouriteMovie(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(`${apiUrl}users/${user}/movies/${id}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

// delete user
@Injectable({
  providedIn: 'root',
})
export class DeleteUserService extends FetchServiceBase {
  constructor(private http: HttpClient) {
    super();
  }

  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(`${apiUrl}users/${user}/delete`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
        responseType: 'text',
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

// get all movies
@Injectable({
  providedIn: 'root',
})
export class GetAllMoviesService extends FetchServiceBase {
  constructor(private http: HttpClient) {
    super();
  }

  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

// gets single movie data by title
@Injectable({
  providedIn: 'root',
})
export class GetMovieService extends FetchServiceBase {
  constructor(private http: HttpClient) {
    super();
  }

  public getMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/:Title', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

// get director
@Injectable({
  providedIn: 'root',
})
export class GetDirectorsService extends FetchServiceBase {
  constructor(private http: HttpClient) {
    super();
  }

  public getDirectors(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/director/:name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

// get genre data
@Injectable({
  providedIn: 'root',
})
export class GetGenreService extends FetchServiceBase {
  constructor(private http: HttpClient) {
    super();
  }

  public getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genres/:name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}
