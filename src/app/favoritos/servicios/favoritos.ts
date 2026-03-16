import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { signal } from '@angular/core';
@Injectable({
  providedIn: 'root',
})

export class Favoritos {

  // Signal que contiene la lista actual de favoritos
  private favoritosKey = environment.STORAGE_KEY;
  public favoritos = signal<any[]>(this.obtenerDeStorage());

  private obtenerDeStorage(): any[] {
    const data = localStorage.getItem(this.favoritosKey);
    return data ? JSON.parse(data) : [];
  }

  toggleFavorito(obra: any) {
    const actuales = this.favoritos();
    const existe = actuales.find(fav => fav.id === obra.id);

    let nuevaLista;
    if (existe) {
      // Si existe, lo eliminamos
      nuevaLista = actuales.filter(fav => fav.id !== obra.id);
    } else {
      // Si no existe, lo agregamos
      nuevaLista = [...actuales, obra];
    }

    this.favoritos.set(nuevaLista);
    localStorage.setItem(this.favoritosKey, JSON.stringify(nuevaLista));
  }

  esFavorito(id: string): boolean {
    return this.favoritos().some(fav => fav.id === id);
  }
}
