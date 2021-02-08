import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Activity } from './activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private activitiesUrl = 'api/activities';

  constructor(private http: HttpClient) { }

  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.activitiesUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getMaxActivityId(): Observable<Activity> {
    return this.http.get<Activity[]>(this.activitiesUrl)
    .pipe(
      // Get max value from an array
      map(data => Math.max.apply(Math, data.map(function(o) { return o.id; }))   ),
      catchError(this.handleError)
    );
  }

  getActivityById(id: number): Observable<Activity> {
    const url = `${this.activitiesUrl}/${id}`;
    return this.http.get<Activity>(url)
      .pipe(
        tap(data => console.log('getActivity: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createActivity(activity: Activity): Observable<Activity> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    activity.id = null;
    return this.http.post<Activity>(this.activitiesUrl, activity, { headers: headers })
      .pipe(
        tap(data => console.log('createActivity: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteActivity(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.activitiesUrl}/${id}`;
    return this.http.delete<Activity>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteActivity: ' + id)),
        catchError(this.handleError)
      );
  }

  updateActivity(activity: Activity): Observable<Activity> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.activitiesUrl}/${activity.id}`;
    return this.http.put<Activity>(url, activity, { headers: headers })
      .pipe(
        tap(() => console.log('updateActivity: ' + activity.id)),
        // Return the activity on an update
        map(() => activity),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
