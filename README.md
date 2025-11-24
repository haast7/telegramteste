# Landing Page - Grupo do Telegram

Uma página simples e moderna para incentivar pessoas a entrarem no grupo do Telegram.

## 🚀 Início Rápido

### Desenvolvimento Local

1. Instale as dependências:
```bash
npm install
```

2. Crie o arquivo `.env.local`:
```env
NEXT_PUBLIC_TRACKING_URL=http://localhost:3000/api/tracking/ad75cfdc-cba2-4d70-a5ab-c94881f76c39.js
```

3. Execute o servidor:
```bash
npm run dev
```

4. Acesse [http://localhost:3000](http://localhost:3000)

### Testando com Ngrok

Para testar webhooks e acesso externo:

1. Em outro terminal, inicie o ngrok:
```bash
ngrok http 3000
```

2. Atualize `.env.local` com a URL do ngrok:
```env
NEXT_PUBLIC_TRACKING_URL=https://abc123.ngrok.io/api/tracking/ad75cfdc-cba2-4d70-a5ab-c94881f76c39.js
```

3. Reinicie o servidor

📚 **Veja `SETUP_LOCAL.md` para guia completo de desenvolvimento local**

## 📝 Personalização

O link do grupo do Telegram já está configurado: `https://t.me/+Vn3El9UmoBE0NDNh`

## 🚀 Deploy no Vercel

O projeto está pronto para deploy no Vercel. Siga os passos:

1. **Conecte seu repositório ao Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Importe seu repositório Git

2. **Configuração automática:**
   - O Vercel detectará automaticamente o Next.js
   - As configurações do `vercel.json` serão aplicadas automaticamente

3. **Deploy:**
   - Clique em "Deploy"
   - Aguarde o build completar
   - Sua página estará no ar!

**Scripts incluídos:**
- ✅ Tracktel (haast.com.br/track.js)
- ✅ Facebook Pixel (ID: 847289988241178)
- ✅ Link do Telegram configurado

## 🛠️ Tecnologias

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Scripts de tracking configurados

