import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from 'app/models/produto.model';

const STORE_BASE_URL = 'https://fakestoreapi.com';

@Injectable({
  providedIn: 'root'
})
export class LojaService {

  constructor(private httpClient: HttpClient) {}

  getAllProducts(
    limit = '12',
    sort = 'desc',
    category?: string
  ): Observable<Array<Produto>> {
    return this.httpClient.get<Array<Produto>>(
      `${STORE_BASE_URL}/products${
        category ? '/category/' + category : ''
      }?sort=${sort}&limit=${limit}`
    );
}

gettodasCategorias(): Observable<Array<string>> {
  return this.httpClient.get<Array<string>>(
    `${STORE_BASE_URL}/products/categories`
  );
}
}
