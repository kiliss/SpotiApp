// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class SpotifyService {
//   constructor(private http: HttpClient) {
//     console.log('Spotify service listo');
//   }

//   getQuery(query: string) {
//     const url = `https://api.spotify.com/v1/${query}`;
//     const headers = new HttpHeaders({
//       Authorization:
//         'Bearer BQAttWype08iLxD7djeyIY5h4K0-ICx6pQ1H8MzyUxjhRrxEOXbDRKq2GXPITwvmr2DbRe-S1LnCHnieXeK9UqGto0fKTReyLiejQ6lDlAQYo-Ka9xLE',
//     });
//     return this.http.get(url, { headers });
//   }

//   getNewReleases() {
//     return this.getQuery('browse/new-releases?limit=20').pipe(
//       map((data: any) => data['albums'].items)
//     );
//   }

//   getArtistas(termino: string) {
//     return this.getQuery(`search?q=${termino}&type=artist&limit=20`).pipe(
//       map((data: any) => data['artists'].items)
//     );
//   }
//   getArtista(id: string) {
//     return this.getQuery(`artists/${id}`);
//   }
//   getTopTracks(id: string) {
//     return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(
//       map((data: any) => data['tracks'])
//     );
//   }
// }
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { mergeMap, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private apiKey$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
    console.log('Spotify service listo');
    this.getToken().subscribe();
  }

  getToken(): Observable<string> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set(
        'Authorization',
        'Basic ' +
          btoa(
            '5de30158a5624b4fb69f3e534a5d26f8:d461d87d9b2d4a8cbe089c9cc291c8e3'
          )
      );
    const body = 'grant_type=client_credentials';

    return this.http.post('https://accounts.spotify.com/api/token', body, { headers }).pipe(
      tap((data: any) => {
        const token = data.access_token;
        console.log(token);
        this.apiKey$.next(token);
      }),
      mergeMap(() => this.apiKey$)
    );
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    return this.getToken().pipe(
      mergeMap((apiKey) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${apiKey}`,
        });
        return this.http.get(url, { headers });
      })
    );
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20').pipe(
      tap((data) => console.log(data)),
      map((data: any) => data['albums'].items)
    );
  }

  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=20`).pipe(
      map((data: any) => data['artists'].items)
    );
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(
      map((data: any) => data['tracks'])
    );
  }
}
