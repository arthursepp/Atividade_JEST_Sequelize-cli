# Atividade 04 - API com sequelize-cli

**Autor:** Arthur Souza Sepp

**Data:** 29 de outubro de 2025

---

## Sobre

Este projeto se trata de uma API REST desenvolvida com Node.js, em conjunto com os módulos Express e Sequelize, conectando com um banco de dados MySQL.

O projeto segue a arquitetura MVC, e inclui testes automatizados com o **Jest** cobrindo as principais funcionalidades da aplicação.

---

## Banco de dados

O banco de dados foi configurado com três ambientes, com base nos scripts do arquivo **`config.json`**:

```
{
  "development": {
    "username": "root",
    "password": "root",
    "database": "BancoJest",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "root",
    "database": "BancoJest_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "root",
    "database": "BancoJest_prod",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```



---

## Passo-a-passo do desenvolvimento:

### Inicialização:

```
npm init -y

npm install express sequelize mysql2 jest supertest
```

### Criando as models + migrations:

```
npx sequelize-cli model:generate --name Usuario --attributes nome:string,email:string

npx sequelize-cli model:generate --name Pedido --attributes descricao:string,valor:float,usuarioId:integer 
```

### Execução das migrations:

```
npx sequelize-cli db:migrate
```

Em seguida, foram desenvolvidos outros pontos como controllers, rotas e configuração dos testes no Jest.

---

## Rotas da API:

| Método     | Rota                          | Descrição                                       |
| ---------- | ----------------------------- | ----------------------------------------------- |
| **POST**   | `/usuarios`                   | Cria um novo usuário                            |
| **GET**    | `/usuarios/:id`               | Busca um usuário pelo ID                        |
| **PUT**    | `/usuarios/:id`               | Atualiza o nome do usuário                      |
| **DELETE** | `/usuarios/:id`               | Remove um usuário                               |
| **POST**   | `/pedidos`                    | Cria um novo pedido associado a um usuário      |
| **GET**    | `/pedidos/usuario/:usuarioId` | Lista pedidos de um usuário                     |
| **GET**    | `/pedidos/total/:usuarioId`   | Calcula o total gasto pelo usuário              |
| **GET**    | `/usuarios/contagem`          | Retorna o número total de usuários              |
| **GET**    | `/usuarios/mais-pedidos`      | Retorna o usuário com mais pedidos              |
| **GET**    | `/usuarios/acima-de/:valor`   | Retorna usuários que gastaram acima de um valor |

---

## Soluções implementadas:

### criarUsuario(nome, email)

* **Descrição:** Insere um usuário no banco e retorna o registro criado.

* **Controller:** `usuarioController.criarUsuario`

* **Teste:** Verifica se o usuário é retornado com ID válido e persiste no banco.

  ```
  const usuario = await criarUsuario("Arthur", "arthur@email.com");
  expect(usuario.nome).toBe("Arthur");
  ```

### buscarUsuarioPorId(id)

* **Descrição:** Retorna o usuário correspondente ao ID informado.

* **Teste:** Garante retorno válido para ID existente e `null` para inexistente.

  ```
  const encontrado = await buscarUsuarioPorId(usuario.id);
  expect(encontrado.email).toBe("arthur@email.com");
  ```

### atualizarNomeUsuario(id, novoNome)

* **Descrição:** Atualiza o campo `nome` do usuário.

* **Teste:** Verifica atualização bem-sucedida e erro em caso de ID inválido.

  ```
  const atualizado = await atualizarNomeUsuario(usuario.id, "Arthur S. Sepp");`
  expect(atualizado.nome).toBe("Arthur S. Sepp");
  ```

### deletarUsuario(id)

* **Descrição:** Remove o usuário do banco.

* **Teste:** Após exclusão, busca retorna `null`.

  ```
  await deletarUsuario(usuario.id);
  const inexistente = await buscarUsuarioPorId(usuario.id);
  expect(inexistente).toBeNull();
  ```

### criarPedido(usuarioId, descricao, valor)

* **Descrição:** Cria um pedido vinculado a um usuário.

* **Teste:** Verifica se o pedido é criado e associado corretamente.

  ```
  const pedido = await criarPedido(usuario.id, "Mouse Gamer", 150.00);
  expect(pedido.usuarioId).toBe(usuario.id);
  ```

### listarPedidosDoUsuario(usuarioId)

* **Descrição:** Lista todos os pedidos de um usuário específico.

* **Teste:** Confere se todos pertencem ao mesmo `usuarioId`

  ```
  const pedidos = await listarPedidosDoUsuario(usuario.id);
  expect(pedidos.every(p => p.usuarioId === usuario.id)).toBe(true);
  ```

### calcularTotalPedidos(usuarioId)

* **Descrição:** Soma os valores de todos os pedidos de um usuário.

* **Teste:** Verifica total correto e 0 quando não há pedidos.

  ```
  const total = await calcularTotalPedidos(usuario.id);
  expect(total).toBeCloseTo(150.00);
  ```

### contarUsuarios()

* **Descrição:** Retorna a quantidade de usuários na tabela.

* **Teste:** Verifica contagem correta após inserção e exclusão.

  ```
  const count = await contarUsuarios();
  expect(count).toBeGreaterThan(0);
  ```

### usuarioComMaisPedidos()

* **Descrição:** Retorna o usuário que mais fez pedidos. 

* **Teste:** Confere se retorna o correto e `null` quando não há pedidos.

  ```
  const topUser = await usuarioComMaisPedidos();
  expect(topUser.nome).toBe("Arthur");
  ```

### usuariosAcimaDe(valor)

* **Descrição:** Lista usuários cujo total de pedidos supera o valor informado.

* **Teste:** Garante que apenas usuários com gasto maior que o valor apareçam.

  ```
  * const ricos = await usuariosAcimaDe(100);
    expect(ricos.length).toBeGreaterThan(0);
  ```

---

## Testes:

Foi utilizado o Jest para a automação dos testes unitários.

Cada controller é testado de forma individual, simulando a camada de dados real.

Podemos executar os testes com:

```
npm test
```

---

## Fluxo:

1. **Usuário se cadastra** --> `POST /usuarios` --> salvo na tabela `Usuarios`
2. **Usuário cria pedid** --> `POST /pedido` --> vinculado via `usuarioId`
3. **Sistema permite consultas**:
   * Buscar usuário por Id
   * Listar pedidos do usuário
   * Calcular total de produtos
   * Identificar quem mais gastou ou comprou