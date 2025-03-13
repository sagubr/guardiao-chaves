# 🎨 Frontend - Guardião de Chaves

## 📋 Descrição
O frontend do sistema **Guardião de Chaves** oferece uma interface amigável para administradores e porteiros gerenciarem chaves, usuários e permissões de acesso.

## 🛠️ Tecnologias Utilizadas
- **Angular (TypeScript)**: Framework para construção da interface.
- **Angular Material**: Componentes visuais modernos.
- **Docker**: Para facilitar a execução em ambiente isolado.

## 📂 Estrutura de Diretórios
```
ui/
├── src/
│   ├── app/
│   │    ├── core/          # Serviços globais (auth, interceptors)
│   │    ├── features/       # Módulos com Lazy Loading
│   │    │      ├── authorization/   # Tela de solicitantes e permissões
│   │    │      ├── settings/   # Tela de configurações de acessos
│   │    │      ├── transactions/   # Tela de empréstimo
│   │    │      └── resource/  # Painel de recursos
│   │    └── shared/        # Componentes e utilitários compartilhados
│   └── environments/       # Configurações de ambiente
└── Dockerfile
```

## 📌 Configuração
As variáveis sensíveis estão no arquivo `.env`. Exemplo:

```env
API_BASE_URL=http://localhost:8080
```

## 🚀 Como Executar o Frontend
1. Certifique-se de ter o Docker instalado.
2. Execute o seguinte comando na raiz do projeto:

```bash
docker-compose up --build
```

O frontend estará acessível em: [http://localhost:8081](http://localhost:8081)

## 📊 Funcionalidades Principais
- Login via JWT
- Gestão de usuários, permissões e reservas

---

## 📖 Instruções de como gerar os services para a ui
Os services são gerados de modo automático a partir do código swagger.
Para mais detalhes, consulte o [README openapi-generator](https://github.com/sagubr/guardiao-chaves/tree/master/ui/src/libs/openapi-generator/configuration#readme)

## 📖 Documentação Completa
Para mais detalhes, consulte o [README principal](https://github.com/sagubr/guardiao-chaves/blob/master/README.md).
