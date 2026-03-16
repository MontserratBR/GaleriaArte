import { Component, Input,inject} from '@angular/core';
import { Favoritos } from '../../../favoritos/servicios/favoritos';


@Component({
  selector: 'app-artwork-card',
  imports: [],
  templateUrl: './artwork-card.html',
  styleUrl: './artwork-card.css',
})
export class ArtworkCard {
 @Input({ required: true }) artwork: any;
 private favService = inject(Favoritos);
 esFav(){
  return this.favService.esFavorito(this.artwork.id);

 }
 toggleFav(){
  this.favService.toggleFavorito(this.artwork);
 }

}
