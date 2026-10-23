
import type { Cliente } from "./type";

export const clientes: Cliente[] = [
  {
    clienteId: "C1",
    nome: "Ana Carla Costa",
    email: "ana.costa@email.com"
  },
  {
    clienteId: "C2",
    nome: "Lucas Almeida da Silva",
    email: "lucas.almeida@email.com"
  },
  {
    clienteId: "C3",
    nome: "Carla Ferreira",
    email: "carla.ferreira@email.com"
  },
  {
    clienteId: "C4",
    nome: "Rafael Souza Santos",
    email: "rafaels.souza@email.com"
  },
  {
    clienteId: "C5",
    nome: "Juliano Martins",
    email: "juliano.martins@email.com"
  },
  {
    clienteId: "C6",
    nome: "Fernanda Oliveira",
    email: "fernanda.oliveira@email.com"
  }
];

// Validar nome e e-mail
export function validarDados(nome: string, email: string): boolean {
  let nomeValido = nome.length >= 3;
  let emailValido = email.includes("@") && email.includes(".");

  return nomeValido && emailValido;
}

// Validar cadastro
export function validarCadastro(
  nome: string,
  email: string,
  callback: (nome: string, email: string) => boolean
): boolean {
  if (callback(nome, email)) {
    console.log("Cadastro permitido!");
    return true;
  } else {
    console.log("Nome ou e-mail inválido!");
    return false;
  }
}

// Listar clientes
export function listarClientes(): void {
  for (const cliente of clientes) {
    console.log(
      `${cliente.clienteId} - ${cliente.nome} - ${cliente.email}`
    );
  }
}

// Buscar cliente pelo identificador
export function buscarCliente(
  clienteId: string
): Cliente | undefined {
  return clientes.find(
    cliente => cliente.clienteId === clienteId
  );
}

// Cadastrar cliente
export function cadastrarCliente(cliente: Cliente): boolean {

  if (!validarCadastro(cliente.nome, cliente.email, validarDados)) {
    return false;
  }

  const existente = buscarCliente(cliente.clienteId);

  if (existente !== undefined) {
    console.log("Esse identificador já está cadastrado.");
    return false;
  }

  const emailExistente = clientes.find(
    item => item.email === cliente.email
  );

  if (emailExistente !== undefined) {
    console.log("Esse e-mail já está cadastrado.");
    return false;
  }

  clientes.push(cliente);
  console.log("O cliente foi adicionado!");
  return true;
}

// listarClientes();

// cadastrarCliente({
//   clienteId: "C7",
//   nome: "Mariana Lima",
//   email: "mariana@email.com"
// });

// listarClientes();

// console.log(buscarCliente("C7"));