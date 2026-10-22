export type Categoria = "alimentos" | "vestuario";

export type Produto = {
    produtoId: string;
    nome: string;
    categoria: Categoria;
    preco: number;
    estoque: number;
}

export type Cliente = {
    clienteId: string;
    nome: string;
    email: string;
}

export type Pedido = {
    pedidoId: number;
    data: Date;
}

