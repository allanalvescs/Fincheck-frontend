# Documentação da Arquitetura - Fincheck Frontend

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Estrutura de Pastas](#estrutura-de-pastas)
3. [Stack Tecnológico](#stack-tecnológico)
4. [Padrões e Princípios](#padrões-e-princípios)
5. [Fluxo de Dados](#fluxo-de-dados)
6. [Componentes Principais](#componentes-principais)

---

## 🏗️ Visão Geral

Fincheck é uma aplicação web de gerenciamento financeiro pessoal construída com **React 18**, **TypeScript** e **Vite**. A arquitetura segue o padrão **Context API + React Query**, combinando gerenciamento de estado local (Context) com sincronização de dados remotos (React Query).

### Características Arquiteturais:

- **Type-Safe**: Utiliza TypeScript com strict mode habilitado
- **Modular**: Separação clara de responsabilidades
- **Escalável**: Estrutura preparada para crescimento
- **Performática**: Vite como build tool, React Query para caching inteligente
- **Reativa**: React Hooks como padrão de desenvolvimento

---

## 📁 Estrutura de Pastas

```
src/
├── App/                          # Core da aplicação
│   ├── config/                   # Configurações globais
│   ├── contexts/                 # Context API (estado global)
│   ├── entities/                 # Modelos de dados (TypeScript interfaces)
│   ├── hooks/                    # Custom hooks
│   ├── services/                 # Comunicação com API
│   └── Utils/                    # Funções utilitárias
├── Assets/                       # Arquivos estáticos (imagens, ícones)
├── Router/                       # Configuração de rotas
├── View/                         # Apresentação (UI)
│   ├── Components/               # Componentes reutilizáveis
│   ├── Layouts/                  # Layouts de página
│   └── Pages/                    # Páginas/Telas da aplicação
├── main.tsx                      # Ponto de entrada
└── App.tsx                       # Componente raiz com providers
```

---

## 🔧 Stack Tecnológico

### Frontend Framework
| Tecnologia | Versão | Função |
|-----------|--------|--------|
| **React** | 18.2.0 | Framework UI |
| **TypeScript** | 5.2.2 | Tipagem estática |
| **Vite** | 5.0.8 | Build tool e dev server |

### Gerenciamento de Estado & Dados
| Tecnologia | Versão | Função |
|-----------|--------|--------|
| **React Context API** | Built-in | Estado global (Auth, Dashboard) |
| **React Query** | 4.32.0 | Sincronização e cache de dados remotos |
| **React Hook Form** | 7.49.2 | Gerenciamento de formulários |

### UI & Styling
| Tecnologia | Versão | Função |
|-----------|--------|--------|
| **Tailwind CSS** | 3.4.0 | Utility-first CSS framework |
| **Radix UI** | Múltiplas | Componentes headless acessíveis |
| **Headless UI** | 1.7.18 | Componentes sem estilo |
| **React Hot Toast** | 2.4.1 | Notificações toast |

### Validação & Formatação
| Tecnologia | Versão | Função |
|-----------|--------|--------|
| **Zod** | 3.22.4 | Validação de schemas |
| **date-fns** | 4.1.0 | Manipulação de datas |
| **react-number-format** | 5.4.4 | Formatação de números |

### HTTP & Requisições
| Tecnologia | Versão | Função |
|-----------|--------|--------|
| **Axios** | 1.6.3 | HTTP client |

### Roteamento
| Tecnologia | Versão | Função |
|-----------|--------|--------|
| **React Router DOM** | 6.21.1 | Roteamento de páginas |

### Utilitários
| Tecnologia | Versão | Função |
|-----------|--------|--------|
| **Clsx** | 2.1.0 | Concatenação de classes CSS |
| **Tailwind Merge** | 2.2.0 | Merge inteligente de classes Tailwind |
| **Swiper** | 11.0.7 | Carrossel de componentes |

---

## 🎯 Padrões e Princípios

### 1. **Context API para Estado Global**

A aplicação utiliza dois contextos principais:

#### **AuthContext**
- **Responsabilidade**: Gerenciar estado de autenticação
- **Estado**:
  - `signedIn`: boolean - indica se o usuário está autenticado
- **Métodos**:
  - `singin(accessToken)`: Armazena token no localStorage e marca como autenticado
  - `signout()`: Remove token e marca como não autenticado
- **Sincronização**: Usa React Query para validar token com endpoint `/users/me`

#### **DashboardContext**
- **Responsabilidade**: Gerenciar estado da dashboard (modais, visibilidade)
- **Estado**:
  - `areValuesVisible`: boolean - controla exibição de valores monetários
  - `isNewAccountModalOpen`: boolean - estado do modal de nova conta
  - `isNewTransactionModalOpen`: boolean - estado do modal de nova transação
  - `newTransactionType`: "INCOME" | "EXPENSE" | null - tipo da transação
  - `isEditAccountModalOpen`: boolean - estado do modal de edição
  - `accountBeingEdited`: BankAccount | null - conta sendo editada
- **Persistência**: Algumas flags são salvas no localStorage (ex: `VISIBLE_VALUES`)

### 2. **React Query para Dados Remotos**

Padrão **SSR (Server State Management)**:
- Cache automático de requisições
- Deduplicação de requisições simultâneas
- Refetching inteligente com retry=false
- Desativação de refetch ao ganhar foco na janela

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,                // Sem retry automático
      refetchOnWindowFocus: false   // Sem refetch ao ganhar foco
    }
  }
})
```

### 3. **Axios Interceptors**

**Request Interceptor**:
- Injeta token JWT automaticamente em todas as requisições
- Header: `Authorization: Bearer {accessToken}`

**Response Interceptor**:
- Simula delay de 1.5s em todas as respostas (para efeito de UX)

### 4. **TypeScript Strict Mode**

Configuração no `tsconfig.json`:
```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

Garante:
- Null/undefined safety
- Tipos explícitos obrigatórios
- Nenhum código não utilizado

### 5. **Componentização Modular**

Padrão de componentes reutilizáveis com Radix UI:
- Componentes headless (sem estilo pré-definido)
- Customização via Tailwind CSS
- Acessibilidade garantida (WAI-ARIA)

---

## 🔄 Fluxo de Dados

### Fluxo de Autenticação

```
User Login → Login Form
    ↓
useFormLoginHandler Hook
    ↓
authServices.signIn(email, password)
    ↓
axios POST /auth/signin
    ↓
Server retorna accessToken
    ↓
AuthContext.singin(accessToken)
    ↓
Token armazenado em localStorage
    ↓
Router redireciona para Dashboard
```

### Fluxo de Sincronização de Dados

```
Component (ex: Dashboard)
    ↓
useBankAccounts Hook → useQuery
    ↓
React Query (cache)
    ↓
HttpClient (axios com interceptors)
    ↓
API Server
    ↓
Response cached
    ↓
Component re-render com dados
```

### Fluxo de Gerenciamento de Modal

```
User Click (Novo Lançamento)
    ↓
openNewTransactionModal("INCOME")
    ↓
DashboardContext atualizado
    ↓
Modal renderizado
    ↓
Form submission
    ↓
transactionsService.create()
    ↓
Cache invalidado via React Query
    ↓
closeNewTransactionModal()
```

---

## 📦 Componentes Principais

### 📂 `App/config/`

**Responsabilidade**: Armazenar constantes e configurações globais

#### `constants.ts`
- Constantes da aplicação

#### `localStorageKeys.ts`
- Chaves padronizadas para localStorage
- `ACCESS_TOKEN`: Token JWT do usuário
- `VISIBLE_VALUES`: Preferência de visibilidade de valores

### 📂 `App/contexts/`

**Responsabilidade**: Gerenciar estado global com Context API

#### `AuthContext.tsx`
- **Provider**: `AuthProvider`
- **Hook**: `useAuth()`
- **Funcionalidades**:
  - Valida token ao carregar app
  - Monitora expiração de sessão
  - Persist de login

#### `DashboardContext.tsx`
- **Provider**: `DashboardProvider`
- **Hook**: `useDashboard()`
- **Funcionalidades**:
  - Gerencia estados dos modais
  - Controla visibilidade de valores
  - Persist de preferências

### 📂 `App/entities/`

**Responsabilidade**: Definir tipos/interfaces de domínio

#### `BankAccount.ts`
```typescript
{
  id: string,
  name: string,
  initialBalance: number,
  type: "CHECKING" | "INVESTMENT" | "CASH",
  color: string,
  currentBalance: number
}
```

#### `Category.ts`
- Modelo de categoria de transação

#### `Transaction.ts`
- Modelo de transação (receita/despesa)

### 📂 `App/hooks/`

**Responsabilidade**: Lógica reutilizável específica do domínio

#### `useAuth()`
- Acessa AuthContext
- Simples wrapper para contexto

#### `useBankAccounts()`
```typescript
// Usa React Query para buscar contas
const { data, isLoading } = useQuery({
  queryKey: ["bankAccounts"],
  queryFn: bankAccountServices.getAll,
});
return { accounts: data ?? [], isLoading }
```

#### `useTransactions()`
- Gerencia estado e cache de transações

#### `useDashboard()`
- Acessa DashboardContext

#### `useCategories()`
- Gerencia categorias de transações

#### `useWindowWidth()`
- Hook para responsividade
- Detecta mudanças de tamanho de janela

### 📂 `App/services/`

**Responsabilidade**: Abstrair comunicação com API

#### `HttpClient.ts`
```typescript
// Instância configurada de axios
- baseURL: import.meta.env.VITE_API_URL
- Request Interceptor: injeta Authorization
- Response Interceptor: simula delay
```

#### `authServices/`
- `signIn(email, password)`: POST /auth/signin
- `signUp(data)`: POST /auth/signup

#### `bankAccountServices/`
- `getAll()`: GET /bank-accounts
- `create(data)`: POST /bank-accounts
- `update(id, data)`: PUT /bank-accounts/:id
- `remove(id)`: DELETE /bank-accounts/:id

#### `transactionsService/`
- `getAll(filters?)`: GET /transactions
- `create(data)`: POST /transactions

#### `categoriesService/`
- `getAll()`: GET /categories

#### `userServices/`
- `me()`: GET /users/me (validação de token)

### 📂 `App/Utils/`

**Responsabilidade**: Funções utilitárias puras

| Função | Propósito |
|--------|----------|
| `capitalizeFirstLetter()` | Capitaliza primeira letra |
| `cn()` | Merge de classes CSS |
| `currencyStringToNumber()` | Converte string moeda em número |
| `delay()` | Promise que resolve após n milissegundos |
| `formatCurrency()` | Formata número para moeda |
| `formatDate()` | Formata data com date-fns |

### 📂 `Router/`

**Responsabilidade**: Configuração de rotas

#### `index.tsx`
```
/login (público)
  ↓
/register (público)
  ↓
/ (privado - Dashboard)
```

#### `Authenticate.tsx`
- Componente wrapper que verifica autenticação
- Redireciona não autenticados para `/login`
- Bloqueia acesso a rotas privadas

### 📂 `View/Components/`

**Responsabilidade**: Componentes UI reutilizáveis

#### Componentes Primitivos
- `Button.tsx`: Botões customizáveis
- `Input.tsx`: Inputs de texto
- `InputCurrency.tsx`: Input para valores monetários
- `Select.tsx`: Select customizado (Radix UI)
- `Modal.tsx`: Modal genérica
- `Popover.tsx`: Popover (Radix UI)
- `DatePicker.tsx`: Seletor de data
- `DatePickerInput.tsx`: Input com date picker
- `DropdownMenu.tsx`: Menu dropdown
- `Spinner.tsx`: Loading spinner
- `Logo.tsx`: Logo da aplicação
- `ColorsDropdownInput.tsx`: Seletor de cores
- `UserMenu.tsx`: Menu do usuário
- `ConfirmDeleteModal.tsx`: Modal de confirmação de delete

#### Componentes de Ícones (`icons/`)
- `BankAccountIcon.tsx`
- `TransactionsIcon.tsx`
- `FilterIcon.tsx`
- `ExpensesIcon.tsx`
- `IncomeIcon.tsx`
- `EyeIcon.tsx`
- `TrashIcon.tsx`

##### Ícones Específicos
- `BankAccountTypeIcon/`: Ícones por tipo de conta (Checking, Cash, Investment)
- `categories/`: Ícones customizados por categoria

### 📂 `View/Layouts/`

**Responsabilidade**: Layouts estruturais de página

#### `AuthLayout.tsx`
- Layout para páginas de autenticação
- Estrutura: Logo + Outlet (rotas filhas)

### 📂 `View/Pages/`

**Responsabilidade**: Páginas completas da aplicação

#### `Dashboard/`
- **Página principal** com:
  - Sumário de contas e transações
  - Lista de transações
  - Modais para criar/editar contas
  - Modais para criar transações

**Subcomponentes**:
- `Accounts/`: Componentes de exibição de contas
- `Transactions/`: Componentes de transações
- `Fab/`: Floating Action Button
- Modais para criar/editar

#### `Login/`
- **Página de login**
- `Form/`: Formulário com validação Zod
- `useFormLoginHandler.ts`: Lógica do formulário

#### `Register/`
- **Página de registro**
- Formulário com validação de senha

#### `PageLoader/`
- **Tela de carregamento**
- Exibida enquanto valida sessão

---

## 🔐 Fluxo de Segurança

```
1. Usuário acessa /
   ↓
2. Authenticate verifica AuthContext.signedIn
   ↓
3. Se false → redireciona para /login
   ↓
4. Se true → valida token via userServices.me()
   ↓
5. Se válido → renderiza Dashboard
   ↓
6. Se inválido (erro 401) → AuthContext.signout()
      → redireciona para /login
      → exibe toast "Sua sessão expirou!"
```

---

## 📊 Fluxo de Renderização

```
ReactDOM.render(App)
    ↓
QueryClientProvider (React Query cache)
    ↓
AuthProvider (verifica token)
    ↓
Router (BrowserRouter)
    ↓
Authenticate (valida autenticação)
    ↓
Pages (Dashboard / Login / Register)
    ↓
View Components (UI renderizada)
```

---

## 🚀 Otimizações Implementadas

### 1. **Code Splitting**
- Vite bundla automaticamente com split de chunks
- Lazy loading de rotas com React Router

### 2. **Caching inteligente**
- React Query manage cache de queries
- LocalStorage para dados de preferência

### 3. **Sem Render Desnecessários**
- useCallback em Context callbacks
- React.memo em componentes pesados (potencial)

### 4. **Build Otimizado**
- Vite SWC para transpilação rápida
- Tree-shaking automático

---

## 📝 Convenções de Código

### Nomenclatura
- **Componentes**: PascalCase (`Button.tsx`, `Modal.tsx`)
- **Hooks**: camelCase com prefixo "use" (`useAuth`, `useBankAccounts`)
- **Serviços**: camelCase (`bankAccountServices`, `authServices`)
- **Pastas**: camelCase ou PascalCase conforme contexto

### Importações
- Importações de node_modules primeiro
- Depois importações internas (App, View, etc.)
- Imports absolutamente usando caminhos do projeto

### TypeScript
- Interfaces para Props de componentes
- Enums para valores finitos (`"INCOME" | "EXPENSE"`)
- Types para aliases simples

---

## 🔄 Fluxo de Desenvolvimento

### Para adicionar nova feature:

1. **Definir entity** em `App/entities/`
2. **Criar service** em `App/services/`
3. **Criar hook** em `App/hooks/` para encapsular lógica
4. **Criar componentes** em `View/Components/`
5. **Integrar em página** em `View/Pages/`
6. **Se necessário**, estender Context em `App/contexts/`

---

## 🎯 Resumo Executivo

O Fincheck Frontend é uma aplicação **type-safe**, **modular** e **escalável** que:

✅ Usa **React Context + React Query** para state management eficiente
✅ Implementa **TypeScript strict** para segurança de tipos
✅ Segue **separação clara de responsabilidades**
✅ Utiliza **Tailwind + Radix UI** para UI acessível e customizável
✅ Aplica **padrões modernos** de React (hooks, suspense-ready)
✅ Mantém **código organizado** e fácil de manter

---

## 📚 Referências Rápidas

| Necessidade | Onde Ir |
|-----------|----------|
| Adicionar nova rota | `src/Router/index.tsx` |
| Criar novo hook | `src/App/hooks/` |
| Chamar API | `src/App/services/` |
| Novo tipo de dado | `src/App/entities/` |
| Componente reutilizável | `src/View/Components/` |
| Página nova | `src/View/Pages/` |
| Função auxiliar | `src/App/Utils/` |
| Estado global | `src/App/contexts/` |
| Config global | `src/App/config/` |
