import { inject,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {EuropeanaResponse} from '../interfaces/resultado-consultas';

@Injectable({
  providedIn: 'root',
})
export class Europeana {
  private http = inject(HttpClient);
  private apiUrl = `${environment.europeanaUrl}&wskey=${environment.apiKey}`;

  getArtworks(): Observable<any[]> {
    return this.http.get<EuropeanaResponse>(this.apiUrl).pipe(
      map(res => res.items) // Extraemos solo el array de items
    );
  }

}
