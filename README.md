# Mini E-commerce em TypeScript

## 1. Sobre o projeto

Este projeto consiste em uma aplicação simples de e-commerce desenvolvida em TypeScript, com o objetivo de praticar conceitos de programação, organização de código em módulos, tipagem, funções, arrays e validação de dados.

O sistema permite gerenciar produtos e clientes, adicionar e remover itens do carrinho, calcular valores de compra e finalizar pedidos, atualizando o estoque dos produtos.

Os dados são armazenados em memória, sem utilização de banco de dados.

## 2. Tecnologias utilizadas

- TypeScript
- JavaScript
- Node.js
- Visual Studio Code (VS Code)

## 3. Organização dos arquivos

- `type.ts`: definição dos tipos utilizados no projeto.
- `produtos.ts`: cadastro, consulta, atualização e remoção de produtos.
- `clientes.ts`: cadastro, consulta e listagem de clientes.
- `carrinho.ts`: gerenciamento do carrinho e cálculo dos valores.
- `pedidos.ts`: finalização, consulta e listagem de pedidos.
- `main.ts`: demonstração das principais funcionalidades do sistema.
- `dist/`: diretório que recebe os arquivos JavaScript gerados pela compilação, conforme a configuração do TypeScript.

## 4. Como executar o projeto no VS Code

### Pré-requisitos

É necessário ter o Node.js e o TypeScript instalados e disponíveis no terminal.

### Etapa 1 — Abrir o projeto

Abra a pasta principal do projeto no Visual Studio Code.

No menu do VS Code, acesse **Terminal → Novo Terminal**.

O terminal deverá estar na pasta principal do projeto, onde se encontra o arquivo `main.ts`.

### Etapa 2 — Compilar TypeScript para JavaScript

Na pasta principal, execute:

```tsc```

O comando compila os arquivos TypeScript de acordo com as configurações do projeto, gerando os arquivos JavaScript no diretório configurado, que neste projeto é `dist/`.

Caso sejam apresentados erros de compilação, corrija-os antes de executar a aplicação.

### Etapa 3 — Executar a aplicação

Após a compilação, abra um terminal na pasta `dist`:

E execute o arquivo principal, para um primeiro teste:

```node main.js```

O terminal apresentará a demonstração das funcionalidades programadas no `main.ts`, incluindo consultas, cadastros, operações no carrinho, cálculo da compra, finalização de pedido e testes de situações inválidas.

**Importante:** sempre execute `tsc` na pasta principal antes de executar `node main.js` na pasta `dist`, para garantir que o JavaScript corresponda à versão mais recente do código TypeScript.

## 5. Tipos utilizados

### Categoria

Define as categorias permitidas para os produtos:

- `"alimentos"`
- `"vestuario"`

### Produto

Representa um produto cadastrado no sistema.

| Propriedade | Tipo | Descrição |
|---|---|---|
| `produtoId` | `string` | Identificador do produto |
| `nome` | `string` | Nome do produto |
| `categoria` | `Categoria` | Categoria do produto |
| `preco` | `number` | Preço unitário |
| `estoque` | `number` | Quantidade disponível |

### Cliente

Representa um cliente cadastrado.

| Propriedade | Tipo | Descrição |
|---|---|---|
| `clienteId` | `string` | Identificador do cliente |
| `nome` | `string` | Nome do cliente |
| `email` | `string` | E-mail do cliente |

### ItemCarrinho

Representa um produto e sua quantidade no carrinho.

| Propriedade | Tipo | Descrição |
|---|---|---|
| `produtoId` | `string` | Identificador do produto |
| `quantidade` | `number` | Quantidade adicionada |

### ItemPedido

Representa um item registrado em um pedido, preservando o preço unitário praticado no momento da compra.

| Propriedade | Tipo | Descrição |
|---|---|---|
| `produtoId` | `string` | Identificador do produto |
| `quantidade` | `number` | Quantidade comprada |
| `precoUnitario` | `number` | Preço unitário registrado na compra |

### Pedido

Representa um pedido finalizado.

| Propriedade | Tipo | Descrição |
|---|---|---|
| `pedidoId` | `number` | Identificador numérico do pedido |
| `clienteId` | `string` | Identificador do cliente |
| `data` | `Date` | Data e horário da compra |
| `itens` | `ItemPedido[]` | Itens registrados no pedido |
| `total` | `number` | Valor total da compra |

## 6. Funções disponíveis

Os retornos descritos abaixo correspondem aos tipos definidos nas funções. Algumas funções também apresentam mensagens no terminal por meio de `console.log()`.

### 6.1. Produtos — `produtos.ts`

