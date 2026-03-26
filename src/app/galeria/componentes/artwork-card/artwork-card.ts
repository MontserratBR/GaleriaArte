import { Component, Input,inject} from '@angular/core';
import { Favoritos } from '../../../favoritos/servicios/favoritos';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-artwork-card',
  imports: [CommonModule],
  templateUrl: './artwork-card.html',
  styleUrl: './artwork-card.css',
})
export class ArtworkCard {
 @Input({ required: true }) artwork: any;
 private favService = inject(Favoritos);
 private router = inject(Router);
 verMasInfo() {
  this.router.navigate(['/detalle-obra'], {
    state: { dataObra: this.artwork }
  });
  }

 esFav(){
  return this.favService.esFavorito(this.artwork.id);

 }
 toggleFav(){
  this.favService.actualizarFavorito(this.artwork);
 }

}
