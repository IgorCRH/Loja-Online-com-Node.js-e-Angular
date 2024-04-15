import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Carrinho, ItemCarrinho } from 'app/models/carrinho.model';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CarrinhoService } from 'app/services/cart.service';
import { Subscription } from 'rxjs';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatCardModule, CommonModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit {
  carrinho: Carrinho = { itens: [{
    product: 'https:via.placeholder.com/150',
    name: 'Tamanco',
    price: 200,
    quantity: 1,
    id: 1,
  }]}
  dataSource: Array<ItemCarrinho> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]
  carrinhoSubscription: Subscription | undefined;

  constructor(private carrinhoService: CarrinhoService, private http: HttpClient) {}

  ngOnInit(): void {
    this.carrinhoSubscription = this.carrinhoService.carrinho.subscribe((_carrinho: Carrinho) => {
      this.carrinho = _carrinho;
      this.dataSource = _carrinho.itens;
    });
  }

  getTotal(itens: ItemCarrinho[]): number {
    return itens.
    map((item) => item.price * item.quantity)
    .reduce((prev, curent) => prev + curent, 0);
  }

  limparCarrinho(): void {
    this.carrinhoService.clearCart();
  }

  removerdoCarrinho(item: ItemCarrinho): void {
    this.carrinhoService.removeFromCart(item);
  }

  adicionarQuantidade(item: ItemCarrinho): void {
    this.carrinhoService.addToCart(item);
  }

  removerQuantidade(item: ItemCarrinho): void {
    this.carrinhoService.removeQuantity(item);
  }

  onCheckout(): void {
    this.http
      .post('http://localhost:4242/checkout', {
        items: this.carrinho.itens,
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe('seu token');
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
  }

  ngOnDestroy() {
    if (this.carrinhoSubscription) {
      this.carrinhoSubscription.unsubscribe();
    }
  }
}
