import { useParams } from "react-router-dom";
import Flashcards from "../components/Flashcards";
import { Container, Card } from "react-bootstrap";

const FlashcardsScreen = () => {
    const { deckId } = useParams();

    return (
        <div className=' py-5'>
            <Container className='d-flex justify-content-center'>
                <Card className='p-5 d-flex flex-column hero-card bg-light w-75'>
                    <div className='text-start'>
                        <Flashcards deckId={deckId} />
                    </div>
                </Card>
            </Container>
        </div>

    );
}

export default FlashcardsScreen;
