# 🚀 Setup Local com Ngrok

## 📋 Pré-requisitos

1. **Node.js** instalado (v18 ou superior)
2. **Ngrok** instalado e configurado
3. **Firebase** configurado (se necessário)

---

## 🔧 Passo 1: Instalar Dependências

```bash
npm install
```

---

## 🔧 Passo 2: Configurar Variáveis de Ambiente

1. Copie o arquivo de exemplo:
```bash
cp .env.local.example .env.local
```

2. Edite `.env.local` com suas credenciais:
   - Firebase (se necessário)
   - Meta Pixel (já configurado)
   - URLs de tracking

---

## 🔧 Passo 3: Iniciar o Servidor Local

```bash
npm run dev
```

O servidor estará rodando em: `http://localhost:3000`

---

## 🔧 Passo 4: Configurar Ngrok

### Opção 1: Ngrok via Terminal

1. Abra um novo terminal
2. Execute:
```bash
ngrok http 3000
```

3. Copie a URL HTTPS gerada (ex: `https://abc123.ngrok.io`)
4. Atualize `.env.local`:
```env
NEXT_PUBLIC_NGROK_URL=https://abc123.ngrok.io
```

### Opção 2: Ngrok com Authtoken (Recomendado)

1. Crie conta em: https://dashboard.ngrok.com
2. Copie seu authtoken
3. Configure:
```bash
ngrok config add-authtoken SEU_AUTHTOKEN
```

4. Inicie o túnel:
```bash
ngrok http 3000
```

---

## 🔧 Passo 5: Atualizar Script de Tracking

O script já está configurado para usar:
- **Desenvolvimento:** `http://localhost:3000/api/tracking/...`
- **Produção:** URL do ngrok ou domínio real

### Para testar com ngrok:

1. Atualize `.env.local`:
```env
NEXT_PUBLIC_TRACKING_URL=https://abc123.ngrok.io/api/tracking/ad75cfdc-cba2-4d70-a5ab-c94881f76c39.js
```

2. Reinicie o servidor:
```bash
npm run dev
```

---

## 🧪 Testando

### 1. Teste Local
- Acesse: `http://localhost:3000`
- Acesse: `http://localhost:3000/teste`
- Verifique o console (F12) para erros

### 2. Teste via Ngrok
- Acesse: `https://abc123.ngrok.io`
- Acesse: `https://abc123.ngrok.io/teste`
- Verifique se o tracking está funcionando

### 3. Teste de Tracking
- Abra o console (F12)
- Verifique requisições para `/api/tracking/...`
- Verifique se os eventos estão sendo enviados

---

## 🔍 Verificando Logs

### Console do Navegador (F12)
- **Console:** Erros JavaScript
- **Network:** Requisições HTTP
- **Application:** LocalStorage, Cookies

### Terminal do Next.js
- Logs do servidor
- Erros de build
- Requisições recebidas

### Ngrok Dashboard
- Acesse: https://dashboard.ngrok.com
- Veja requisições em tempo real
- Inspecione headers e body

---

## 🐛 Troubleshooting

### Erro: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Port 3000 already in use"
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Ngrok não conecta
1. Verifique se o servidor está rodando na porta 3000
2. Verifique se o authtoken está configurado
3. Tente reiniciar o ngrok

### Tracking não funciona
1. Verifique se a URL no `.env.local` está correta
2. Verifique o console do navegador para erros
3. Verifique se o endpoint `/api/tracking/...` existe

---

## 📝 Checklist de Setup

- [ ] Node.js instalado
- [ ] Dependências instaladas (`npm install`)
- [ ] Arquivo `.env.local` criado e configurado
- [ ] Servidor rodando (`npm run dev`)
- [ ] Ngrok configurado e rodando
- [ ] URL do ngrok atualizada no `.env.local`
- [ ] Teste local funcionando
- [ ] Teste via ngrok funcionando
- [ ] Tracking funcionando

---

## 🚀 Próximos Passos

1. ✅ Testar tudo localmente
2. ✅ Verificar tracking funcionando
3. ✅ Testar integração com Firebase (se necessário)
4. ✅ Fazer deploy para produção quando tudo estiver OK

---

## 💡 Dicas

- Use **ngrok** para testar webhooks do Telegram
- Use **ngrok** para testar em dispositivos móveis
- Mantenha o `.env.local` no `.gitignore` (já está)
- Use variáveis de ambiente diferentes para dev/prod

