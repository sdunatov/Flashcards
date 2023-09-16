import React, { useState, useEffect } from "react";
import { useGetCardsQuery } from "../slices/cardApiSlice";
import { useSelector } from "react-redux";
import '../styles/flashcards.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Flashcards = ({ deckId }) => {
    const { data: cards, error, isLoading } = useGetCardsQuery(deckId);
    const user = useSelector((state) => state.auth);

    const [flippedCards, setFlippedCards] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [boxes, setBoxes] = useState([]);

    const BOXES = {
        BOX1: 1,
        BOX2: 2,
        BOX3: 3,
        BOX4: 4,
        BOX5: 5,
    };

    useEffect(() => {
        if (cards) {
            const initialBoxes = cards.map(card => ({ ...card, boxNumber: BOXES.BOX1 }));
            setBoxes(initialBoxes);
        }
    }, [cards]);

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
        if (currentCardIndex < boxes.length - 1) {
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

    const moveToNextBox = () => {
        if (currentCardIndex < boxes.length - 1) {
            const updatedBoxes = [...boxes];
            updatedBoxes[currentCardIndex].boxNumber += 1;
            setBoxes(updatedBoxes);
            handleNextCard();
        }
    };

    const placeInBox1 = () => {
        if (currentCardIndex < boxes.length - 1) {
            const updatedBoxes = [...boxes];
            updatedBoxes[currentCardIndex].boxNumber = BOXES.BOX1;
            setBoxes(updatedBoxes);
            handleNextCard();
        }
    };

    const boxCounts = {};
    boxes.forEach((box) => {
        const boxNumber = box.boxNumber;
        if (!boxCounts[boxNumber]) {
            boxCounts[boxNumber] = 1;
        } else {
            boxCounts[boxNumber]++;
        }
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.log(error.message);
        return <div>Error loading cards</div>;
    }

    if (!boxes || boxes.length === 0) {
        return <h2>No cards available.</h2>;
    }

    return (
        <div className="d-flex justify-content-center">
            <div>
                <div className="flashcard">
                    <div
                        key={boxes[currentCardIndex]._id}
                        className={`card ${flippedCards.includes(boxes[currentCardIndex]._id) ? "flipped" : ""}`}
                        onClick={() => toggleCardFlip(boxes[currentCardIndex]._id)}
                    >
                        <div className="front">
                            <p>{boxes[currentCardIndex].front}</p>
                        </div>
                        <div className="back">
                            <p>{boxes[currentCardIndex].back}</p>
                        </div>
                    </div>
                </div>
                <div className="navigation-buttons">
                    {currentCardIndex > 0 && (
                        <button className="prev-button" onClick={handlePrevCard}>
                            <i class="bi bi-arrow-left large-arrow"></i>
                        </button>
                    )}
                    {currentCardIndex < boxes.length - 1 && (
                        <button className="next-button" onClick={handleNextCard}>
                            <i class="bi bi-arrow-right large-arrow"></i>
                        </button>
                    )}
                </div>
                <div className="congradulations-mess">{currentCardIndex === boxes.length - 1 && (
                    <h4>Congratulations! You've completed all the cards. 🎉</h4>
                )}
                </div>
                <div className="leitner-box">
                    <div className="d-flex justify-content-between">
                        <div className="leitner-buttons">
                            <button className="place-nextbox" onClick={moveToNextBox}>Move card to next box</button>
                            <br></br>
                            <button className="place-box1" onClick={placeInBox1}>Place card in box 1</button>
                        </div>

                        <div className="card-count">
                            <p>Total cards: {boxes.length}</p>
                            {Object.entries(boxCounts).map(([boxNumber, count]) => (
                                <p key={boxNumber}>Box {boxNumber} cards: {count}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Flashcards;
