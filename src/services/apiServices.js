import axios from 'axios';

export const searchYouTube = async (query) => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=5&key=${apiKey}`;

  const res = await axios.get(url);
  return res.data.items.map(item => ({
    title: item.snippet.title,
    source: 'YouTube',
    link: `https://youtube.com/watch?v=${item.id.videoId}`,
    description: item.snippet.description
  }));
};

export const searchDevto = async (query) => {
  const url = `https://dev.to/api/articles?per_page=3&tag=${encodeURIComponent(query)}`;
  const res = await axios.get(url);
  return res.data.map(article => ({
    title: article.title,
    source: 'Dev.to',
    link: article.url,
    description: article.description || 'Artículo técnico de Dev.to'
  }));
};

export const searchGoogleBooks = async (query) => {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5&key=${apiKey}`;

  try {
    const res = await axios.get(url);
    return res.data.items.map(book => ({
      title: book.volumeInfo.title,
      source: 'Google Books',
      link: book.volumeInfo.infoLink,
      description: book.volumeInfo.description || 'Libro sobre el tema buscado'
    }));
  } catch (error) {
    console.error('Error searching Google Books:', error);
    return [];
  }
};

export const searchGitHub = async (query) => {
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=5`;

  try {
    const res = await axios.get(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `token ${process.env.GITHUB_TOKEN}`
      }
    });
    return res.data.items.map(repo => ({
      title: repo.name,
      source: 'GitHub',
      link: repo.html_url,
      description: repo.description || 'Repositorio de código relacionado'
    }));
  } catch (error) {
    console.error('Error searching GitHub:', error);
    return [];
  }
};
