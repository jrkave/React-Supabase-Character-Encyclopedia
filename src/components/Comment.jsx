import React from 'react';
import useComments from '../hooks/useComments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Container } from "react-bootstrap";

const Comments = ({ id }) => { 
    const { comments, isCommented, loading, error } = useComments(id);

    // Show spinning loader icon while page loads
    if (loading) {
        return (
        <Container fluid className='d-flex justify-content-center'>
            <FontAwesomeIcon icon={faSpinner} size="2xl" style={{color: 'white'}} spin />
        </Container>
        );
    };

    // Show error icon if error occurs
    if (error) {
        return (
            <Container fluid className='d-flex justify-content-center'>
                <FontAwesomeIcon icon={ faCircleExclamation } size="2xl" style={{color: 'orange'}} /><span style={{color: 'white', paddingLeft: '1em', fontSize: '1.3em'}}>Oops! Something went wrong.</span>
            </Container>
        );
    };

    return (
        <div>
            {comments.map(comment => (
                <div key={comment.id} style={{color: 'white', paddingLeft: '0.2em', paddingBottom: '0.5em'}}>
                    <span style={{color: '#8db4f2', fontWeight: '600'}}>{comment.display_name.name}</span>: {comment.text}
                </div>
            ))}
        </div>
    );
};

export default Comments;
