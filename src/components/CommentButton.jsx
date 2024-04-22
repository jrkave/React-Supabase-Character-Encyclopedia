import { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../supabase/client';
import useComments from '../hooks/useComments';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../styles/FaButton.css';
import '../styles/Modal.css';

function CommentButton({ id }) {
    const { user } = useAuth();
    const { comments, isCommented, setComments, setIsCommented, loading } = useComments(id);
    const [showModal, setShowModal] = useState(false);
    const [commentText, setCommentText] = useState('');

    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const submitComment = async () => {
        const { data, error } = await supabase
            .from('comments')
            .insert([{ character_id: id, user_id: user.id, text: commentText }])
            .select('*');
        
        if (!error) {
            console.log(data);
            setComments([...comments, data[0]]);
            setIsCommented(true);
            setCommentText(''); // Clear the text field
            handleClose(); // Close the modal
        } else {
            console.error('Error submitting comment:', error);
        }
    };

    return (
        <>
            <span className="section" onClick={handleOpen}>
                <FontAwesomeIcon className="fa-button" icon={faComment} role="button" color={isCommented ? 'orange' : 'white'}/>
                <span id="count">&nbsp;&nbsp;{comments.length}</span>
            </span>

            <Modal className="rm-model" show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Leave a Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Comment:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={submitComment}>
                        Submit Comment
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CommentButton;
