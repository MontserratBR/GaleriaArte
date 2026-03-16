import { Routes } from '@angular/router';
import { Galeria } from './galeria/paginas/galeria/galeria';
import { PaginaFav } from './favoritos/paginas/pagina-fav/pagina-fav';

export const routes: Routes = [
    
    {path:'inicio', component: Galeria},
    {path:'favoritos', component: PaginaFav},
    {path:'**', redirectTo:'inicio'}
];
