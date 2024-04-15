import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductsHeaderComponent } from './components/products-header/products-header.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ProductBoxComponent } from './components/product-box/product-box.component';
import { Produto } from 'app/models/produto.model';
import { Subscription } from 'rxjs';
import { CarrinhoService } from 'app/services/cart.service';
import { LojaService } from 'app/services/loja.service';
import { CommonModule } from '@angular/common';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductBoxComponent, FiltersComponent, ProductsHeaderComponent, MatSidenavModule, MatGridListModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;

  rowHeight = ROWS_HEIGHT[this.cols];

  categoria: string | undefined;

  products: Array<Produto> | undefined;

  sort = 'desc';

  count = '12';

  produtosSubscription: Subscription | undefined;

  constructor(private carrinhoService: CarrinhoService, private lojaService: LojaService){

  }

  ngOnInit(): void {
    this.getProdutos();
  }

  onColumnsCountChange(numCols: number): void {
    this.cols = numCols;
    this.rowHeight=ROWS_HEIGHT[this.cols];
  }

  onShowCategoria(novaCategoria: string): void {
    this.categoria = novaCategoria;
    this.getProdutos();
  }

  getProdutos(): void {
    this.produtosSubscription = this.lojaService
      .getAllProducts(this.count, this.sort, this.categoria)
      .subscribe((_products) => {
        this.products = _products;
      });
  }

  onItemsCountChange(newCount: number): void {
    this.count = newCount.toString();
    this.getProdutos();
  }

  onSortChange(newSort: string):void {
    this.sort = newSort;
    this.getProdutos();
  }

  adicionaraoCarrinho(produto: Produto): void {
    this.carrinhoService.addToCart({
      product: produto.image,
      name: produto.title,
      price: produto.price,
      quantity: 1,
      id: produto.id,
    });
  }

  ngOnDestroy(): void {
    if (this.produtosSubscription) {
      this.produtosSubscription.unsubscribe();
    }
  }
}
