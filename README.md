# Guardião de Chaves

## 📌 Objetivo
O sistema **Guardião de Chaves** tem como objetivo gerenciar o empréstimo e a devolução de chaves em ambientes como edifícios comerciais, instituições de ensino e condomínios. A aplicação controla as permissões de acesso, garantindo **segurança, rastreabilidade das chaves e organização do fluxo de empréstimos**.

---

## 📜 Escopo
O sistema permite:
- 📌 **Cadastro e gerenciamento** de usuários, cargos, salas, tipos de salas, ambientes, solicitantes e permissões de acesso.
- 🔑 **Registro e controle de reservas**.
- 📊 **Monitoramento do fluxo** de empréstimo e devolução de chaves.
- ✅ **Validação de permissões** para garantir a segurança dos ambientes.
- 🛡️ **Registro de auditoria** para todas as operações críticas.

---

## 🎯 Público-Alvo
- **Administradores**: Gerenciam ambientes, chaves, usuários, cargos e permissões de acesso.
- **Porteiros**: Registram empréstimos e devoluções, validando as permissões dos solicitantes.

---

## 🏗️ Visão Geral da Aplicação
### 🔹 Arquitetura
O sistema adota uma arquitetura de **três camadas** para garantir modularidade e escalabilidade:
- **Frontend**: Angular (com Angular Material para componentes visuais).
- **Backend**: Micronaut (para APIs RESTful e lógica de negócios).
- **Banco de Dados**: PostgreSQL (para armazenamento das informações).

### 🔹 Tecnologias Utilizadas
| Tecnologia  | Descrição |
|-------------|-----------|
| **Angular (TypeScript)** | Interface do usuário interativa. |
| **Micronaut (Java)** | API REST e lógica de negócios. |
| **PostgreSQL** | Armazenamento de dados. |
| **Docker** | Ambiente isolado e replicável. |
| **Swagger/OpenAPI** | Documentação interativa da API. |

---

## 📂 Estrutura do Projeto
### 📌 UI (Interface do Usuário)
Local: `./ui`

A aplicação web desenvolvida em **Angular** oferece:
- Formulários para gerenciamento de usuários, cargos e permissões.
- Componentes interativos com **Angular Material**.

### 📌 API (Backend)
Local: `./app`

A API desenvolvida em **Micronaut** fornece:
- Endpoints **RESTful** para CRUD de entidades como usuários, ambientes e chaves.
- Autenticação baseada em **JWT**.
- Documentação interativa via **Swagger/OpenAPI**.

---

## 🚀 Como Executar o Projeto
### 🔹 Pré-requisitos
- **Docker e Docker Compose** instalados.
- **Node.js** (caso queira rodar a UI separadamente).

### 🔹 Executando com Docker
1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/guardiao-de-chaves.git
   cd guardiao-de-chaves
   ```
2. Configure as variáveis de ambiente no `.env`.
Exemplo:
```env
DATASOURCES_DEFAULT_URL=jdbc:postgresql://db:5432/key_keeper
DATASOURCES_DEFAULT_USERNAME=postgres
DATASOURCES_DEFAULT_PASSWORD=postgres
```
3. Suba os containers:
   ```sh
   docker-compose up -d
   ```

### 🔹 Acessando os serviços
- **Frontend (UI)**: [http://localhost:8081](http://localhost:8081)
- **Backend (API)**: [http://localhost:8080](http://localhost:8080)
- **Banco de Dados (PostgreSQL)**: Porta **5434**

---

## 📌 Documentação da API
Acesse a documentação **Swagger/OpenAPI** da API em:
[http://localhost:8080/swagger-ui/index.html#/](http://localhost:8080/swagger-ui/index.html#/)

---

## 🛠️ Contribuição

1. Faça um **fork** do repositório.
2. Crie uma **branch** para sua funcionalidade: `git checkout -b feature/nova-funcionalidade`
3. **Commit** suas alterações: `git commit -m "Adiciona nova funcionalidade"`
4. Faça um **push** para a branch: `git push origin feature/nova-funcionalidade`
5. Abra um **Pull Request**.

---

## 📜 Licença
Este projeto é distribuído sob a **Licença MIT**. Leia o arquivo `LICENSE` para mais informações.

---

📌 **Desenvolvido por:** [Gustavo Garcia de Sousa](https://github.com/sagubr/)
