import Card from 'react-bootstrap/Card';
import CircleStatus from './CircleStatus';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import InfoButton from './InfoButton';
import '../styles/Card.css';

function formatString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function CharacterCard({ character }) {
  return (
    <Card className="custom-card">
      <Card.Img variant="top" src={character.imageUrl} className="img-fluid" />
      <Card.Body>
        <Card.Title><InfoButton character={character}/>{character.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
            <CircleStatus status={character.status} />
            {character.status} - {formatString(character.species)}</Card.Subtitle>
        <Card.Text>
            <div className="section">
                <div className="info">Last known location:</div><span>{formatString(character.location)}</span>
            </div>
            <div className="section">
                <div className="info">First seen in: </div><span>{character.episode}</span>
            </div>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <LikeButton id={character.id} />
        <CommentButton id={character.id} />
      </Card.Footer>
    </Card>
  );
}

export default CharacterCard;