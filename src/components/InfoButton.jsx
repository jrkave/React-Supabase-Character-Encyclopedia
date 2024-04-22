import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import '../styles/FaButton.css';

function InfoButton({ character }) {
    return (
        <span style={{marginRight: '0.4em'}}>
            <Link style={{ color: '#8db4f2' }} to={`/character/${character.id}`}>
                <FontAwesomeIcon className="fa-button" icon={ faCircleInfo } role="button"/>
            </Link>
        </span>
    );
};

export default InfoButton;