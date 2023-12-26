# Delivery (Front End para Sistema de Entregas de Carnês)

Bem-vindo ao Back End do sistema de entregas de carnês, uma aplicação dedicada a registrar eficientemente as entregas de carnês e identificar os responsáveis por cada entrega.

## Funcionalidades Principais:

- **Registro de Entregas:** Facilita o processo de registro de entregas de carnês de forma simples e intuitiva.

- **Validar o CPF do cliente:** Permite identificar se o cpf do cliente é valido.

## Tecnologias Utilizadas:

- [**@azure/storage-blob**](https://learn.microsoft.com/pt-br/azure/storage/blobs/storage-quickstart-blobs-nodejs?tabs=managed-identity%2Croles-azure-portal%2Csign-in-azure-cli)
- [**axios**](https://axios-http.com/docs/intro)
- [**cors**](https://www.npmjs.com/package/cors)
- [**cpf-cnpj-validator**](https://github.com/carvalhoviniciusluiz/cpf-cnpj-validator)
- [**vitest**](https://vitest.dev/guide/)
- [**validator**](https://www.npmjs.com/package/validator)
- [**uuid**](https://www.npmjs.com/package/uuid)
- [**express**](https://expressjs.com/pt-br/)
- [**express-async-errors**](https://www.npmjs.com/package/express-async-errors)
- [**jsonwebtoken**](https://www.npmjs.com/package/jsonwebtoken)
- [**mongoose**](https://mongoosejs.com/)
- [**swagger-ui-express**](https://www.npmjs.com/package/swagger-ui-express)

## Dependências do Projeto

**Observação:** Para acessar esses projetos, é necessário ser um colaborador no repositório da Interativa, já que eles são privados.

- [**azure**](https://azure.microsoft.com/pt-br/free/search/?ef_id=_k_0e4aebc83b85147bad578e432a415058_k_&OCID=AIDcmmzmnb0182_SEM__k_0e4aebc83b85147bad578e432a415058_k_&msclkid=0e4aebc83b85147bad578e432a415058)
- [**API IXC**](https://wikiapiprovedor.ixcsoft.com.br/#)

- [**MONGO**](https://www.mongodb.com/pt-br/cloud/atlas/lp/try4)

## Arquitetura

- **src:** Contém o projeto em sua totalidade.

  - **app:**

    - **controller:** Responsável pela manipulação da regra de negócio
    - **error:** Armazena todos os erros personalizados da API.
    - **helper:** Guarda códigos reutilizáveis do projeto.
    - **middlewares:** Guarda códigos reutilizáveis do projeto
    - **repositories:** Responsável por recuperar os valores do banco de dados ou da API do IXC.
    - **services:**
      - **ixc:** Contém todos os serviços referentes à requisição à API do
    - **usecase:** Responsável por unir o Controller com o Repositório.
    - **router:** Reúne todas as rotas.
    - **swagger:** Contém as configurações para exibir a documentação de rota da API.

  - **database:** Guarda as conesões aos banco de dados
  - **interface:** Contém algumas das DTOs usadas no projeto e as interfaces globais do projeto.
  - **model:** Contem o modelos do banco
  - **index:** Inicialização do projeto

- **tests:** Contém todos os testes da aplicação

## Instruções de Uso

Antes de tudo, instale as dependências do projeto e adicione o aquivo **.env**:

### Configuração do Arquivo **.env**

Este projeto requer um arquivo de configuração **.env** para definir variáveis de ambiente importantes. Certifique-se de criar na raiz do projeto e configure as seguintes variáveis:

```bash
#server
PORT=8000
VERSION=/v1

#mongodb
MONGO_USERNAME=user
MONGO_PASSWORD=test
MONGO_URI=mongodb://localhost:27017

#JWT
HASH_JWT=apenasumtest
TYPE_JWT=Bearer

#IXC
IXC_TOKEN=dbsgdbzsdb
IXC_URL=https://interativabr.com.br/webservice/

#azure-storage
AZURE_STORAGE_URL_CONNECTIONS=fvdsbvzdf
AZURE_CONTEINER_NAME=test-images
AZURE_STORAGE_NAME=interativastore
```

### Considerações Específica

Este projeto foi estruturado com base no uso do banco de dados MongoDb e da API do IXC. Se você estiver utilizando outro provedor de banco de dados ou Outra API, pode ser necessário fazer ajustes em algumas partes do projeto para garantir a compatibilidade.

### Arquivo **.env.example**

Se precisar de mais orientações, você pode consultar o arquivo **.env.example** incluído neste projeto como referência. Ele fornece um exemplo das variáveis de ambiente que você precisa configurar.

## Instalação das Dependências

```bash
yarn
```

ou

```bash
npm install
```

### Teste

Para executar os testes:

```bash
yarn test
```

ou

```bash
npm run test
```

### Executando o Projeto em Produção

Siga as etapas abaixo:

1. Gere o build:

```bash
yarn build
```

ou

```bash
npm run build
```

2. Após gerar o build, inicie o projeto com o comando:

```bash
yarn start
```

ou

```bash
npm start
```

### Executando o Projeto em Desenvolvimento

Para executar o projeto em modo de desenvolvimento:

```bash
yarn dev
```

ou

```bash
npm run dev
```

## Utils

### **swagger:**

Se desejar visualizar a documentação de rota, ela estará disponível em sua **localhost:{{sua porta}}/v1/api-lotteries/documentation**. Lá mostrará todos os possíveis erros e o que é retornado nas rotas.

- **OBS** Caso use o Swagger, altere o tipo de token para Bearer, o que pode ser feito no arquivo **.env**.
