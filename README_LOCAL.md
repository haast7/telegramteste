# 🚀 Setup Local - Desenvolvimento com Ngrok

## ⚡ Início Rápido

### 1. Instalar Dependências
```bash
npm install
```

### 2. Criar Arquivo de Ambiente
Crie um arquivo `.env.local` na raiz do projeto:

```env
# URL do tracking (use localhost em dev, ngrok em testes externos)
NEXT_PUBLIC_TRACKING_URL=http://localhost:3000/api/tracking/ad75cfdc-cba2-4d70-a5ab-c94881f76c39.js

# URL do ngrok (preencha quando ngrok estiver rodando)
# NEXT_PUBLIC_NGROK_URL=https://abc123.ngrok.io
```

### 3. Iniciar Servidor
```bash
npm run dev
```

Servidor rodando em: **http://localhost:3000**

### 4. Configurar Ngrok (em outro terminal)
```bash
ngrok http 3000
```

Copie a URL HTTPS gerada e atualize `.env.local`:
```env
NEXT_PUBLIC_TRACKING_URL=https://abc123.ngrok.io/api/tracking/ad75cfdc-cba2-4d70-a5ab-c94881f76c39.js
```

Reinicie o servidor: `npm run dev`

---

## 🧪 Testando

### Teste Local
- ✅ `http://localhost:3000` - Página principal
- ✅ `http://localhost:3000/teste` - Página de teste

### Teste via Ngrok
- ✅ `https://abc123.ngrok.io` - Página principal
- ✅ `https://abc123.ngrok.io/teste` - Página de teste

### Verificar Tracking
1. Abra o console (F12)
2. Vá na aba **Network**
3. Procure por requisições para `/api/tracking/...`
4. Verifique se estão sendo enviadas

---

## 📝 Checklist

- [ ] `npm install` executado
- [ ] Arquivo `.env.local` criado
- [ ] Servidor rodando (`npm run dev`)
- [ ] Ngrok configurado (`ngrok http 3000`)
- [ ] URL do ngrok atualizada no `.env.local`
- [ ] Teste local funcionando
- [ ] Teste via ngrok funcionando
- [ ] Tracking funcionando

---

## 🔍 Troubleshooting

**Erro: Port 3000 em uso**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Ngrok não conecta**
- Verifique se o servidor está rodando
- Verifique se o authtoken está configurado: `ngrok config add-authtoken SEU_TOKEN`

**Tracking não funciona**
- Verifique se a URL no `.env.local` está correta
- Verifique o console do navegador (F12)
- Verifique se o endpoint existe

---

## 📚 Documentação Completa

Veja `SETUP_LOCAL.md` para guia detalhado.

