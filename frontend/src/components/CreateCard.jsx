import React, { useState } from "react";
import { useCreateCardMutation } from "../slices/cardApiSlice";
import { Form, Button } from "react-bootstrap";

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
            // Pozovi createCard mutaciju da doda karticu u bazu
            await createCard({ front: newCardFront, back: newCardBack, deckId });
            // Resetuj stanje nakon uspešnog dodavanja
            setNewCardFront('');
            setNewCardBack('');
        } catch (error) {
            console.log('Error creating card:', error);
        }
    };

    return (
        <Form>
            <Form.Group controlId="frontInput">
                <Form.Label>Front:</Form.Label>
                <Form.Control
                    type="text"
                    value={newCardFront}
                    onChange={(e) => setNewCardFront(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="backInput">
                <Form.Label>Back:</Form.Label>
                <Form.Control
                    type="text"
                    value={newCardBack}
                    onChange={(e) => setNewCardBack(e.target.value)}
                />
            </Form.Group>
            <Button
                variant="primary"
                onClick={handleCreateCard}
                disabled={creatingCard}
            >
                {creatingCard ? 'Creating...' : 'Create Card'}
            </Button>
        </Form>
    );
};

export default CreateCard;
