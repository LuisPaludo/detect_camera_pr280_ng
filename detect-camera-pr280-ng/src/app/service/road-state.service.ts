import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { RoadState } from '../domain/road-state';

@Injectable({
    providedIn: 'root'
})
export class RoadStateService {


    private baseUrl = 'https://3eeb-143-255-103-33.ngrok-free.app/'
    private dataURL: string = `${this.baseUrl}/api/road-state/latest`

    constructor(
        private http: HttpClient
    ) {
    }


    getLatestRoadState(): Observable<RoadState> {
        const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true').set('Access-Control-Allow-Origin', 'true');
        return this.http.get<RoadState>(this.dataURL, {headers: headers})
            .pipe(
                catchError(
                    error => {
                        console.error('Error fetching road state data:', error);
                        return throwError(() => new Error('Failed to load road state data. Please try again later.'));
                    }
                )
            );
    }
}
