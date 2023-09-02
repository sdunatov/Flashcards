import mongoose from "mongoose";

const deckSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    cards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Card'
        }],
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Deck = mongoose.model('Deck', deckSchema);
export default Deck;