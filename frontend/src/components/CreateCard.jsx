import React, { useState } from "react";
import { useCreateCardMutation } from "../slices/cardApiSlice";
import { Form, Button } from "react-bootstrap";
import '../styles/cards.css';

const CreateCard = ({ deckId }) => {
    const [newCardFront, setNewCardFront] = useState('');
    const [newCardBack, setNewCardBack] = useState('');
    const [createCard, { isLoading: creatingCard }] = useCreateCardMutation();

    const handleCreateCard = async () => {
        if (newCardFront.trim().length === 0 || newCardBack.trim().length === 0) {
            alert('Please enter both front and back of the card');
            return;
        }

        try {
            await createCard({ front: newCardFront, back: newCardBack, deckId });

            setNewCardFront('');
            setNewCardBack('');
        } catch (error) {
            console.log('Error creating card:', error);
        }
    };

    return (
        <div className="d-flex justify-content-center">
            <Form>
                <Form.Group controlId="frontInput">
                    <Form.Label className="txtFB">Front:</Form.Label>
                    <Form.Control
                        type="text"
                        value={newCardFront}
                        className="input-style"
                        onChange={(e) => setNewCardFront(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="backInput">
                    <Form.Label className="txtFB">Back:</Form.Label>
                    <Form.Control
                        type="text"
                        value={newCardBack}
                        className="input-style"
                        onChange={(e) => setNewCardBack(e.target.value)}
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    onClick={handleCreateCard}
                    disabled={creatingCard}
                    className="button-style"
                >
                    {creatingCard ? 'Creating...' : 'Create Card'}
                </Button>
            </Form>
        </div>
    );
};

export default CreateCard;
