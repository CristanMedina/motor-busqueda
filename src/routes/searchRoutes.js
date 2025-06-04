import express from 'express';
import { searchResources } from '../controllers/searchController.js';

const router = express.Router();

router.get('/', searchResources);

export default router;
