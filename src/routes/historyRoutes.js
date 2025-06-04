import express from 'express';
import {
  getSearchHistory,
  addToHistory,
  deleteHistoryEntry
} from '../controllers/historyController.js';

const router = express.Router();

router.get('/', getSearchHistory);
router.post('/', addToHistory);
router.delete('/:id', deleteHistoryEntry);

export default router;
