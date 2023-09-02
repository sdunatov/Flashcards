import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Deck from './Deck';

const Hero = () => {
    return (
        <div className=' py-5'>
            <Container className='d-flex justify-content-center'>
                <Card className='p-5 d-flex flex-column hero-card bg-light w-75'>
                    <h1 className='text-center mb-4'>Deck</h1>
                    <div className='text-start'>
                        <Deck />
                    </div>


                </Card>
            </Container>
        </div>
    );
};

export default Hero;