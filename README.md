# Limpador - Plataforma de Serviços de Limpeza

## 📋 Visão Geral

Limpador é uma plataforma web completa que conecta clientes com profissionais de limpeza confiáveis. O sistema permite agendamento fácil, pagamento seguro e gerenciamento de serviços de limpeza residencial.

## 🎯 Funcionalidades Principais

### Para Clientes
- ✅ Cadastro e perfil completo
- ✅ Agendamento de serviços de limpeza
- ✅ Cálculo automático de preços
- ✅ Diferentes tipos de serviço (Padrão, Com Organização, Pós-Obra)
- ✅ Opção de incluir produtos de limpeza
- ✅ Acompanhamento de solicitações
- ✅ Avaliação de profissionais
- ✅ Suporte via WhatsApp

### Para Profissionais (Faxineiras)
- ✅ Cadastro e verificação de perfil
- ✅ Visualização de serviços disponíveis
- ✅ Aceitação/Rejeição de pedidos
- ✅ Acompanhamento de agenda
- ✅ Sistema de recompensas (5 estrelas)
- ✅ Gerenciamento de saques
- ✅ Disponibilidade customizável

### Para Administradores
- ✅ Dashboard com estatísticas
- ✅ Gerenciamento de faxineiras
- ✅ Aprovação de pedidos e saques
- ✅ Configuração de preços
- ✅ Suporte ao usuário

## 🏗️ Arquitetura do Projeto

### Componentes Principais

#### Páginas de Cliente
- `ClientDashboard.jsx` - Dashboard principal do cliente
- `ClientProfilePage.jsx` - Perfil e endereços do cliente
- `ClientRequests.jsx` - Histórico de pedidos e avaliações
- `BookCleaning.jsx` - Agendamento de serviços
- `Precos.jsx` - Tabela de preços

#### Páginas de Profissional
- `CleanerDashboard.jsx` - Dashboard da faxineira
- `CleanerProfile.jsx` - Perfil e informações da faxineira
- `CleanerSchedule.jsx` - Agenda de serviços
- `CleanerAvailability.jsx` - Configuração de disponibilidade
- `CleanerRewards.jsx` - Recompensas e bônus
- `CleanerWithdrawals.jsx` - Solicitação de saques

#### Páginas de Admin
- `AdminDashboard.jsx` - Dashboard administrativo
- `AdminCleaners.jsx` - Gerenciamento de faxineiras
- `AdminRequests.jsx` - Gerenciamento de pedidos
- `AdminWithdrawals.jsx` - Aprovação de saques
- `AdminSupport.jsx` - Suporte e estatísticas
- `AdminSettings.jsx` - Configurações do sistema

#### Componentes Compartilhados
- `Layout.jsx` - Layout principal com navegação
- `Home.jsx` - Página inicial
- `Cadastro.jsx` - Registro de usuários
- `PriceCalculator.jsx` - Calculadora de preços
- `StatusBadge.jsx` - Badges de status
- `StarRating.jsx` - Sistema de avaliações
- `WhatsAppButton.jsx` - Botão de contato WhatsApp
- `ThemeContext.jsx` - Gerenciamento de tema (light/dark)

### Schemas de Dados

O projeto utiliza as seguintes entidades:

1. **CleanerProfile** - Perfil de faxineira
2. **ClientProfile** - Perfil de cliente
3. **CleaningRequest** - Pedido de limpeza
4. **CleanerAvailability** - Disponibilidade da faxineira
5. **Reward** - Recompensas e bônus
6. **Withdrawal** - Saques de profissionais
7. **Fine** - Multas e penalidades
8. **AutomaticPayment** - Pagamentos automáticos
9. **PaymentSettings** - Configurações de pagamento
10. **RegularJob** - Serviços recorrentes
11. **CleaningRequestHistory** - Histórico de alterações

## 💰 Estrutura de Preços

### Fórmula de Cálculo

- **1ª hora**: R$ 40
- **Horas adicionais**: R$ 20 cada
- **Produtos de limpeza**: R$ 30 (opcional)
- **Taxa da agência**: 40% do valor base

