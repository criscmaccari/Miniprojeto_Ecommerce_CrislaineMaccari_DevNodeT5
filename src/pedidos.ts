
import type { Pedido } from "./type";
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

  const itens = obterItensCarrinho();

  if (itens.length === 0) {
    console.log("O carrinho está vazio.");
    return undefined;
  }

  // Verificar se existe produto e se há estoque
  for (const item of itens) {
    const produto = buscarProduto(item.produtoId);

    if (produto === undefined) {
      console.log("Produto não encontrado.");
      return undefined;
    }

    if (item.quantidade > produto.estoque) {
      console.log(
        "Estoque insuficiente para o produto: " + produto.nome
      );
      return undefined;
    }
  }

  // Criar pedido
  const pedido: Pedido = {
    pedidoId: proximoPedidoId,
    clienteId: clienteId,
    data: new Date(),
    itens: itens,
    total: calcularTotal()
  };

  // Atualizar estoque
  for (const item of itens) {
    const produto = buscarProduto(item.produtoId);

    if (produto !== undefined) {
      produto.estoque = produto.estoque - item.quantidade;
    }
  }

  // Guardar pedido e avançar o ID
  pedidos.push(pedido);
  proximoPedidoId++;

  // Limpar carrinho após finalizar
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

// Listar pedidos

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
  }
}

