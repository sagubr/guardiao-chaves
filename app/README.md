# 📦 Backend - Guardião de Chaves

## 📋 Descrição
O backend do sistema **Guardião de Chaves** é responsável por fornecer APIs RESTful para gerenciar o empréstimo e a devolução de chaves. Ele controla a autenticação, permissões e operações críticas, garantindo a segurança e rastreabilidade das chaves.

## 🛠️ Tecnologias Utilizadas
- **Micronaut (Java)**: Framework leve para microsserviços.
- **PostgreSQL**: Banco de dados relacional para armazenamento de informações.
- **Docker**: Containerização para ambientes replicáveis.
- **Swagger/OpenAPI**: Documentação interativa da API.

## 📂 Estrutura de Diretórios
```
app/
├── build/ #após a compilcação do app
│   ├── main/
│   │    └── classes/java/main/
│   │            └── META-INF/
│   │                   └── swagger/key-keeper-0.0.yml  # Documentação OpenAPI (essencial para gerar código automático)
├── src/
│   ├── main/
│   │    ├── java/github/sagubr/
│   │    │        ├── controllers/  # Controladores REST
│   │    │        ├── entities/       # Entidades do banco
│   │    │        ├── repositories/ # Repositórios JPA
│   │    │        └── services/     # Regras de negócio
│   │    └── resources/
│   │         ├── application.yml   # Configurações do Micronaut
│   │         └── META-INF/
│   │              └── swagger/     # Documentação OpenAPI
│   └── test/                       # Testes unitários
└── Dockerfile
```

## 📌 Configuração
As variáveis sensíveis estão no arquivo `.env`. Exemplo:

```env
POSTGRES_URL=jdbc:postgresql://db:5432/key_keeper
POSTGRES_USERNAME=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=key_keeper
JWT_TOKEN_SECRET=chave??
MASTER_USERNAME=admin
MASTER_PASSWORD=102030
SENDGRID_API_KEY=chave??
```

## 🚀 Como Executar o Backend
1. Certifique-se de ter o Docker instalado.
2. Execute o seguinte comando na raiz do projeto:

```bash
docker-compose up --build
```
O backend estará acessível em: [http://localhost:8080](http://localhost:8080)

---

## 📌 Documentação da API
Acesse a documentação **Swagger/OpenAPI** da API em:
[http://localhost:8080/swagger-ui/index.html#/](http://localhost:8080/swagger-ui/index.html#/)


## 📖 Documentação Completa
Para mais detalhes, consulte o [README principal](https://github.com/sagubr/guardiao-chaves/blob/master/README.md).


