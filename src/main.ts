
import type { Produto, Cliente } from "./type";

import {
  listarProdutos,
  buscarProduto,
  buscarProdutoPorNome,
  filtrarProdutosPorCategoria,
  cadastrarProduto
} from "./produtos";

import {
  listarClientes,
  buscarCliente,
  cadastrarCliente
} from "./clientes";

import {
  adicionarProdutoCarrinho,
  removerProdutoCarrinho,
  alterarQuantidade,
  listarCarrinho,
  calcularTotal,
  formatarMoeda,
  obterItensCarrinho
} from "./carrinho";

import {
  finalizarPedido,
  listarPedidos,
  listarPedidosPorCliente
} from "./pedidos";

console.log("================================");
console.log("        MINI E-COMMERCE");
console.log("================================");

// 1. CONSULTA E CADASTRO DE PRODUTOS

console.log("\n===== LISTAR PRODUTOS =====");
listarProdutos();

console.log("\n===== BUSCAR PRODUTO POR ID =====");
console.log(buscarProduto("P1"));

console.log("\n===== BUSCAR PRODUTO POR NOME =====");
console.log(buscarProdutoPorNome("Arroz"));

console.log("\n===== FILTRAR POR CATEGORIA =====");
console.log(filtrarProdutosPorCategoria("alimentos"));

console.log("\n===== CADASTRAR PRODUTO =====");

const novoProduto: Produto = {
  produtoId: "P7",
  nome: "Farinha de Trigo",
  categoria: "alimentos",
  preco: 8,
  estoque: 15
};

cadastrarProduto(novoProduto);

// Teste inválido 1: preço negativo
console.log("\n===== TESTE INVÁLIDO: PREÇO NEGATIVO =====");

const produtoInvalido: Produto = {
  produtoId: "P8",
  nome: "Produto Inválido",
  categoria: "alimentos",
  preco: -10,
  estoque: 5
};

cadastrarProduto(produtoInvalido);


// 2. CONSULTA E CADASTRO DE CLIENTES

console.log("\n===== LISTAR CLIENTES =====");
listarClientes();

console.log("\n===== BUSCAR CLIENTE =====");
console.log(buscarCliente("C1"));

console.log("\n===== CADASTRAR CLIENTE =====");

const novoCliente: Cliente = {
  clienteId: "C7",
  nome: "Mariana Lima",
  email: "mariana@email.com"
};

cadastrarCliente(novoCliente);


// 3. OPERAÇÕES NO CARRINHO

// Teste inválido 2: quantidade maior que o estoque
console.log("\n===== TESTE INVÁLIDO: ESTOQUE INSUFICIENTE =====");
adicionarProdutoCarrinho("P2", 100);

console.log("\n===== ADICIONAR PRODUTOS =====");
adicionarProdutoCarrinho("P4", 1);
adicionarProdutoCarrinho("P5", 2);
adicionarProdutoCarrinho("P3", 2);

console.log("\n===== REMOVER ITEM DO CARRINHO =====");
removerProdutoCarrinho("P4");

console.log("\n===== ALTERAR QUANTIDADE =====");
alterarQuantidade("P5", 3);

console.log("\n===== LISTAR CARRINHO =====");
listarCarrinho();

console.log("\n===== TOTAL DA COMPRA =====");
console.log(formatarMoeda(calcularTotal()));


// 4. FINALIZAR PEDIDO E ATUALIZAR ESTOQUE


console.log("\n===== ESTOQUE ANTES DA COMPRA =====");

const itensAntes = obterItensCarrinho();

for (const item of itensAntes) {
  const produto = buscarProduto(item.produtoId);

  if (produto !== undefined) {
    console.log(
      `${produto.nome} | ` +
      `Quantidade no carrinho: ${item.quantidade} | ` +
      `Estoque disponível: ${produto.estoque}`
    );
  }
}

console.log("\n===== FINALIZAR PEDIDO =====");
finalizarPedido("C1");

console.log("\n===== ESTOQUE DEPOIS DA COMPRA =====");

for (const item of itensAntes) {
  const produto = buscarProduto(item.produtoId);

  if (produto !== undefined) {
    console.log(
      `${produto.nome} | ` +
      `Quantidade comprada: ${item.quantidade} | ` +
      `Estoque restante: ${produto.estoque}`
    );
  }
}

console.log("\n===== LISTAR TODOS OS PEDIDOS =====");
listarPedidos();

console.log("\n===== PEDIDOS DO CLIENTE C1 =====");
console.log(listarPedidosPorCliente("C1"));


// Teste inválido 3: finalizar compra com carrinho vazio
console.log("\n===== TESTE INVÁLIDO: CARRINHO VAZIO =====");
finalizarPedido("C1");

console.log("\n===== FIM DO SISTEMA =====");
