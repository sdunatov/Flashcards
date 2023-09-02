import express from "express";
const router = express.Router();
import {
    addCard,
    getMyCards,
    updateCard,
    deleteCard
} from '../controllers/cardController.js';
import { protect } from "../middleware/authMiddleware.js";

router.post('/', protect, addCard);
router.get('/mycards/:deckId', protect, getMyCards);
router.put('/edit', protect, updateCard);
router.delete('/:id', protect, deleteCard);

export default router;