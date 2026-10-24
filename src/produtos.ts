// Produtos
import { formatarMoeda } from "./carrinho";
import type { Produto, Categoria } from "./type";

export const produtos: Produto[] = [
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

//Listar produtos

export function listarProdutos(): void {
  for (const produto of produtos) {
    console.log(
      `${produto.produtoId} - ${produto.nome} | ` +
      `${formatarMoeda(produto.preco)} | ` +
      `Estoque: ${produto.estoque}`
    )
  }
}

//Buscar produto e cadastrar produto

export function buscarProduto(produtoId: string): Produto | undefined {
  return produtos.find(produto => produto.produtoId == produtoId);
}

export function buscarProdutoPorNome(nome: string): Produto[] {
  return produtos.filter(
    produto => produto.nome.includes(nome)
  );
}

export function filtrarProdutosPorCategoria(
  categoria: Categoria
): Produto[] {
  return produtos.filter(
    produto => produto.categoria === categoria
  );
}

export function cadastrarProduto(produto: Produto): boolean {
  if (produto.nome.length === 0) {
    console.log("O nome não pode estar vazio.");
    return false;
  }

  if (produto.preco <= 0) {
    console.log("O preço deve ser maior que zero.");
    return false;
  }

  if (produto.estoque < 0) {
    console.log("O estoque não pode ser negativo.");
    return false;
  }

  const existente = buscarProduto(produto.produtoId);

  if (existente !== undefined) {
    console.log("Esse produto já existe.");
    return false;
  }

  produtos.push(produto);
  console.log("O produto foi adicionado!");
  return true;
}


//Remover produto

export function removerProduto(produtoId: string): boolean {
  const indice = produtos.findIndex(
    produto => produto.produtoId === produtoId
  );

  if (indice === -1) {
    console.log("Produto não encontrado.");
    return false;
  }

  produtos.splice(indice, 1);

  console.log("Produto removido!");
  return true;
}

//Atualizar produto

export function atualizarProduto(
  produtoId: string,
  nome?: string,
  categoria?: Categoria,
  preco?: number,
  estoque?: number
): boolean {

  const produto = buscarProduto(produtoId);

  if (produto === undefined) {
    console.log("Produto não encontrado.");
    return false;
  }

  if (nome !== undefined && nome.length === 0) {
    console.log("O nome não pode estar vazio.");
    return false;
  }

  if (nome !== undefined && nome === " ") {
    console.log("O nome não pode estar vazio.");
    return false;
  }

  if (preco !== undefined && preco <= 0) {
    console.log("O preço deve ser maior que zero.");
    return false;
  }

  if (estoque !== undefined && estoque < 0) {
    console.log("O estoque não pode ser negativo.");
    return false;
  }

  if (nome !== undefined) {
    produto.nome = nome;
  }

  if (categoria !== undefined) {
    produto.categoria = categoria;
  }

  if (preco !== undefined) {
    produto.preco = preco;
  }

  if (estoque !== undefined) {
    produto.estoque = estoque;
  }

  console.log("Produto atualizado.");
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

// atualizarProduto(
//   "P1",
//   "Calça Sarja Preta",
// );
// listarProdutos();
