import axios from 'axios';

const apiRequest = async (url, headers = {}) => {
  try {
    const response = await axios.get(url, {
      headers,
      timeout: 5000
    });
    return response.data;
  } catch (error) {
    console.error(`Error en API: ${url}`, error.message);
    return null;
  }
};

export const searchYouTube = async (query) => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    console.warn('YouTube API key no configurada');
    return [];
  }

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=5&key=${apiKey}`;
  const data = await apiRequest(url);

  return data?.items.map(item => ({
    title: item.snippet.title,
    source: 'YouTube',
    link: `https://youtube.com/watch?v=${item.id.videoId}`,
    description: item.snippet.description,
    type: 'video'
  })) || [];
};

export const searchGoogleBooks = async (query) => {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  if (!apiKey) {
    console.warn('Google Books API key no configurada');
    return [];
  }

  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5&key=${apiKey}`;
  const data = await apiRequest(url);

  return data?.items.map(book => ({
    title: book.volumeInfo.title,
    source: 'Google Books',
    link: book.volumeInfo.infoLink,
    description: book.volumeInfo.description || 'Libro sobre el tema buscado',
    type: 'book'
  })) || [];
};

export const searchDevto = async (query) => {
  const url = `https://dev.to/api/articles?per_page=5&tag=${encodeURIComponent(query)}`;
  const data = await apiRequest(url);

  return data?.map(article => ({
    title: article.title,
    source: 'Dev.to',
    link: article.url,
    description: article.description || 'Artículo técnico sobre el tema',
    type: 'article'
  })) || [];
};
