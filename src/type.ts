
export type Categoria = "alimentos" | "vestuario";

export type Produto = {
  produtoId: string;
  nome: string;
  categoria: Categoria;
  preco: number;
  estoque: number;
};

export type Cliente = {
  clienteId: string;
  nome: string;
  email: string;
};

export type ItemCarrinho = {
  produtoId: string;
  quantidade: number;
};

export type ItemPedido = {
  produtoId: string;
  quantidade: number;
  precoUnitario: number;
};

export type Pedido = {
  pedidoId: number;
  clienteId: string;
  data: Date;
  itens: ItemPedido[];
  total: number;
};
