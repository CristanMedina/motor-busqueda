import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: 'Falta el parámetro de búsqueda "q"' });

  try {
    const youtubeResults = await searchYouTube(query);
    const devtoResults = await searchDevto(query);

    const combined = [...youtubeResults, ...devtoResults];
    res.json({ results: combined });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al buscar recursos' });
  }
});

async function searchYouTube(query) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=5&key=${apiKey}`;

  const res = await axios.get(url);
  return res.data.items.map(item => ({
    title: item.snippet.title,
    source: 'YouTube',
    link: `https://youtube.com/watch?v=${item.id.videoId}`,
    description: item.snippet.description
  }));
}

async function searchDevto(query) {
  const url = `https://dev.to/api/articles?per_page=3&tag=${encodeURIComponent(query)}`;
  const res = await axios.get(url);
  return res.data.map(article => ({
    title: article.title,
    source: 'Dev.to',
    link: article.url,
    description: article.description || 'Artículo técnico de Dev.to'
  }));
}

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
