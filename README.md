# Vue Tasks

Aplicação de lista de tarefas construída com Vue 3, TypeScript, Pinia e Tailwind. O projeto usa `json-server` como API local para persistir dados durante o desenvolvimento.

## Tecnologias

- Vue 3 com Vite
- TypeScript
- Pinia para gerenciamento de estado
- Tailwind CSS v4
- Axios
- json-server para API mock
- vue-toast-notification para feedback de usuário

## Pré-requisitos

- Node.js 18+
- npm 9+

## Instalação

```bash
npm install
```

## Configuração de ambiente

- Crie um arquivo `.env` na raiz do projeto com:

```
VITE_API_URL=http://localhost:3000
```

- Esse URL deve apontar para o servidor do `json-server` (script `npm run server`).

## Execução

- Iniciar API local (json-server):

```bash
npm run server
```

- Iniciar aplicação em modo desenvolvimento:

```bash
npm run dev
```

- Build de produção:

```bash
npm run build
```

- Preview do build:

```bash
npm run preview
```

## Estrutura do projeto

```
src/
  components/          # Componentes de UI
    createTaskForm.vue # Formulário de criação
    listTasks.vue      # Lista e filtros
    listTaskItem.vue   # Item com edição e ações
    tasksFilter.vue    # Filtro de status
    updateTaskForm.vue # Formulário de edição inline
  plugins/
    axios.ts           # BaseURL do Axios via env
  services/
    tasksServices.ts   # CRUD de tarefas
  stores/
    taskStore.ts       # Pinia store de tarefas
  types/
    taskType.ts        # Tipos e interfaces TS
  App.vue
  main.ts
  style.css
db/
  db.json              # Base de dados do json-server
```

## Modelo de dados

Interface `Task`:

```ts
export interface Task {
  id: string;
  title: string;
  description: string;
  is_completed: boolean;
}
```

## Fluxo de dados e arquitetura

- Componentes disparam eventos para ações de negócio (criar, atualizar, remover, alternar status).
- A store Pinia (`useTasksStore`) centraliza estado e executa chamadas assíncronas.
- Os serviços (`tasksServices`) isolam chamadas HTTP, usando `axios` com `baseURL` definido por `VITE_API_URL`.
- UI fornece feedback com toasts e estados de carregamento/erro.

### Store (Pinia)

- Estado: `tasks`, `isLoading`, `error`, `pendingIds`.
- Ações:
  - `fetchTasks`: carrega tarefas e gerencia `isLoading`/`error`.
  - `addTask`: cria tarefa e adiciona ao estado.
  - `updateTask`: atualiza item e controla concorrência via `pendingIds`.
  - `removeTask`: remove item e controla concorrência via `pendingIds`.

### Services (Axios)

- Endpoints:
  - `GET /Tasks`
  - `POST /Tasks`
  - `PUT /Tasks/:id`
  - `DELETE /Tasks/:id`

### Componentes

- `createTaskForm.vue`: formulário para criar tarefas, com validação de título.
- `listTasks.vue`: carrega tarefas, aplica filtro e exibe estados de UI (loading, erro, vazio).
- `listTaskItem.vue`: item com checkbox de conclusão, botões de editar/remover e modo de edição inline.
- `updateTaskForm.vue`: edição inline de título e descrição.
- `tasksFilter.vue`: troca entre filtros `all`, `completed`, `pending` via `v-model`.

## API local (json-server)

- Base de dados: `db/db.json`.
- Coleção: `Tasks`.
- Executar:

```bash
npm run server
```

- Por padrão, disponível em `http://localhost:3000`.

## Convenções e boas práticas

- Tipos centralizados em `src/types`.
- Serviços isolados em `src/services` para facilitar testes e manutenção.
- Estado global em `src/stores` usando Pinia.
- Configuração de Axios em `src/plugins` para uso único do `baseURL`.
- Tailwind v4 carregado via `@tailwindcss/vite` e `src/style.css`.

## Troubleshooting

- Se a aplicação não carregar dados, verifique:
  - `json-server` está rodando (`npm run server`).
  - `VITE_API_URL` aponta para o endereço correto da API (`http://localhost:3000`).
  - A coleção em `db.json` corresponde ao endpoint (`Tasks`).
