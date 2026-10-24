
import type { Pedido, ItemPedido } from "./type";
import { buscarCliente } from "./clientes";
import { buscarProduto } from "./produtos";

import {
  obterItensCarrinho,
  limparCarrinho,
  calcularTotal,
  formatarMoeda
} from "./carrinho";

// Array de pedidos
const pedidos: Pedido[] = [];

// Gerar ID automaticamente
let proximoPedidoId = 1;

// Finalizar pedido
export function finalizarPedido(
  clienteId: string
): Pedido | undefined {

  const cliente = buscarCliente(clienteId);

  if (cliente === undefined) {
    console.log("Cliente não encontrado.");
    return undefined;
  }

  const itensCarrinho = obterItensCarrinho();

  if (itensCarrinho.length === 0) {
    console.log("O carrinho está vazio.");
    return undefined;
  }

  const itensPedido: ItemPedido[] = [];

  // Validar todos os itens antes de alterar o estoque
  for (const item of itensCarrinho) {
    const produto = buscarProduto(item.produtoId);

    if (produto === undefined) {
      console.log("Produto não encontrado.");
      return undefined;
    }

    if (item.quantidade <= 0) {
      console.log("A quantidade deve ser maior que zero.");
      return undefined;
    }

    if (item.quantidade > produto.estoque) {
      console.log(
        "Estoque insuficiente para o produto: " + produto.nome
      );
      return undefined;
    }

    // Guardar o preço praticado no momento da compra
    itensPedido.push({
      produtoId: item.produtoId,
      quantidade: item.quantidade,
      precoUnitario: produto.preco
    });
  }

  // Criar pedido
  const pedido: Pedido = {
    pedidoId: proximoPedidoId,
    clienteId: clienteId,
    data: new Date(),
    itens: itensPedido,
    total: calcularTotal()
  };

  // Atualizar estoque após validar todos os itens
  for (const item of itensPedido) {
    const produto = buscarProduto(item.produtoId);

    if (produto !== undefined) {
      produto.estoque = produto.estoque - item.quantidade;
    }
  }

  pedidos.push(pedido);
  proximoPedidoId++;

  limparCarrinho();

  console.log("Pedido finalizado com sucesso!");
  console.log("Total: " + formatarMoeda(pedido.total));

  return pedido;
}

// Buscar pedido pelo ID
export function buscarPedido(
  pedidoId: number
): Pedido | undefined {
  return pedidos.find(
    pedido => pedido.pedidoId === pedidoId
  );
}

// Listar todos os pedidos
export function listarPedidos(): void {
  for (const pedido of pedidos) {
    console.log(
      `Pedido: ${pedido.pedidoId} | ` +
      `Cliente: ${pedido.clienteId} | ` +
      `Data: ${pedido.data.toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo"
      })} | ` +
      `Total: ${formatarMoeda(pedido.total)}`
    );

    for (const item of pedido.itens) {
      const produto = buscarProduto(item.produtoId);
      const nomeProduto = produto === undefined
        ? item.produtoId
        : produto.nome;

      console.log(
        `  ${nomeProduto} | ` +
        `Quantidade: ${item.quantidade} | ` +
        `Preço unitário na compra: ${formatarMoeda(item.precoUnitario)}`
      );
    }
  }
}

// Listar pedidos de um cliente específico
export function listarPedidosPorCliente(
  clienteId: string
): Pedido[] {
  const cliente = buscarCliente(clienteId);

  if (cliente === undefined) {
    console.log("Cliente não encontrado.");
    return [];
  }

  const pedidosCliente = pedidos.filter(
    pedido => pedido.clienteId === clienteId
  );

  if (pedidosCliente.length === 0) {
    console.log("Esse cliente ainda não possui pedidos.");
  }

  return pedidosCliente;
}
