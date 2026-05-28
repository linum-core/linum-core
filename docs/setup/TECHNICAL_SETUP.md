# 🛠️ Arquitetura Técnica - Linum Core

## Setup Inicial

### Dependências Principais

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.0.0",
    "framer-motion": "^11.0.0",
    "axios": "^1.6.0",
    "zustand": "^4.5.0",
    "react-i18next": "^14.0.0",
    "i18next": "^23.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "eslint": "^8.50.0",
    "prettier": "^3.0.0"
  }
}
```

### Instalação

```bash
# Clone o repositório
git clone <repo-url>
cd linum-core-portifolio

# Instale dependências
npm install

# Setup das variáveis de ambiente
cp .env.example .env.local

# Desenvolvimento
npm run dev

# Build produção
npm run build
npm start
```

---

## 🎨 Sistema de Design

### Variáveis CSS (Tailwind)

```javascript
module.exports = {
  theme: {
    colors: {
      primary: "#1a1a1a",
      secondary: "#d4af37",
      accent: "#00d9ff",
    },
    fontFamily: {
      cinzel: ["Cinzel", "serif"],
      jomolhari: ["Jomolhari", "serif"],
      sans: ["Inter", "system-ui", "sans-serif"],
      mono: ["Fira Code", "monospace"],
    },
  },
};
```

---

## 🌍 Internacionalização (i18n)

### Estrutura

```
src/
├── i18n/
│   ├── config.ts
│   └── locales/
│       ├── en-US.json
│       ├── pt-BR.json
│       └── es-ES.json
```

---

## 🔌 API Integration Layer

### Estrutura

```typescript
// src/lib/api/client.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
```

---

## 📊 State Management (Zustand)

```typescript
import { create } from "zustand";

interface AppState {
  theme: "light" | "dark";
  locale: "en-US" | "pt-BR" | "es-ES";
  setTheme: (theme: "light" | "dark") => void;
  setLocale: (locale: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: "dark",
  locale: "en-US",
  setTheme: (theme) => set({ theme }),
  setLocale: (locale) => set({ locale }),
}));
```

---

## 🎬 Padrões de Animação

### Componente com Framer Motion

```typescript
import { motion } from 'framer-motion';

export function AnimatedCard({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </motion.div>
  );
}
```

---

## 🔒 Segurança

### Headers de Segurança

```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
      ],
    },
  ];
}
```

---

## 🚀 Deployment

### Build Checklist

- [ ] Remover console.logs
- [ ] Verificar variáveis de ambiente
- [ ] Rodar build: `npm run build`
- [ ] Testar em modo produção: `npm start`
- [ ] Verificar SEO metadata
- [ ] Testar performance (Lighthouse)
- [ ] Verificar acessibilidade

### Hosting Sugerido

- **Vercel** (Recomendado - otimizado para Next.js)
- **Netlify**
- **AWS Amplify**

---

**Última Atualização:** 2026-05-20
**Versão:** 1.0
