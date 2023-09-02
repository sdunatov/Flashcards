import { useParams } from "react-router-dom";
import CreateCard from "../components/CreateCard";

const NewCardScreen = () => {
    const { deckId } = useParams();

    return (
        <CreateCard deckId={deckId} />
    );
}

export default NewCardScreen;