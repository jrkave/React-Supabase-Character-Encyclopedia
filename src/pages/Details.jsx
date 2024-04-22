import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import CircleStatus from '../components/CircleStatus';
import LikeButton from '../components/LikeButton';
import CommentButton from '../components/CommentButton';
import Comments from '../components/Comment';
import { Link } from 'react-router-dom';
import { Container } from "react-bootstrap";
import { supabase } from '../supabase/client';

import '../styles/Details.css';

function formatString(string) {
    return string[0].toUpperCase() + string.slice(1);
}

const Character = () => {
    const { id } = useParams(); // Get id of character from URL
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        const fetchCharacter = async () => {
            setLoading(true);
            const projectID = 'ntfdooesmfiusqjkbgem';
            const bucketName = 'images';
            
            const { data, error } = await supabase.from('characters').select().eq('id', id).single();
            if (error) {
                console.log('Error fetching character:', error);
                setErrorMsg(error.message);
                setLoading(false);
                return;
            }

            const updatedCharacter = {
                ...data,
                imageUrl: `https://${projectID}.supabase.co/storage/v1/object/public/${bucketName}/char-${data.id}.jpeg`
            };

            setCharacter(updatedCharacter);
            setLoading(false);
        };

        fetchCharacter();
    }, [id]);

    // Show spinning loader icon while page loads
    if (loading) {
        return (
            <Container fluid className='d-flex justify-content-center'>
                <FontAwesomeIcon icon={ faSpinner } size="2xl" style={{color: 'white'}} spin />
            </Container>
        );
    };

    // Show error icon if error occurs
    if (errorMsg) {
        return (
            <Container fluid className='d-flex justify-content-center'>
                <FontAwesomeIcon icon={ faCircleExclamation } size="2xl" style={{color: 'orange'}} /><span style={{color: 'white', paddingLeft: '1em', fontSize: '1.3em'}}>Oops! Something went wrong.</span>
            </Container>
        );
    };

    return (
        <Container fluid style={{backgroundColor: 'rgb(60, 62, 67)', padding: '2em', borderRadius: '20px', margin: '4em', boxShadow: '10px 10px 10px rgb(27, 27, 27)'}}>
            <div style={{color: 'white', display: 'inline-block', verticalAlign: 'top'}}>
                <img src={character.imageUrl} height='310px'></img>
            </div>
            <div style={{display: 'inline-block', paddingLeft: '1em', color: 'white', verticalAlign: 'top'}}>
                <h2><span style={{paddingRight: '0.2em'}}>{character.name}</span><CircleStatus status={character.status}/></h2>
                <p><span className='info'>Status: </span>{character.status}</p>
                <p><span className='info'>Species: </span>{formatString(character.species)}</p>
                <p><span className='info'>Gender: </span>{character.gender}</p>
                <p><span className='info'>Origin location: </span>{formatString(character.origin)}</p>
                <p><span className='info'>Last known location: </span>{formatString(character.location)}</p>
                <p><span className='info'>Last seen in: </span>{character.episode}</p>
                <div>
                <span>
                    <Link to="/home">
                        <FontAwesomeIcon icon={faHome} role="button" id="home-btn"/>
                    </Link>
                    &nbsp;
                    <LikeButton id={character.id}/>
                    <CommentButton id={character.id}/>
                </span>
                </div>
            </div>
            <h2 style={{color: 'white', paddingTop: '0.5em'}}>Comments</h2>
            <div style={{border: '1px solid grey', marginTop: '1em', paddingTop: '0.5em', paddingLeft: '0.5em', minHeight: '20em', borderRadius: '20px', boxShadow: '3px 3px 3px rgb(27, 27, 27)'}}>
                <Comments id={character.id}/>
            </div>
        </Container>
    );
}

export default Character;