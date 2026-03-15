import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-artwork-card',
  imports: [],
  templateUrl: './artwork-card.html',
  styleUrl: './artwork-card.css',
})
export class ArtworkCard {
 @Input({ required: true }) artwork: any;
}
