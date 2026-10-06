# Barbearia SaaS

Sistema completo de agendamento para barbearias.

## 🚀 Stack

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem
- **Tailwind CSS** - Estilização
- **Prisma** - ORM
- **Clerk** - Autenticação
- **PostgreSQL** - Banco de dados

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Configurar banco de dados local (ou usar Supabase/Neon)
# Editar .env com sua DATABASE_URL

# Rodar migrações
npx prisma migrate dev --name init

# Gerar Prisma Client
npx prisma generate

# Configurar Clerk
# 1. Criar conta em https://clerk.com
# 2. Criar aplicação
# 3. Copiar as chaves para .env

# Rodar projeto
npm run dev
```

## 🔧 Configuração

### 1. Banco de Dados

Opções:
- **Local**: PostgreSQL instalado localmente
- **Supabase**: https://supabase.com (free tier)
- **Neon**: https://neon.tech (free tier)

Atualize `DATABASE_URL` no `.env`

### 2. Clerk (Auth)

1. Acesse https://clerk.com
2. Crie uma aplicação
3. Copie as chaves:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
4. Cole no `.env`

### 3. Primeira Migração

```bash
npx prisma migrate dev --name init
```

## 📂 Estrutura

```
app/
├── (auth)/
│   ├── sign-in/
│   └── sign-up/
├── dashboard/
│   ├── agenda/
│   ├── clientes/
│   ├── profissionais/
│   └── servicos/
├── api/
└── [slug]/          # Página pública de agendamento

prisma/
└── schema.prisma    # Schema do banco

lib/
├── db.ts           # Prisma client
└── utils.ts        # Funções auxiliares
```

## 🎯 Funcionalidades

### MVP (v1)
- ✅ Landing page
- ✅ Cadastro de barbearia
- ✅ Dashboard admin
- ✅ CRUD de serviços
- ✅ CRUD de profissionais
- ✅ CRUD de clientes (CRM)
- ✅ Gestão de agenda
- 🔲 Página pública de agendamento
- 🔲 Notificações WhatsApp

### Próximas versões
- 🔲 Pagamento recorrente (Stripe)
- 🔲 Relatórios
- 🔲 Multi-idioma
- 🔲 App mobile

## 💰 Modelo de Negócio

- **R$ 37/mês** por barbearia
- **30 dias grátis** para teste
- Agendamentos ilimitados
- Até 5 profissionais

## 🚢 Deploy

```bash
# Deploy na Vercel
npm install -g vercel
vercel deploy --prod
```

Ou use o script configurado:
```bash
powershell -ExecutionPolicy Bypass -File "C:\Users\thiag\.claude\scripts\vercel-deploy.ps1"
```

## 📝 Licença

Proprietário - Todos os direitos reservados
