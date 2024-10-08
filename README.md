# API CENTER CONTROL

A classe `apiCenterControl` é uma implementação simples de uma API cliente em JavaScript. Ela fornece métodos assíncronos para realizar operações comuns em uma API RESTful: `GET`, `POST`, `PUT`, `PATCH` e `DELETE`. Esta classe é ideal para quem está começando a trabalhar com requisições HTTP e deseja simplificar a interação com APIs.

## Métodos

### 1. `get(url, header = {})`

Realiza uma requisição GET para o URL especificado.

- **Parâmetros:**
  - `url` (string): O endpoint da API.
  - `header` (object): Um objeto opcional contendo cabeçalhos para a requisição.
  
- **Retorno:** Retorna um objeto JSON se a requisição for bem-sucedida, ou `null` em caso de erro.

### 2. `post(url, header = {}, body = {})`

Realiza uma requisição POST para o URL especificado.

- **Parâmetros:**
  - `url` (string): O endpoint da API.
  - `header` (object): Cabeçalhos para a requisição.
  - `body` (object): O corpo da requisição a ser enviado. Deve ser um objeto.

- **Retorno:** Retorna um objeto JSON se a requisição for bem-sucedida, ou `null` em caso de erro.

### 3. `update(url, key = null, header = {}, body = {})`

Realiza uma atualização (PUT ou PATCH) em uma propriedade específica de um objeto na API.

- **Parâmetros:**
  - `url` (string): O endpoint da API.
  - `key` (string): A chave do objeto que será atualizado.
  - `header` (object): Cabeçalhos para a requisição.
  - `body` (object): O novo valor a ser definido para a chave especificada.

- **Retorno:** Retorna um objeto JSON se a requisição for bem-sucedida, ou `null` em caso de erro.

### 4. `delete(url, header = {})`

Realiza uma requisição DELETE para o URL especificado.

- **Parâmetros:**
  - `url` (string): O endpoint da API.
  - `header` (object): Cabeçalhos para a requisição.

- **Retorno:** Retorna `true` se a exclusão for bem-sucedida, ou `null` em caso de erro.

## Exemplo de Uso

```javascript
const ApiCenter = require('./caminho/para/apiCenterControl');

const api = new ApiCenter();

// Exemplo de GET
api.get('https://api.exemplo.com/dados')
    .then(data => console.log(data))
    .catch(error => console.error(error));

// Exemplo de POST
api.post('https://api.exemplo.com/dados', {}, { nome: 'Exemplo' })
    .then(data => console.log(data))
    .catch(error => console.error(error));
