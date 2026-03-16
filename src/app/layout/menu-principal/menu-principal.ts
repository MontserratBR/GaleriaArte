import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Favoritos } from '../../favoritos/servicios/favoritos';

@Component({
  selector: 'app-menu-principal',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu-principal.html',
  styleUrl: './menu-principal.css',
})
export class MenuPrincipal {
  public favService = inject(Favoritos);


}
