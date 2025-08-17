# 🚌 STL Turismo - Sistema Completo de Reservas

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-Latest-green.svg)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Ready-orange.svg)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue.svg)](https://tailwindcss.com/)

Sistema completo de turismo com gestão de pacotes, reservas e integração Firebase. Interface moderna, responsiva e otimizada para conversões.

## 🌟 Características Principais

### 🎯 **Funcionalidades Core**
- ✅ **Catálogo de Pacotes** - Pacotes com datas específicas e destinos detalhados
- ✅ **Sistema de Reservas** - Fluxo completo de 4 etapas com WhatsApp/Email
- ✅ **Gestão de Destinos** - Destinos organizados e categorizados
- ✅ **Páginas Institucionais** - Sobre, Contato, Frota com navegação inteligente
- ✅ **Integração Firebase** - Dados reais com fallback para mock
- ✅ **Responsive Design** - Funciona perfeitamente em mobile/desktop

### 🎨 **Design & UX**
- **Cores da marca**: Branco, Azul (#2563EB) e Laranja (#F97316)
- **Animações suaves**: Intersection Observer para elementos
- **Navegação inteligente**: Breadcrumbs e quick navigation
- **Loading states**: Feedback visual em todas as operações
- **Carrossel hero**: Imagens rotativas dos destinos

### 🔧 **Tecnologia**
- **React 19** + **Vite** - Performance e desenvolvimento rápido
- **Tailwind CSS** - Estilização eficiente e consistente
- **Firebase** - Backend como serviço (BaaS)
- **React Router** - Navegação SPA
- **Lucide React** - Ícones modernos

## 🚀 Instalação e Configuração

### **Pré-requisitos**
- Node.js 18+
- npm ou yarn
- Conta Firebase (opcional)

### **1. Clone e Instale**
```bash
git clone https://github.com/Ferreira2912/stl-turismo.git
cd stl-turismo
npm install
```

### **2. Configure Firebase (Opcional)**
```bash
# Copie o arquivo de exemplo
cp .env.local.example .env.local

# Edite .env.local com suas credenciais Firebase
# VITE_FIREBASE_API_KEY=sua_api_key
# VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
# etc...
```

### **3. Execute o Projeto**
```bash
npm run dev
```

Acesse: `http://localhost:5173`

## 📱 Funcionalidades Detalhadas

### **🎫 Sistema de Pacotes**
```javascript
// Estrutura de pacote
{
  id: "1",
  title: "Gramado Encantado",
  destination: "Gramado, RS",
  departureDate: "2025-03-15",
  returnDate: "2025-03-18",
  duration: "4 dias / 3 noites",
  price: 1250,
  highlights: [...],
  includes: [...]
}
```

### **📋 Sistema de Reservas**
- **Etapa 1**: Dados pessoais e endereço
- **Etapa 2**: Informações da viagem e acompanhantes
- **Etapa 3**: Forma de pagamento e parcelamento
- **Etapa 4**: Confirmação e envio

### **🔄 Integração Firebase**
- **Automática**: Tenta Firebase primeiro
- **Fallback**: Usa dados mock se Firebase falhar
- **Logs informativos**: Console mostra qual fonte está sendo usada

## 🗂️ Estrutura do Projeto

```
src/
├── components/
│   ├── common/          # Componentes reutilizáveis
│   ├── home/           # Componentes da homepage
│   ├── reservation/    # Sistema de reservas
│   └── ui/            # Componentes de interface
├── hooks/             # Hooks customizados
├── pages/            # Páginas da aplicação
├── services/         # Integração Firebase
├── data/            # Dados mock
├── styles/          # Estilos globais
└── utils/           # Utilitários
```

## 🎨 Páginas Implementadas

| Página | Rota | Descrição |
|--------|------|-----------|
| **Home** | `/` | Landing page com destaque dos pacotes |
| **Pacotes** | `/pacotes` | Catálogo completo com filtros |
| **Detalhes** | `/packages/:id` | Página individual do pacote |
| **Sobre** | `/sobre` | História da empresa |
| **Contato** | `/contato` | Formulários e localização |
| **Frota** | `/frota` | Veículos com galeria de fotos |

## 🔥 Firebase Integration

### **Collections Implementadas**
- `packages` - Pacotes de viagem
- `destinations` - Destinos disponíveis  
- `reservations` - Reservas dos clientes
- `leads` - Leads de contato

## 📊 Métricas e Analytics

### **Dados Rastreados**
- Views de pacotes
- Número de reservas
- Fonte de leads (WhatsApp, Email, Formulário)
- Performance de carregamento

### **Firebase Analytics** (Futuro)
- Funil de conversão
- Páginas mais visitadas
- Tempo de permanência
- Taxa de rejeição

## 🛠️ Desenvolvimento

### **Scripts Disponíveis**
```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # Verificar código
```

### **Ferramentas de Debug**
- **Console Logs**: Rastreamento detalhado de operações Firebase/Mock

### **Contribuição**
1. Fork o projeto
2. Crie uma branch feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Add MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 🔮 Roadmap

### **Próximas Funcionalidades**
- [ ] **Admin Panel** - Gestão de pacotes pelo painel
- [ ] **Blog System** - Sistema de blog integrado
- [ ] **Reviews** - Sistema de avaliações
- [ ] **Chat Online** - Suporte em tempo real
- [ ] **PWA** - App progressivo
- [ ] **Multilingual** - Suporte a múltiplos idiomas

### **Melhorias Técnicas**
- [ ] **Server-Side Rendering** (SSR)
- [ ] **Image Optimization** 
- [ ] **Performance Monitoring**
- [ ] **A/B Testing Framework**
- [ ] **Advanced Analytics**

## 📄 Documentação Adicional

- [Configuração Firebase](./FIREBASE_SETUP.md)
- [Guia de Estilo](./docs/STYLE_GUIDE.md)
- [API Reference](./docs/API.md)

## 🤝 Suporte

- **Email**: contato@stlturismo.com.br
- **WhatsApp**: +55 (11) 99999-9999
- **Issues**: [GitHub Issues](https://github.com/Ferreira2912/stl-turismo/issues)

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

---

**Desenvolvido com ❤️ para STL Turismo**

*Sistema completo de reservas com tecnologia moderna e experiência excepcional do usuário.*+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