| Função | Argumentos | Retorno e comportamento |
|---|---|---|
| `listarProdutos()` | Nenhum | `void`. Exibe os produtos cadastrados. |
| `buscarProduto(produtoId)` | `string` | `Produto` ou `undefined`, se não encontrar o identificador. |
| `buscarProdutoPorNome(nome)` | `string` | `Produto[]` com os nomes que contêm o texto informado. |
| `filtrarProdutosPorCategoria(categoria)` | `Categoria` | `Produto[]` com os produtos da categoria informada. |
| `cadastrarProduto(produto)` | `Produto` | `boolean`: `true` se cadastrar; `false` se houver erro de validação ou identificador duplicado. |
| `atualizarProduto(produtoId, nome?, categoria?, preco?, estoque?)` | ID obrigatório e demais campos opcionais | `boolean`: indica se a atualização foi realizada. |
| `removerProduto(produtoId)` | `string` | `boolean`: `true` se remover; `false` se não encontrar o produto. |

Exemplos de utilização:

listarProdutos();

console.log(buscarProduto("P1"));

console.log(buscarProdutoPorNome("Arroz"));

console.log(filtrarProdutosPorCategoria("alimentos"));


Para atualizar um produto, informe o identificador e somente os campos que deseja alterar:

atualizarProduto("P1", "Calça Sarja Preta");

atualizarProduto("P1", undefined, undefined, 160);

atualizarProduto("P1", undefined, undefined, undefined, 12);

Para cadastrar um produto, envie um objeto com todas as propriedades obrigatórias:

cadastrarProduto({
  produtoId: "P7",
  nome: "Farinha de Trigo",
  categoria: "alimentos",
  preco: 8,
  estoque: 15
});


**Regras de validação:** o identificador não pode estar duplicado, o nome não pode estar vazio, o preço deve ser maior que zero e o estoque não pode ser negativo.

### 6.2. Clientes — `clientes.ts`

| Função | Argumentos | Retorno e comportamento |
|---|---|---|
| `listarClientes()` | Nenhum | `void`. Exibe os clientes cadastrados. |
| `buscarCliente(clienteId)` | `string` | `Cliente` ou `undefined`, se não encontrar o cliente. |
| `validarDados(nome, email)` | Duas strings | `boolean`. Valida o comprimento mínimo do nome e a presença de `@` e `.` no e-mail. |
| `validarCadastro(nome, email, callback)` | Nome, e-mail e função de validação | `boolean`. Executa a função recebida e informa se os dados passaram na validação. |
| `cadastrarCliente(cliente)` | `Cliente` | `boolean`: `true` se cadastrar; `false` se houver dados inválidos, ID duplicado ou e-mail duplicado. |

Exemplos:

listarClientes();

console.log(buscarCliente("C1"));

cadastrarCliente({
  clienteId: "C7",
  nome: "Mariana Lima",
  email: "mariana@email.com"
});


**Regras de validação:** o nome deve ter pelo menos três caracteres; o e-mail deve conter `@` e `.`; o identificador e o e-mail não podem estar cadastrados anteriormente.

### 6.3. Carrinho — `carrinho.ts`

| Função | Argumentos | Retorno e comportamento |
|---|---|---|
| `formatarMoeda(valor)` | `number` | `string`. Formata o valor em reais (R$). |
| `adicionarProdutoCarrinho(produtoId, quantidade)` | ID do produto e quantidade numérica | `boolean`. Adiciona o produto ou soma a quantidade ao item existente. |
| `removerProdutoCarrinho(produtoId)` | `string` | `boolean`. Remove o item do carrinho se ele existir. |
| `alterarQuantidade(produtoId, novaQuantidade)` | ID e nova quantidade | `boolean`. Atualiza a quantidade do item. |
| `calcularSubtotal(produtoId)` | `string` | `number`. Calcula o subtotal do produto no carrinho; retorna `0` se não encontrar o item ou o produto. |
| `listarCarrinho()` | Nenhum | `void`. Exibe os itens, preços, quantidades e subtotais. |
| `calcularTotal()` | Nenhum | `number`. Retorna a soma dos subtotais dos itens do carrinho. |
| `obterItensCarrinho()` | Nenhum | `ItemCarrinho[]`. Retorna uma cópia dos itens e suas quantidades. |
| `limparCarrinho()` | Nenhum | `void`. Remove todos os itens do carrinho. |

Exemplos:

adicionarProdutoCarrinho("P5", 2);

adicionarProdutoCarrinho("P3", 1);

listarCarrinho();

console.log(calcularSubtotal("P5"));

console.log(formatarMoeda(calcularTotal()));

alterarQuantidade("P5", 3);

removerProdutoCarrinho("P3");


