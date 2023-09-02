import express from "express";
const router = express.Router();
import {
    addDeck,
    getMyDecks,
    deleteDeck
} from '../controllers/deckController.js';
import { protect } from "../middleware/authMiddleware.js";

router.post('/', protect, addDeck);
router.get('/mydecks', protect, getMyDecks);
router.delete('/:id', protect, deleteDeck);

export default router;