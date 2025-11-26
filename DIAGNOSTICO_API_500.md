# 🔍 Diagnóstico - Erros 500 nas APIs

## ⚠️ PROBLEMAS IDENTIFICADOS

Todos os endpoints da API estão retornando **500 Internal Server Error**:

- ❌ `GET /api/pixels` → 500
- ❌ `GET /api/channels` → 500
- ❌ `GET /api/domains` → 500
- ❌ `GET /api/analytics/dashboard` → 500
- ❌ `GET /api/analytics/retention` → 500
- ❌ `GET /api/postbacks` → 500
- ❌ `GET /api/analytics/chart?type=PageView` → 500

**Erro no Dashboard:** `[Dashboard] Erro ao carregar dados: Error: Erro desconhecido`

---

## 🔍 CAUSAS MAIS COMUNS

### 1️⃣ **Firebase não Configurado**

**Sintoma:** Todos os endpoints retornam 500

**Verificar:**
```javascript
// Verifique se o Firebase está inicializado
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // ...
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
```

**Solução:**
1. Verifique variáveis de ambiente no Vercel
2. Confirme que o Firebase está configurado
3. Verifique se as credenciais estão corretas

---

### 2️⃣ **Variáveis de Ambiente Faltando**

**Sintoma:** Erro ao acessar `process.env.*`

**Verificar no Vercel:**
1. Settings → Environment Variables
2. Confirme que TODAS estão configuradas:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `FIREBASE_PRIVATE_KEY` (server-side)
   - `FIREBASE_CLIENT_EMAIL` (server-side)

**Solução:**
- Adicione todas as variáveis necessárias
- Faça um novo deploy após adicionar

---

### 3️⃣ **Firestore Security Rules Bloqueando**

**Sintoma:** Erro 500 ao tentar ler/escrever no Firestore

**Verificar:**
1. Firebase Console → Firestore Database → Rules
2. Verifique se as regras permitem leitura/escrita

**Exemplo de regras básicas (APENAS PARA TESTE):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**⚠️ ATENÇÃO:** Essas regras são permissivas. Ajuste conforme sua necessidade de segurança.

---

### 4️⃣ **Erro no Código das APIs**

**Sintoma:** Erro específico em um endpoint

**Verificar logs:**
1. Vercel Dashboard → Deployments → Functions
2. Veja os logs de cada endpoint que está falhando
3. Procure por:
   - `TypeError`
   - `ReferenceError`
   - `FirebaseError`
   - Mensagens de erro específicas

---

### 5️⃣ **Autenticação não Funcionando**

**Sintoma:** Erro ao verificar usuário autenticado

**Verificar:**
```javascript
// No código da API
import { getAuth } from 'firebase-admin/auth';

export async function GET(request) {
  try {
    // Verificar se o usuário está autenticado
    const auth = getAuth();
    const token = request.headers.get('authorization');
    
    if (!token) {
      return Response.json({ error: 'Não autenticado' }, { status: 401 });
    }
    
    // Sua lógica aqui
  } catch (error) {
    console.error('Erro na API:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
```

---

## 🛠️ SOLUÇÕES PASSO A PASSO

### Solução 1: Verificar Logs do Vercel

1. Acesse: https://vercel.com/dashboard
2. Selecione seu projeto
3. Vá em **Deployments** → Último deployment
4. Clique em **Functions**
5. Veja os logs de cada endpoint que está falhando
6. Procure por mensagens de erro específicas

**Exemplo de log útil:**
```
Error: Firebase: Error (auth/invalid-credential)
at /api/pixels/route.ts:15
```

---

### Solução 2: Testar Endpoint Manualmente

Use curl ou Postman para testar:

```bash
# Teste básico
curl https://www.blogo.com.br/api/pixels

# Com autenticação (se necessário)
curl -H "Authorization: Bearer SEU_TOKEN" https://www.blogo.com.br/api/pixels

# Ver resposta completa
curl -v https://www.blogo.com.br/api/pixels
```

**Resposta esperada:**
- ✅ Status 200 = Sucesso
- ❌ Status 500 = Erro no servidor (veja o body)
- ❌ Status 401 = Não autenticado

---

### Solução 3: Adicionar Try/Catch nas APIs

Se as APIs não têm tratamento de erro, adicione:

```javascript
// app/api/pixels/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Sua lógica aqui
    const pixels = await getPixels();
    
    return NextResponse.json({ data: pixels });
  } catch (error) {
    console.error('Erro ao buscar pixels:', error);
    
    // Retorne erro detalhado em desenvolvimento
    return NextResponse.json(
      { 
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
```

---

### Solução 4: Verificar Firebase Admin SDK

Se estiver usando Firebase Admin (server-side):

```javascript
// lib/firebase-admin.ts
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export const db = getFirestore();
```

**Verifique:**
- ✅ Variáveis de ambiente estão configuradas
- ✅ `FIREBASE_PRIVATE_KEY` está com `\n` corretos
- ✅ Service Account tem permissões no Firestore

---

### Solução 5: Verificar Estrutura do Firestore

Confirme que as collections existem:

1. Firebase Console → Firestore Database
2. Verifique se existem:
   - `/pixels`
   - `/channels`
   - `/domains`
   - `/postbacks`
   - `/tracking`
   - `/leads`

Se não existirem, crie-as manualmente ou via código.

---

## 📋 CHECKLIST DE DIAGNÓSTICO

- [ ] Logs do Vercel verificados
- [ ] Variáveis de ambiente configuradas
- [ ] Firebase inicializado corretamente
- [ ] Firestore Security Rules configuradas
- [ ] Service Account configurado
- [ ] Collections do Firestore existem
- [ ] APIs têm try/catch
- [ ] Autenticação funcionando
- [ ] Teste manual dos endpoints feito

---

## 🎯 PRÓXIMOS PASSOS

1. **Verifique os logs do Vercel** (mais importante!)
2. **Confirme variáveis de ambiente**
3. **Teste um endpoint manualmente**
4. **Verifique Firebase/Firestore**
5. **Adicione tratamento de erro nas APIs**

---

## 📞 O QUE ME ENVIAR

Para eu ajudar melhor, envie:

1. **Screenshot dos logs do Vercel** (Functions → Logs)
2. **Resposta completa de um endpoint** (curl ou Network tab)
3. **Código de uma API que está falhando** (ex: `app/api/pixels/route.ts`)
4. **Variáveis de ambiente configuradas** (sem valores sensíveis, só nomes)
5. **Estrutura do Firestore** (screenshot ou lista de collections)

Com essas informações, consigo identificar a causa exata dos erros 500!

