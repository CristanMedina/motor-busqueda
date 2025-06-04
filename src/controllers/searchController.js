import {
  searchYouTube,
  searchGoogleBooks,
  searchDevto,
} from '../services/apiServices.js';

export const searchResources = async (req, res, next) => {
  try {
    const query = req.query.q;

    const [youtubeResults, booksResults, devtoResults] = await Promise.all([
      searchYouTube(query),
      searchGoogleBooks(query),
      searchDevto(query),
    ]);

    const combinedResults = [
      ...youtubeResults,
      ...booksResults,
      ...devtoResults,
    ];

    res.json({
      success: true,
      count: combinedResults.length,
      query,
      results: combinedResults
    });

  } catch (error) {
    next(error);
  }
};
