import React, { useState } from "react";
import { useGetCardsQuery } from "../slices/cardApiSlice";
import { useSelector } from "react-redux";
import '../styles/flashcards.css';

const Flashcards = ({ deckId }) => {
    const { data: cards, error, isLoading } = useGetCardsQuery(deckId);
    const user = useSelector((state) => state.auth);

    const [flippedCards, setFlippedCards] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const toggleCardFlip = (cardId) => {
        if (flippedCards.includes(cardId)) {
            setFlippedCards((prevFlippedCards) =>
                prevFlippedCards.filter((id) => id !== cardId)
            );
        } else {
            setFlippedCards([...flippedCards, cardId]);
        }
    };

    const handleNextCard = () => {
        if (currentCardIndex < filteredCards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
            setFlippedCards([]);
        }
    };

    const handlePrevCard = () => {
        if (currentCardIndex > 0) {
            setCurrentCardIndex(currentCardIndex - 1);
            setFlippedCards([]);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.log(error.message);
        return <div>Error loading cards</div>;
    }

    if (cards === null) {
        return <div>No cards available.</div>;
    }

    const filteredCards = cards.filter((card) => card.deck === deckId);

    return (
        <div className="d-flex justify-content-center">
            {filteredCards.length === 0 ? (
                <p>No cards for this deck yet.</p>
            ) : (
                <div>
                    <div className="flashcard">
                        <div
                            key={filteredCards[currentCardIndex]._id}
                            className={`card ${flippedCards.includes(filteredCards[currentCardIndex]._id) ? "flipped" : ""}`}
                            onClick={() => toggleCardFlip(filteredCards[currentCardIndex]._id)}
                        >
                            <div className="front">
                                <p>{filteredCards[currentCardIndex].front}</p>
                            </div>
                            <div className="back">
                                <p>{filteredCards[currentCardIndex].back}</p>
                            </div>
                        </div>
                    </div>
                    <div className="navigation-buttons">
                        {currentCardIndex > 0 && (
                            <button className="prev-button" onClick={handlePrevCard}>
                                Previous
                            </button>
                        )}
                        {currentCardIndex < filteredCards.length - 1 && (
                            <button className="next-button" onClick={handleNextCard}>
                                Next
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Flashcards;
