# 🔍 Diagnóstico - Erro 500 no Login

## ⚠️ PROBLEMA IDENTIFICADO

**Erro:** `500 Internal Server Error` em `POST https://www.blogo.com.br/api/auth/login`

Isso indica um **erro no servidor**, não no frontend.

---

## 📋 CHECKLIST DE DIAGNÓSTICO

### 1️⃣ **VERIFICAR LOGS DO SERVIDOR**

#### Se estiver usando Vercel:
1. Acesse: https://vercel.com/dashboard
2. Vá em **Deployments** → Selecione o deployment
3. Clique em **Functions** → Procure por `/api/auth/login`
4. Veja os **logs** para identificar o erro exato

#### Se estiver usando outro servidor:
- Verifique os logs do servidor (console, CloudWatch, etc.)
- Procure por erros relacionados a:
  - Variáveis de ambiente faltando
  - Erros de conexão com banco de dados
  - Erros de autenticação (Firebase, JWT, etc.)

---

### 2️⃣ **VERIFICAR VARIÁVEIS DE AMBIENTE**

O erro 500 geralmente acontece quando:
- ❌ Variáveis de ambiente não estão configuradas
- ❌ Variáveis de ambiente estão com valores errados
- ❌ Secrets/keys expiraram ou foram revogados

**Verifique no Vercel:**
1. Settings → Environment Variables
2. Confirme que todas as variáveis necessárias estão configuradas:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_PRIVATE_KEY`
   - `FIREBASE_CLIENT_EMAIL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
   - Outras variáveis específicas do seu projeto

---

### 3️⃣ **VERIFICAR O CÓDIGO DA API**

O endpoint `/api/auth/login` pode estar com problemas:

#### Erros comuns:
1. **Firebase não inicializado:**
```javascript
// ❌ Errado
import { getAuth } from 'firebase/auth';
const auth = getAuth(); // Pode falhar se Firebase não estiver configurado

// ✅ Correto
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
```

2. **Variáveis de ambiente não carregadas:**
```javascript
// ❌ Errado
const apiKey = process.env.FIREBASE_API_KEY; // undefined em produção

// ✅ Correto
const apiKey = process.env.FIREBASE_API_KEY;
if (!apiKey) {
  throw new Error('FIREBASE_API_KEY não configurada');
}
```

3. **Erro de CORS:**
```javascript
// Adicione headers CORS na resposta
export async function POST(request) {
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    },
  });
}
```

---

### 4️⃣ **TESTAR A API MANUALMENTE**

Use o Postman, Insomnia ou curl para testar:

```bash
# Teste básico
curl -X POST https://www.blogo.com.br/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@email.com","password":"senha123"}'

# Verifique a resposta completa
curl -v -X POST https://www.blogo.com.br/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@email.com","password":"senha123"}'
```

**Resposta esperada:**
- ✅ Status 200/201 = Sucesso
- ❌ Status 500 = Erro no servidor (veja o body da resposta)
- ❌ Status 401 = Credenciais inválidas
- ❌ Status 400 = Dados inválidos

---

### 5️⃣ **VERIFICAR FIREBASE AUTHENTICATION**

Se estiver usando Firebase Auth:

1. **Verifique se o Firebase está configurado:**
   - Console Firebase → Authentication → Settings
   - Verifique se os métodos de login estão habilitados

2. **Verifique as credenciais:**
   - Service Account Key está correto?
   - Permissões estão configuradas?

3. **Teste direto no Firebase:**
```javascript
// Teste no console do navegador (se tiver acesso)
import { signInWithEmailAndPassword } from 'firebase/auth';
signInWithEmailAndPassword(auth, email, password)
  .then(console.log)
  .catch(console.error);
```

---

### 6️⃣ **VERIFICAR NETWORK TAB**

No navegador (F12 → Network):
1. Tente fazer login
2. Veja a requisição `POST /api/auth/login`
3. Clique na requisição → Aba **Response**
4. Veja se há uma mensagem de erro mais detalhada

**Exemplo de resposta de erro:**
```json
{
  "error": "Firebase: Error (auth/invalid-credential)",
  "message": "Credenciais inválidas"
}
```

---

## 🛠️ SOLUÇÕES RÁPIDAS

### Solução 1: Verificar Variáveis de Ambiente
```bash
# No Vercel, adicione/atualize:
FIREBASE_PROJECT_ID=seu-project-id
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@...
```

### Solução 2: Adicionar Try/Catch na API
```javascript
// app/api/auth/login/route.ts
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    // Sua lógica de autenticação aqui
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('Erro no login:', error);
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

### Solução 3: Verificar Deploy
1. Faça um novo deploy
2. Verifique se não há erros no build
3. Verifique se as variáveis de ambiente foram aplicadas

---

## 📞 O QUE ME ENVIAR PARA DIAGNOSTICAR

1. **Screenshot dos logs do servidor** (Vercel Functions ou seu servidor)
2. **Resposta completa da API** (Network tab → Response)
3. **Código da rota `/api/auth/login`** (se possível)
4. **Variáveis de ambiente configuradas** (sem valores sensíveis, só os nomes)

---

## 🎯 PRÓXIMOS PASSOS

1. ✅ Verificar logs do servidor
2. ✅ Verificar variáveis de ambiente
3. ✅ Testar API manualmente
4. ✅ Verificar código da rota
5. ✅ Fazer novo deploy se necessário