### Tipos de Serviço

- **Padrão**: Multiplicador 1x
- **Com Organização**: Multiplicador 1.1x
- **Pós-Obra**: Multiplicador 1.5x

### Exemplo
- Serviço padrão de 2 horas sem produtos:
  - Base: R$ 60 (40 + 20)
  - Taxa: R$ 24 (40%)
  - **Total: R$ 84**

## 🎁 Sistema de Recompensas

- **Requisito**: 10 avaliações 5⭐ consecutivas
- **Bônus**: R$ 50 ou R$ 100 (configurável)
- **Aplicação**: Automática ao atingir o limite

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React.js
- **Roteamento**: React Router
- **API**: Base44 (backend customizado)
- **Gerenciamento de Estado**: TanStack React Query
- **UI Components**: shadcn/ui
- **Ícones**: Lucide React
- **Animações**: Framer Motion
- **Styling**: Tailwind CSS
- **Datas**: date-fns
- **Notificações**: Sonner

## 🚀 Como Iniciar

### Pré-requisitos
- Node.js 16+
- npm ou yarn
- Acesso à API Base44

### Instalação

```bash
# Clonar o repositório
git clone <repo-url>
cd limpador

# Instalar dependências
npm install

# Configurar variáveis de ambiente
# Criar arquivo .env.local com as credenciais da API

# Iniciar servidor de desenvolvimento
npm run dev
```

### Variáveis de Ambiente

```env
VITE_BASE44_API_URL=<url-da-api>
VITE_BASE44_CLIENT_ID=<client-id>
VITE_BASE44_CLIENT_SECRET=<client-secret>
```

## 📊 Fluxos Principais

### Fluxo de Agendamento

1. Cliente acessa **BookCleaning**
2. Seleciona tipo de serviço, horas e opções
3. Escolhe data, hora e endereço
4. Revisa preços e confirma pagamento
5. Faxineira recebe notificação
6. Sistema atribui faxineira automaticamente ou cliente escolhe
7. Faxineira aceita ou rejeita
8. Após conclusão, cliente avalia o serviço

### Fluxo de Saque

1. Faxineira acumula ganhos
2. Acessa **CleanerWithdrawals** e solicita saque
3. Admin recebe notificação em **AdminWithdrawals**
4. Admin aprova ou rejeita
5. PIX é processado automaticamente
6. Faxineira recebe notificação

## 🔐 Autenticação

- Integração com Base44 Auth
- Verificação automática de usuários
- Roles: `client`, `cleaner`, `admin`
- Proteção de rotas por tipo de usuário

## 📱 Responsive Design

- Desktop-first design
- Totalmente responsivo para tablets
- Mobile-friendly com navegação otimizada
- Suporte para tema claro/escuro

## 🐛 Bugs Conhecidos e Correções

### Corrigidos
- ✅ Import correto de `createPageUrl` em Layout.jsx
- ✅ Schema de CleaningRequest atualizado com todos os campos

### Melhorias Implementadas
- ✅ Documentação completa do projeto
- ✅ Estrutura de schemas consolidada em formato TXT
- ✅ Validação de dados melhorada

## 📝 Notas Importantes

1. Todos os timestamps utilizam formato ISO 8601
2. Datas de agendamento usam formato YYYY-MM-DD
3. Horários utilizam formato HH:MM (24h)
4. Valores monetários em R$ (reais brasileiros)
5. Localização padrão: Rio Grande do Sul (RS)

## 🤝 Contribuindo

Para contribuir com melhorias:

1. Crie uma branch para sua feature
2. Faça commits descritivos
3. Push e abra um Pull Request
4. Aguarde revisão

## 📞 Suporte

Para dúvidas ou problemas:
- Contato via WhatsApp (integrado na plataforma)
- Email de suporte
- Chat in-app (admin)

## 📄 Licença

[Adicionar informação de licença]

---

**Versão**: 1.0.0  
**Última atualização**: Janeiro 2026