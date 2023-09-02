import asyncHandler from "express-async-handler";
import Deck from "../models/deckModel.js";

// Create new deck
// Route POST /api/decks
// Private
const addDeck = asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (name.length === 0) {
        res.status(400)
        throw new Error('No name of the deck')
    } else {
        const deck = new Deck({
            user: req.user._id,
            name
        })

        const createdDeck = await deck.save();

        res.status(201).json(createdDeck);
    }
});

// Get logged in user deck
// GET /api/decks/mydecks
// Private
const getMyDecks = asyncHandler(async (req, res) => {
    const deck = await Deck.find({ user: req.user._id })
    res.json(deck);
});

//  Delete a deck
//  DELETE /api/decks/:id
// Private
const deleteDeck = asyncHandler(async (req, res) => {
    const deck = await Deck.findById(req.params.id);

    if (deck) {
        await Deck.deleteOne({ _id: deck._id })
        res.json({ message: 'Deck removed' })
    } else {
        res.status(404)
        throw new Error('Deck not found')
    }
});

export {
    addDeck,
    getMyDecks,
    deleteDeck
}

