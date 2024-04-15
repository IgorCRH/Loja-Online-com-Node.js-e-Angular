import { Component, EventEmitter, Input, Output} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Produto } from 'app/models/produto.model';

@Component({
  selector: 'app-product-box',
  standalone: true,
  imports: [MatIconModule, CommonModule, MatCardModule],
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.css'
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  @Input() product: Produto | undefined;
  @Output() addToCart = new EventEmitter();

  adicionaraoCarrinho(): void {
    this.addToCart.emit(this.product);
  }
}
