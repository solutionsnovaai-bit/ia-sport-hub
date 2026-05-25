# IA Sport Hub — Deploy na Vercel

## Estrutura do projeto

```
ia-sport-hub/
├── index.html          ← Frontend (sem chave de API exposta)
├── api/
│   └── football.js     ← Serverless function (proxy seguro para RapidAPI)
├── vercel.json         ← Configuração da Vercel
└── .env.example        ← Modelo para variáveis de ambiente
```

## Como fazer o deploy

### 1. Sobe o projeto no GitHub
```bash
git init
git add .
git commit -m "IA Sport Hub"
git remote add origin https://github.com/SEU_USUARIO/ia-sport-hub.git
git push -u origin main
```

### 2. Importa na Vercel
- Acesse https://vercel.com/new
- Selecione o repositório `ia-sport-hub`
- Clique em **Deploy** (as configurações padrão já funcionam)

### 3. Adiciona a variável de ambiente
No dashboard da Vercel, vá em:
**Settings → Environment Variables**

| Nome | Valor |
|------|-------|
| `RAPIDAPI_KEY` | sua chave do RapidAPI |

Depois clique em **Redeploy** para aplicar.

## Como funciona

O frontend (`index.html`) chama `/api/football?path=/football-livescores` etc.  
A função serverless (`api/football.js`) recebe a requisição, adiciona a chave da API
(que fica segura nas env vars da Vercel) e repassa para a RapidAPI.  
Zero CORS. Zero chave exposta no browser.

## API utilizada

**Free API Live Football Data** no RapidAPI  
https://rapidapi.com/Creativesdev/api/free-api-live-football-data