**Regras de validação:** a quantidade deve ser maior que zero, o produto deve existir e a quantidade solicitada não pode ultrapassar o estoque disponível. Ao adicionar novamente um produto que já está no carrinho, a quantidade é somada à existente, respeitando o estoque.

### 6.4. Pedidos — `pedidos.ts`

| Função | Argumentos | Retorno e comportamento |
|---|---|---|
| `finalizarPedido(clienteId)` | `string` | `Pedido` ou `undefined`. Valida o cliente e os itens, cria o pedido, atualiza o estoque e limpa o carrinho após a conclusão. |
| `buscarPedido(pedidoId)` | `number` | `Pedido` ou `undefined`, se não encontrar o pedido. |
| `listarPedidos()` | Nenhum | `void`. Exibe os pedidos registrados, seus itens, quantidades, preços unitários históricos e totais. |
| `listarPedidosPorCliente(clienteId)` | `string` | `Pedido[]` com os pedidos do cliente; retorna uma lista vazia se o cliente não existir. |

Exemplos:

finalizarPedido("C1");

console.log(buscarPedido(1));

listarPedidos();

console.log(listarPedidosPorCliente("C1"));

**Regras de funcionamento:**

- O cliente precisa estar cadastrado.
- O carrinho não pode estar vazio.
- Todos os produtos devem existir e ter estoque suficiente.
- O pedido recebe um identificador numérico incremental.
- O preço unitário é registrado no momento da compra.
- O estoque é reduzido após a validação dos itens.
- O carrinho é esvaziado após a finalização bem-sucedida.
- O pedido armazena o total da compra e os dados dos itens.

Se a finalização falhar, a função retorna `undefined` e não deve registrar o pedido nem descontar o estoque.

## 7. Dados iniciais

O sistema começa com seis produtos e seis clientes cadastrados.

### Produtos

| ID | Produto | Categoria | Preço | Estoque |
|---|---|---|---:|---:|
| P1 | Calça Jeans | vestuario | R$ 150,00 | 10 |
| P2 | Camiseta | vestuario | R$ 89,00 | 3 |
| P3 | Macarrão 500g | alimentos | R$ 6,00 | 20 |
| P4 | Feijão 1kg | alimentos | R$ 6,00 | 40 |
| P5 | Arroz 5kg | alimentos | R$ 18,00 | 10 |
| P6 | Vestido Floral | vestuario | R$ 120,00 | 5 |

### Clientes

| ID | Nome | E-mail |
|---|---|---|
| C1 | Ana Carla Costa | ana.costa@email.com |
| C2 | Lucas Almeida da Silva | lucas.almeida@email.com |
| C3 | Carla Ferreira | carla.ferreira@email.com |
| C4 | Rafael Souza Santos | rafaels.souza@email.com |
| C5 | Juliano Martins | juliano.martins@email.com |
| C6 | Fernanda Oliveira | fernanda.oliveira@email.com |

## 8. Demonstração e testes

O arquivo `main.ts` reúne exemplos de utilização das principais funcionalidades do sistema.

A demonstração contempla:

- Consulta e cadastro de produtos.
- Busca de produtos por identificador e nome.
- Filtragem de produtos por categoria.
- Consulta e cadastro de clientes.
- Adição, remoção e alteração de itens no carrinho.
- Cálculo de subtotais e total da compra.
- Finalização de pedido.
- Verificação do estoque antes e depois da compra.
- Consulta dos pedidos registrados e dos pedidos de um cliente.
- Testes de situações inválidas, como preço negativo, quantidade acima do estoque e tentativa de finalizar uma compra com carrinho vazio.

Para testar outras situações, podem ser chamadas as funções exportadas nos respectivos módulos, respeitando os argumentos e os tipos descritos neste documento.

## 9. Observações importantes

- Os dados são mantidos somente em memória. Ao reiniciar a aplicação, os produtos e clientes retornam aos dados iniciais, e os pedidos anteriores deixam de existir.
- Os pedidos são gerados apenas durante a execução atual.
- As funções de listagem exibem informações no terminal; as funções de consulta retornam dados que podem ser armazenados em variáveis ou exibidos com `console.log()`.
- A busca por nome utiliza correspondência parcial e diferencia letras maiúsculas de minúsculas.
- Os identificadores dos produtos e clientes devem ser informados como strings, por exemplo, `"P1"` e `"C1"`. O identificador do pedido deve ser informado como número, por exemplo, `1`.
- O arquivo `main.ts` executa uma demonstração programada, não um menu interativo. Para testar outras operações, podem ser adicionadas chamadas às funções exportadas.
- Caso o código TypeScript seja alterado, é necessário executar novamente `tsc` antes de executar o arquivo JavaScript.

## 10. Autor

Projeto acadêmico desenvolvido para praticar TypeScript, organização de módulos, tipagem e lógica de programação.
