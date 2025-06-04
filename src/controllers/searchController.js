import { searchYouTube, searchDevto, searchGoogleBooks, searchGitHub } from '../services/apiServices.js';

export const searchResources = async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: 'Falta el parámetro de búsqueda "q"' });

  try {
    const [youtubeResults, devtoResults, booksResults, githubResults] = await Promise.all([
      searchYouTube(query),
      searchDevto(query),
      searchGoogleBooks(query),
      searchGitHub(query)
    ]);

    const combined = [...youtubeResults, ...devtoResults, ...booksResults, ...githubResults];
    res.json({ results: combined });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al buscar recursos' });
  }
};
