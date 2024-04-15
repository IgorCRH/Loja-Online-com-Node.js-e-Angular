import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Carrinho, ItemCarrinho } from 'app/models/carrinho.model';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  carrinho = new BehaviorSubject<Carrinho>({ itens: [] });

  constructor(private _snackBar: MatSnackBar) {}

  addToCart(item: ItemCarrinho): void {
    const itens = [...this.carrinho.value.itens];

    const itemInCart = itens.find((_item) => _item.id === item.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      itens.push(item);
    }

    this.carrinho.next({ itens });
    this._snackBar.open('1 item foi adicionado ao carrinho.', 'Ok', { duration: 3000 });
  }

  removeFromCart(item: ItemCarrinho, updateCart = true): ItemCarrinho[] {
    const filteredItems = this.carrinho.value.itens.filter(
      (_item) => _item.id !== item.id
    );

    if (updateCart) {
      this.carrinho.next({ itens: filteredItems });
      this._snackBar.open('1 item removido do carrinho.', 'Ok', {
        duration: 3000,
      });
    }

    return filteredItems;
  }

  removeQuantity(item: ItemCarrinho): void {
    let itemForRemoval!: ItemCarrinho;

    let filteredItems = this.carrinho.value.itens.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }

      return _item;
    });

    if (itemForRemoval) {
      filteredItems = this.removeFromCart(itemForRemoval, false);
    }

    this.carrinho.next({ itens: filteredItems });
    this._snackBar.open('1 item removido.', 'Ok', {
      duration: 3000,
    });
  }

  clearCart(): void {
    this.carrinho.next({ itens: [] });
    this._snackBar.open('Carrinho foi limpo.', 'Ok', {
      duration: 3000,
    });
  }

  getTotal(items: ItemCarrinho[]): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }
}
