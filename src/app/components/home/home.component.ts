import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  newReleases: any[] = [];
  loading: boolean;
  error: boolean = false;
  messageError: string = '';


  constructor(private spotify: SpotifyService) {
    this.loading = true;
    this.spotify.getNewReleases().pipe(
      tap(data => {
        this.newReleases = data;
        this.loading = false;
      }),
      catchError(err => {
        this.error = true;
        this.loading = false;
        this.messageError = err.error.error.message;
        return of([]);
      })
    ).subscribe();

}
}
