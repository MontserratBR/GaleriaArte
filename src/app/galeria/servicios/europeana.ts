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
  private famosos = ['Van Gogh','Rembrandt'];
  private currentStart = 1;

  getArtworks(termino?: string, cargarMas: boolean = false): Observable<any[]> {
    if (!cargarMas) {
      this.currentStart = 1;
    }

    const query = termino || this.famosos[Math.floor(Math.random() * this.famosos.length)];
    const filtros = '&qf=TYPE:IMAGE&qf=proxy_dc_description:*&reusability=open';
    const url = `${environment.europeanaUrl}?query=${query}${filtros}&rows=20&start=${this.currentStart}&wskey=${environment.apiKey}`;
    return this.http.get<EuropeanaResponse>(url).pipe(
      map(res => {
        if (!res.items || res.items.length === 0) {
          console.warn('La API no devolvió resultados para:', query);
          return [];
        }
        
        this.currentStart += 20;
        return res.items;
      })
    );
  }
}
