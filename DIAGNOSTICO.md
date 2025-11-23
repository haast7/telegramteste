# 🔍 Guia de Diagnóstico - Tracking Telegram

## ⚠️ PROBLEMA IDENTIFICADO NO CÓDIGO

Você tem **2 scripts de tracking diferentes** rodando ao mesmo tempo no `layout.tsx`:
1. Script antigo (linha 19-91) - `funnelId: 'Q7viyHiSl6IW7nDbmpvS'`
2. Script novo (linha 122-175) - `funnelId: 'Wg1cB814XUjy1ZSUcF3o'`

**Isso pode causar conflitos!** Vamos limpar isso primeiro.

---

## 📋 CHECKLIST DE DIAGNÓSTICO

### 1️⃣ **VERIFICAR O CÓDIGO (Frontend)**

#### ✅ Script está carregando?
Abra o Console do navegador (F12) e verifique:

```javascript
// Cole no console:
console.log('Funnel ID:', window.telegramTracker ? 'Script carregado' : 'Script NÃO carregado');
console.log('URL atual:', window.location.href);
console.log('Allowed URLs:', ["https://telegramteste.vercel.app"]);
```

#### ✅ Botão tem a classe correta?
Inspecione o botão e verifique se tem `class="telegram-button"`

#### ✅ URL está nas permitidas?
O script só funciona se a URL incluir `"https://telegramteste.vercel.app"`
- ✅ Funciona: `https://telegramteste.vercel.app/teste`
- ✅ Funciona: `https://telegramteste.vercel.app/`
- ❌ NÃO funciona: `http://localhost:3000/teste` (em desenvolvimento)

---

### 2️⃣ **VERIFICAR A INTEGRAÇÃO (Backend)**

#### ✅ Cloud Functions estão ativas?
Teste manualmente no navegador:

```bash
# Teste trackPageview
curl -X POST https://us-central1-telegram-tracker-28650.cloudfunctions.net/trackPageview \
  -H "Content-Type: application/json" \
  -d '{"funnelId":"Wg1cB814XUjy1ZSUcF3o","url":"https://telegramteste.vercel.app/teste"}'

# Teste trackClick
curl -X POST https://us-central1-telegram-tracker-28650.cloudfunctions.net/trackClick \
  -H "Content-Type: application/json" \
  -d '{"funnelId":"Wg1cB814XUjy1ZSUcF3o","url":"https://telegramteste.vercel.app/teste"}'
```

**Resposta esperada:** Status 200 ou 201 (não erro 404/500)

#### ✅ Firestore está configurado?
- Verifique se a collection existe
- Verifique se as regras de segurança permitem escrita
- Verifique se o `funnelId` está correto no banco

---

### 3️⃣ **VERIFICAR O NAVEGADOR (Client-side)**

#### ✅ Console mostra erros?
Abra F12 → Console e procure por:
- ❌ `CORS error` → Problema de permissões no backend
- ❌ `404 Not Found` → Cloud Function não existe ou URL errada
- ❌ `Network error` → Problema de conexão ou CORS
- ❌ `TypeError` → Problema no código JavaScript

#### ✅ Network tab mostra requisições?
F12 → Network → Filtre por "trackPageview" ou "trackClick"
- ✅ Deve aparecer requisições POST quando a página carrega
- ✅ Deve aparecer requisições POST quando clica no botão

#### ✅ Meta Pixel está carregando?
No console, digite:
```javascript
typeof fbq !== 'undefined' ? 'Meta Pixel OK' : 'Meta Pixel NÃO carregou'
```

---

### 4️⃣ **VERIFICAR O DEPLOY (Vercel)**

#### ✅ Deploy está atualizado?
- Verifique se o último commit foi deployado
- Verifique se não há erros no build
- Verifique se a URL de produção está correta

#### ✅ Variáveis de ambiente?
Se o código usa variáveis de ambiente, verifique se estão configuradas no Vercel

---

## 🛠️ TESTES RÁPIDOS

### Teste 1: Verificar se o script executa
```javascript
// Cole no console da página:
(function() {
  const currentUrl = window.location.href;
  const allowedUrls = ["https://telegramteste.vercel.app"];
  const isAllowed = allowedUrls.some(url => currentUrl.includes(url));
  console.log('URL permitida?', isAllowed);
  console.log('URL atual:', currentUrl);
})();
```

### Teste 2: Testar clique manual
```javascript
// Cole no console e clique no botão:
document.querySelector('.telegram-button').click();
// Verifique se aparece requisição no Network tab
```

### Teste 3: Testar fetch manual
```javascript
// Cole no console:
fetch('https://us-central1-telegram-tracker-28650.cloudfunctions.net/trackPageview', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    funnelId: 'Wg1cB814XUjy1ZSUcF3o', 
    url: window.location.href 
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

---

## 🎯 PRÓXIMOS PASSOS

1. **Remover script duplicado** (vou fazer isso agora)
2. **Testar em produção** (não funciona em localhost)
3. **Verificar console do navegador** para erros
4. **Verificar Network tab** para requisições
5. **Testar Cloud Functions** manualmente

---

## 📞 O QUE ME ENVIAR PARA DIAGNOSTICAR

1. Screenshot do Console (F12 → Console)
2. Screenshot do Network tab (F12 → Network → Filtre por "track")
3. URL exata que você está testando
4. Resposta do teste manual das Cloud Functions (curl acima)

