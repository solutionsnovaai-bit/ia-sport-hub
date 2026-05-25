// api/football.js — Vercel Serverless Function
// Faz o proxy das chamadas à RapidAPI sem expor a chave no frontend
// e sem problemas de CORS.

export default async function handler(req, res) {
  // Permite CORS para qualquer origem (o frontend pode estar em qualquer domínio)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Pega o path e query string que o frontend enviou
  // Ex: /api/football?path=/football-livescores
  //     /api/football?path=/football-matches-by-date&date=2026-05-25
  const { path, ...queryParams } = req.query;

  if (!path) {
    return res.status(400).json({ error: 'Parâmetro "path" obrigatório.' });
  }

  const API_KEY = process.env.RAPIDAPI_KEY;
  const API_HOST = 'free-api-live-football-data.p.rapidapi.com';
  const API_BASE = `https://${API_HOST}`;

  // Monta a query string com os parâmetros extras (ex: date, leagueId)
  const qs = new URLSearchParams(queryParams).toString();
  const url = `${API_BASE}${path}${qs ? '?' + qs : ''}`;

  try {
    const upstream = await fetch(url, {
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST,
      },
    });

    const data = await upstream.json();
    return res.status(upstream.status).json(data);
  } catch (err) {
    console.error('[proxy error]', err);
    return res.status(500).json({ error: 'Erro ao conectar à API de futebol.' });
  }
}
