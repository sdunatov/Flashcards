import asyncHandler from "express-async-handler";
import Card from "../models/cardModel.js";
import Deck from '../models/deckModel.js';

// Create new card
// Route POST /api/cards
// Private
const addCard = asyncHandler(async (req, res) => {
    const { front, back, deckId } = req.body;

    const deck = await Deck.findById(deckId);

    if (!front || !back) {
        res.status(400);
        throw new Error('Front and back cannot be blank');
    }

    if (front.trim().length === 0 || back.trim().length === 0) {
        res.status(400);
        throw new Error('Front and back cannot be blank');
    }

    const card = new Card({
        front,
        back,
        user: req.user._id,
        deck: deck._id
    });

    const createdCard = await card.save();
    deck.cards.push(createdCard._id);
    await deck.save();

    res.status(201).json(createdCard);
});

// Get logged in user cards for a specific deck
// GET /api/cards/mycards/:deckId
// Private
const getMyCards = asyncHandler(async (req, res) => {
    const { deckId } = req.params;
    const cards = await Card.find({ user: req.user._id, deck: deckId });
    res.json(cards);
});


//Update card front && back
//PUT /api/cards/edit
//Private
const updateCard = asyncHandler(async (req, res) => {
    const card = await Card.findById(req.params.id)

    if (card) {
        card.front = req.body.front || card.front;
        card.back = req.body.back || card.back;

        const updatedCard = await card.save();

        res.status(200).json({
            _id: updatedCard._id,
            front: updatedCard.front,
            back: updatedCard.back
        });
    } else {
        res.status(404)
        throw new Error('Card not found')
    }
});

//  Delete a card
//  DELETE /api/cards/:id
// Private
const deleteCard = asyncHandler(async (req, res) => {
    const card = await Card.findById(req.params.id)

    if (card) {
        await card.remove()
        res.json({ message: 'Card removed' })
    } else {
        res.status(404)
        throw new Error('Card not found')
    }
});

export {
    addCard,
    getMyCards,
    updateCard,
    deleteCard
}

