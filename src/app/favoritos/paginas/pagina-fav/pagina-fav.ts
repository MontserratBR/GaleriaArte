import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Favoritos } from '../../servicios/favoritos';
import { ArtworkCard } from '../../../galeria/componentes/artwork-card/artwork-card';
import { MenuPrincipal } from '../../../layout/menu-principal/menu-principal';


@Component({
  selector: 'app-pagina-fav',
  imports: [ArtworkCard, MenuPrincipal],
  templateUrl: './pagina-fav.html',
  styleUrl: './pagina-fav.css',
})
export class PaginaFav {
  public favService = inject(Favoritos);

}
