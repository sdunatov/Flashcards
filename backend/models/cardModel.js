import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    front: {
        type: String,
        required: true
    },
    back: {
        type: String,
        required: true
    },
    deck: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Deck'
    }
}, {
    timestamps: true
});

const Card = mongoose.model('Card', cardSchema);
export default Card;