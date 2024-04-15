import { Routes } from '@angular/router';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component'
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'carrinho',
    component: CarrinhoComponent,
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
