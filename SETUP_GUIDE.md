# 🚀 GUIA DE SETUP - LIMPADOR

## ✅ O que foi preparado

- ✅ Estrutura de pastas completa (src/, public/, etc)
- ✅ package.json com todas as dependências
- ✅ Configuração do Vite
- ✅ Configuração do Tailwind CSS
- ✅ Componentes UI (shadcn-like)
- ✅ API Client (Base44)
- ✅ Sistema de Roteamento
- ✅ Tema Dark/Light
- ✅ Todos os componentes organizados

---

## 📦 Próximos passos

### 1️⃣ Instalar dependências

```bash
npm install
# ou
yarn install
```

### 2️⃣ Configurar .env.local

Edite o arquivo `.env.local` e adicione suas credenciais da Base44:

```env
VITE_BASE44_API_URL=https://seu-api-url
VITE_BASE44_CLIENT_ID=seu_client_id
VITE_BASE44_CLIENT_SECRET=seu_client_secret
```

### 3️⃣ Iniciar desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

A aplicação abrirá em `http://localhost:5173`

### 4️⃣ Build para produção

```bash
npm run build
# ou
yarn build
```

---

## 📁 Estrutura de pastas

```
limpador/
├── src/
│   ├── api/
│   │   └── base44Client.js         # Cliente da API
│   ├── components/
│   │   ├── Layout.jsx              # Layout principal
│   │   ├── ui/                     # Componentes UI
│   │   └── common/                 # Componentes compartilhados
│   ├── contexts/
│   │   └── ThemeContext.jsx        # Contexto de tema
│   ├── hooks/                      # Hooks customizados
│   ├── lib/
│   │   └── utils.js                # Utilitários (cn, etc)
│   ├── pages/                      # Páginas (rotas)
│   ├── utils/
│   │   └── index.js                # Utilidades da app
│   ├── index.css                   # Estilos globais
│   ├── main.jsx                    # Entry point
│   └── App.jsx                     # Componente raiz com rotas
├── public/
│   └── index.html                  # HTML principal
├── package.json                    # Dependências
├── vite.config.js                  # Config Vite
├── tailwind.config.js              # Config Tailwind
├── postcss.config.js               # Config PostCSS
├── .env.example                    # Variáveis de exemplo
└── .env.local                      # Variáveis locais (não commitar)
```

---

## 🔧 Configuração

### Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# API
VITE_BASE44_API_URL=https://api.base44.dev
VITE_BASE44_CLIENT_ID=seu_id
VITE_BASE44_CLIENT_SECRET=seu_secret

# App
VITE_APP_NAME=Limpador
VITE_APP_URL=http://localhost:5173

# Features
VITE_ENABLE_ADVANCED_ANALYTICS=true
VITE_ENABLE_DEBUG_MODE=false
```

### Aliases de importação

Você pode usar `@` para importar de `src/`:

```jsx
// ✅ Correto
import { base44 } from '@/api/base44Client'
import { Button } from '@/components/ui/button'
import { createPageUrl } from '@/utils'

// ❌ Evitar
import { base44 } from '../../../api/base44Client'
```

---

## 🎯 Primeiro teste

1. Instale as dependências: `npm install`
2. Inicie o dev: `npm run dev`
3. Abra `http://localhost:5173` no navegador
4. Você verá a página inicial (Home)

---

## 📚 Estrutura de componentes

### Componentes UI

Localização: `src/components/ui/`

- `button.jsx` - Botão
- `card.jsx` - Card
- `index.jsx` - Input, Label, Textarea, Badge
- `other.jsx` - Switch, Slider, Dialog, Popover, RadioGroup, Select, Tabs

### Componentes Comuns

Localização: `src/components/common/`

- `StarRating.jsx` - Sistema de avaliações
- `StatusBadge.jsx` - Badges de status
- `WhatsAppButton.jsx` - Botão flutuante WhatsApp
- `PriceCalculator.jsx` - Calculadora de preços

### Páginas

Localização: `src/pages/`

**Públicas:**
- `Home.jsx` - Página inicial
- `Precos.jsx` - Tabela de preços
- `Cadastro.jsx` - Registro de usuários

**Cliente:**
- `ClientDashboard.jsx` - Dashboard do cliente
- `BookCleaning.jsx` - Agendar limpeza
- `ClientRequests.jsx` - Histórico de pedidos
- `ClientProfilePage.jsx` - Perfil do cliente

**Faxineira:**
- `CleanerDashboard.jsx` - Dashboard da faxineira
- `CleanerSchedule.jsx` - Agenda
- `CleanerAvailability.jsx` - Disponibilidade
- `CleanerProfile.jsx` - Perfil profissional
- `CleanerRewards.jsx` - Recompensas
- `CleanerWithdrawals.jsx` - Saques

**Admin:**
- `AdminDashboard.jsx` - Dashboard admin
- `AdminCleaners.jsx` - Gerenciar faxineiras
- `AdminRequests.jsx` - Gerenciar pedidos
- `AdminWithdrawals.jsx` - Gerenciar saques
- `AdminSettings.jsx` - Configurações
- `AdminSupport.jsx` - Suporte

---

## 🔗 Rotas da aplicação

```
/                      → Home (público)
/precos                → Tabela de preços (público)
/cadastro              → Registro (público)

/dashboard             → Dashboard do cliente
/agendar               → Agendar limpeza
/meus-pedidos          → Histórico de pedidos
/perfil                → Perfil do cliente

/minhas-faxinas        → Dashboard da faxineira
/agenda                → Agenda
/disponibilidade       → Disponibilidade
/perfil-faxineira      → Perfil profissional
/recompensas           → Recompensas
/saques                → Saques

/admin                 → Dashboard admin
/admin/faxineiras      → Gerenciar faxineiras
/admin/pedidos         → Gerenciar pedidos
/admin/saques          → Gerenciar saques
/admin/configuracoes   → Configurações
/admin/suporte         → Suporte
```

---

## 🎨 Tema

O aplicativo suporta tema claro e escuro automaticamente:

```jsx
import { useTheme } from '@/contexts/ThemeContext'

function MyComponent() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button onClick={toggleTheme}>
      Tema atual: {theme}
    </button>
  )
}
```

---

## 📡 API Base44

Usar o cliente pré-configurado:

```jsx
import { base44 } from '@/api/base44Client'

// Login
await base44.auth.login(email, password)

// Logout
base44.auth.logout()

// Obter usuário
const user = await base44.auth.me()

// Listar entidades
const cleaners = await base44.entities.CleanerProfile.list()

// Criar
await base44.entities.CleaningRequest.create(data)

// Atualizar
await base44.entities.CleaningRequest.update(id, data)

// Deletar
await base44.entities.CleaningRequest.delete(id)
```

---

## 🎯 Comandos npm

```bash
# Iniciar desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Lint
npm run lint

# Format
npm run format
```

---

## 🐛 Troubleshooting

### Porta 5173 já está em uso
```bash
# Use outra porta
npm run dev -- --port 3000
```

### Erro de importação com @
Certifique-se de que `vite.config.js` tem o alias configurado corretamente.

### Problema com Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
```

### Erro de build
```bash
# Limpe node_modules e reinstale
rm -rf node_modules
npm install
npm run build
```

---

## 📞 Suporte

Para dúvidas sobre o setup, consulte:
- Documentação Vite: https://vitejs.dev
- Documentação React: https://react.dev
- Documentação Tailwind: https://tailwindcss.com
- Documentação React Router: https://reactrouter.com

---

**Status:** ✅ Pronto para iniciar!
