import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarrinhoComponent } from 'app/pages/carrinho/carrinho.component';
import { Carrinho, ItemCarrinho } from 'app/models/carrinho.model';
import { CarrinhoService } from 'app/services/cart.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatBadgeModule, MatMenuModule, RouterModule, CarrinhoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  private _carrinho: Carrinho = { itens: [] };
  quantidadeItems = 0;

  @Input()
  get carrinho(): Carrinho {
    return this._carrinho;
  }

  set carrinho(carrinho: Carrinho) {
    this._carrinho = carrinho;

    this.quantidadeItems = carrinho.itens
      .map((item) => item.quantity)
      .reduce((prev, curent) => prev + curent, 0);
  }

  constructor (private carrinhoService: CarrinhoService) {}

  getTotal(itens: ItemCarrinho[]): number {
    return this.carrinhoService.getTotal(itens);
  }

  limparCarrinho(): void {
    this.carrinhoService.clearCart();
  }
}
