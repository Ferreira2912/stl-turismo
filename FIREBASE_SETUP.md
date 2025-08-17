# Integração Firebase - STL Turismo

## 📋 Configuração

### 1. Criar Projeto Firebase
1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Nome do projeto: `stl-turismo`
4. Ative Google Analytics (opcional)

### 2. Configurar Firestore Database
1. No console Firebase, vá em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Escolha modo de produção ou teste
4. Selecione localização (ex: `southamerica-east1`)

### 3. Configurar Authentication (opcional)
1. Vá em "Authentication" > "Sign-in method"
2. Ative métodos desejados (Email/senha, Google, etc.)

### 4. Obter Configurações
1. Vá em "Configurações do projeto" > "Geral"
2. Na seção "Seus apps", clique em "Web" (`</>`)
3. Registre o app: `STL Turismo`
4. Copie as configurações

### 5. Configurar Variáveis de Ambiente
Crie o arquivo `.env` na raiz do projeto:

```env
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=stl-turismo.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=stl-turismo
VITE_FIREBASE_STORAGE_BUCKET=stl-turismo.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
```

## 🗄️ Estrutura do Banco

### Collections

#### `packages`
```javascript
{
  id: "1",
  title: "Gramado Encantado",
  subtitle: "A magia da Serra Gaúcha",
  destination: "Gramado, RS",
  departureDate: "2025-03-15",
  returnDate: "2025-03-18",
  image: "url_da_imagem",
  price: 1250,
  originalPrice: 1599,
  duration: "4 dias / 3 noites",
  featured: true,
  active: true,
  highlights: ["Hotel 4 estrelas", "..."],
  description: "Texto descritivo...",
  includes: ["Transporte", "..."],
  createdAt: timestamp,
  updatedAt: timestamp,
  priority: 100,
  views: 0,
  bookings: 0
}
```

#### `destinations`
```javascript
{
  id: "gramado",
  name: "Gramado",
  state: "RS",
  country: "Brasil",
  description: "Cidade encantadora...",
  image: "url_da_imagem",
  featured: true,
  active: true,
  createdAt: timestamp,
  updatedAt: timestamp,
  packagesCount: 0
}
```

#### `reservations`
```javascript
{
  personalInfo: {
    name: "João Silva",
    email: "joao@email.com",
    phone: "(11) 99999-9999",
    cpf: "000.000.000-00",
    birthDate: "1990-01-01",
    address: { ... }
  },
  tripInfo: {
    packageId: "1",
    packageName: "Gramado Encantado",
    destination: "Gramado, RS",
    departureDate: "2025-03-15",
    returnDate: "2025-03-18",
    duration: "4 dias / 3 noites",
    passengers: 2,
    roomType: "double",
    specialRequests: ""
  },
  companions: [...],
  paymentInfo: {
    totalValue: 2500,
    paymentMethod: "cartao",
    installments: 12,
    observations: ""
  },
  channel: "whatsapp", // ou "email"
  source: "website",
  status: "pending", // pending, confirmed, cancelled
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### `leads`
```javascript
{
  name: "Maria Silva",
  email: "maria@email.com",
  phone: "(11) 88888-8888",
  message: "Gostaria de informações...",
  source: "contact_form",
  status: "new", // new, contacted, converted
  createdAt: timestamp,
  updatedAt: timestamp
}
```

##  Fallback System

A aplicação implementa um sistema de fallback:

1. **Primeira tentativa**: Carrega dados do Firebase
2. **Fallback**: Se Firebase falhar, usa dados mock
3. **Indicador visual**: Mostra qual fonte está sendo usada (apenas em dev)

## 📊 Monitoramento

### Console do Navegador
- ✅ `📡 Dados carregados do Firebase: X pacotes`
- ⚠️ `⚠️ Firebase não disponível, usando dados mock`
- ❌ `❌ Erro ao carregar pacotes: erro`

## 🔧 Regras de Segurança Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Leitura pública para packages e destinations
    match /packages/{document} {
      allow read: if true;
      allow write: if request.auth != null; // Apenas usuários autenticados
    }
    
    match /destinations/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Reservas e leads - apenas escrita pública, leitura restrita
    match /reservations/{document} {
      allow create: if true; // Permitir criação de reservas
      allow read, update, delete: if request.auth != null;
    }
    
    match /leads/{document} {
      allow create: if true; // Permitir criação de leads
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

## ✅ Status da Implementação

- [x] Configuração Firebase
- [x] Serviços de database
- [x] Hooks com fallback
- [x] Sistema de reservas
- [x] Logs informativos
- [x] Documentação

## 🔮 Próximos Passos

1. **Analytics**: Implementar Firebase Analytics
2. **Performance**: Otimizar queries com índices
3. **Admin Panel**: Criar painel administrativo
4. **Storage**: Implementar upload de imagens
5. **Functions**: Criar Cloud Functions para automações
