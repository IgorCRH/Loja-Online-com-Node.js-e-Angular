import { Component, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { LojaService } from 'app/services/loja.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, MatListModule, MatExpansionModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent implements OnInit, OnDestroy {

  @Output() showCategoria = new EventEmitter<string>();
  categorias: string[] | undefined;
  categoriasSubscription: Subscription | undefined;

  constructor (private lojaService: LojaService){}

  ngOnInit(): void {
    this.categoriasSubscription = this.lojaService
      .gettodasCategorias()
      .subscribe((response: Array<string>) => {
        this.categorias = response;
      });
  }

  onShowCategoria(categoria: string): void {
    this.showCategoria.emit(categoria);
  }

  ngOnDestroy(): void {
    if (this.categoriasSubscription) {
      this.categoriasSubscription.unsubscribe();
    }
  }
}
