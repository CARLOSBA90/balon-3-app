import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CardComponent } from './pages/card/card.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'p/:page', component: HomeComponent },
  { path: 'c/:id', component: CardComponent },
  { path: '**', pathMatch: 'full', redirectTo:'' }
];
