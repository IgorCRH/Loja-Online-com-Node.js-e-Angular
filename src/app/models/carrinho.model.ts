export interface Carrinho {
  itens: Array<ItemCarrinho>;
}

export interface ItemCarrinho {
  product: string;
  name: string;
  price: number;
  quantity: number;
  id: number;
}
