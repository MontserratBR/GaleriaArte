import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ArtworkCard } from './galeria/componentes/artwork-card/artwork-card';
import { Galeria } from "./galeria/paginas/galeria/galeria";
import { MenuPrincipal } from './layout/menu-principal/menu-principal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ArtworkCard, Galeria, MenuPrincipal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('GaleriaDeArte');
}
