import { useGetDecksQuery, useCreateDeckMutation, useDeleteDeckMutation } from '../slices/decksApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Deck = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { data: decks, isLoading, refetch } = useGetDecksQuery();
    const [newDeckName, setNewDeckName] = useState('');
    const [createDeck, { isLoading: creatingDeck }] = useCreateDeckMutation();
    const [deleteDeckMutation, { isLoading: deletingDeck }] = useDeleteDeckMutation();

    useEffect(() => {
        if (!deletingDeck) {
            refetch();
        }
    }, [deletingDeck, refetch]);

    useEffect(() => {
        if (!creatingDeck) {
            refetch();
        }
    }, [creatingDeck, refetch]);

    const handleCreateDeck = async () => {
        if (newDeckName.trim().length === 0) {
            alert('Please enter a name for the deck');
            return;
        }
        try {
            await dispatch(createDeck(newDeckName));
            setNewDeckName('');
        } catch (error) {
            console.log('Error creating deck:', error);
        }
    };

    const handleDeleteDeck = async (deckId) => {
        try {
            await dispatch(deleteDeckMutation(deckId));
        } catch (error) {
            console.log('Error deleting deck:', error);
        }
    };


    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!decks) {
        return <p>No decks available</p>;
    }

    return (
        <>
            <div className="d-flex justify-content-center">
                <input
                    type="text"
                    value={newDeckName}
                    onChange={(e) => setNewDeckName(e.target.value)}
                />

                <Button variant="primary" className="me-3" onClick={handleCreateDeck} disabled={creatingDeck}>
                    {creatingDeck ? 'Creating...' : 'Create new deck'}
                </Button>
            </div>
            <p></p>
            {userInfo ? (
                <>
                    {decks.map((deck) => (
                        <Row key={deck._id} className="align-items-center">
                            <Col>{deck.name}</Col>
                            <Col>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDeleteDeck(deck._id)}
                                    disabled={deletingDeck}
                                >
                                    {deletingDeck ? 'Deleting...' : 'Delete Deck'}
                                </Button>
                                <Link to={`/cards/${deck._id}`}>
                                    <Button variant='primary'>
                                        Add new card
                                    </Button>
                                </Link>
                                <Link to={`/cards/mycards/${deck._id}`}>
                                    <Button variant='success'>
                                        Start learning
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    ))}

                </>
            ) : (
                <>Dobrodošli!</>
            )
            }
        </>
    );
}

export default Deck;