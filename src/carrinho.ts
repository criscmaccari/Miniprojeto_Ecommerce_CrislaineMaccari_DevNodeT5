export function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })
};

// console.log(formatarMoeda(200));

import type { ItemCarrinho } from "./type";
import { buscarProduto } from "./produtos";

// Array do carrinho
const carrinho: ItemCarrinho[] = [];

// Adicionar Produto
export function adicionarProdutoCarrinho(
  produtoId: string,
  quantidade: number
): boolean {

  if (quantidade <= 0) {
    console.log("A quantidade deve ser maior que zero.");
    return false;
  }

  const produto = buscarProduto(produtoId);

  if (produto === undefined) {
    console.log("Produto não encontrado.");
    return false;
  }

  const item = carrinho.find(
    item => item.produtoId === produtoId
  );

  let quantidadeTotal = quantidade;

  if (item !== undefined) {
    quantidadeTotal = item.quantidade + quantidade;
  }

  if (quantidadeTotal > produto.estoque) {
    console.log("Quantidade maior que o estoque disponível.");
    return false;
  }

  if (item !== undefined) {
    item.quantidade = quantidadeTotal;
  } else {
    carrinho.push({
      produtoId: produtoId,
      quantidade: quantidade
    });
  }

  console.log("Produto adicionado ao carrinho!");
  return true;
}

// Remover Produto
export function removerProdutoCarrinho(
  produtoId: string
): boolean {

  const indice = carrinho.findIndex(
    item => item.produtoId === produtoId
  );

  if (indice === -1) {
    console.log("Produto não encontrado no carrinho.");
    return false;
  }

  carrinho.splice(indice, 1);

  console.log("Produto removido do carrinho!");
  return true;
}

// Alterar Quantidade
export function alterarQuantidade(
  produtoId: string,
  novaQuantidade: number
): boolean {

  if (novaQuantidade <= 0) {
    console.log("A quantidade deve ser maior que zero.");
    return false;
  }

  const item = carrinho.find(
    item => item.produtoId === produtoId
  );

  if (item === undefined) {
    console.log("Produto não encontrado no carrinho.");
    return false;
  }

  const produto = buscarProduto(produtoId);

  if (produto === undefined) {
    console.log("Produto não encontrado.");
    return false;
  }

  if (novaQuantidade > produto.estoque) {
    console.log("Quantidade maior que o estoque disponível.");
    return false;
  }

  item.quantidade = novaQuantidade;

  console.log("Quantidade atualizada!");
  return true;
}

// Calcular
export function calcularSubtotal(
  produtoId: string
): number {

  const item = carrinho.find(
    item => item.produtoId === produtoId
  );

  if (item === undefined) {
    return 0;
  }

  const produto = buscarProduto(produtoId);

  if (produto === undefined) {
    return 0;
  }

  return produto.preco * item.quantidade;
}

// Listar Carrinho
export function listarCarrinho(): void {

  for (const item of carrinho) {
    const produto = buscarProduto(item.produtoId);

    if (produto !== undefined) {
      console.log(
        `${produto.nome} | ` +
        `Preço: ${formatarMoeda(produto.preco)} | ` +
        `Quantidade: ${item.quantidade} | ` +
        `Subtotal: ${formatarMoeda(calcularSubtotal(item.produtoId))}`
      );
    }
  }
}

// Calcular Total da Compra
export function calcularTotal(): number {

  let total = 0;

  for (const item of carrinho) {
    total = total + calcularSubtotal(item.produtoId);
  }

  return total;
}

// // Adicionar 2 unidades de arroz
// adicionarProdutoCarrinho("P5", 2);
// // Listar os itens
// listarCarrinho();
// // Mostrar total
// console.log("Total:", calcularTotal());

// listarCarrinho();


export function obterItensCarrinho(): ItemCarrinho[] {
  const itens: ItemCarrinho[] = [];

  for (const item of carrinho) {
    itens.push({
      produtoId: item.produtoId,
      quantidade: item.quantidade
    });
  }

  return itens;
}

export function limparCarrinho(): void {
  carrinho.splice(0, carrinho.length);
}
