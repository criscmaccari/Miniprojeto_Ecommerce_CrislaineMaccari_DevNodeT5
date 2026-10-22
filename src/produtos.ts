// Produtos
import { formatarMoeda } from "./carrinho";
import type { Produto } from "./type";

const produtos: Produto[] = [
    {
        produtoId: "P1",
        nome: "Calça Jeans",
        categoria: "vestuario",
        preco: 150,
        estoque: 10,
    },
    {
        produtoId: "P2",
        nome: "Camiseta",
        categoria: "vestuario",
        preco: 89,
        estoque: 3,
    },
    {
        produtoId: "P3",
        nome: "Macarrão 500g",
        categoria: "alimentos",
        preco: 6,
        estoque: 20,
    },
    {
        produtoId: "P4",
        nome: "Feijão 1kg",
        categoria: "alimentos",
        preco: 6,
        estoque: 40
    },
    {
        produtoId: "P5",
        nome: "Arroz 5kg",
        categoria: "alimentos",
        preco: 18,
        estoque: 10
    },
    {
        produtoId: "P6",
        nome: "Vestido Floral",
        categoria: "vestuario",
        preco: 120,
        estoque: 5
    }
];

function listarProdutos(): void {
  for (const produto of produtos) {
    console.log(
      `${produto.produtoId} - ${produto.nome} | ` +
      `${formatarMoeda(produto.preco)} | ` +
      `Estoque: ${produto.estoque}`
    )
  }
}

export function buscarProduto(produtoId: string): Produto | undefined {
  return produtos.find(produto => produto.produtoId == produtoId);
}

export function cadastrarProduto(produto: Produto): boolean {
  const existente = buscarProduto(produto.produtoId);

  if(existente != undefined) {
    console.log("Esse produto já existe");
    return false;
  }

  produtos.push(produto);
  console.log('O produto foi adicionado!');
  return true;

}

// const farinha: Produto = {
//   produtoId: "P7",
//   nome: "Farinha",
//   preco: 28,
//   estoque: 10,
//   categoria: "alimentos"
// }

// cadastrarProduto(farinha);
// listarProdutos();