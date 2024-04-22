import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faUserPen, faCaretDown, faCaretUp, faSave } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useAuth } from '../context/AuthProvider';

const Profile = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAvatars, setShowAvatars] = useState(false);
    const [editBio, setEditBio] = useState(false);
    const [newBio, setNewBio] = useState("");

    const avatars = [
    { name: 'Rick', url: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg' },
    { name: 'Morty', url: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg' },
    { name: 'Summer', url: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg' },
    { name: 'Beth', url: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg' },
    { name: 'Jerry', url: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg' },
    { name: 'Birdperson', url: 'https://rickandmortyapi.com/api/character/avatar/47.jpeg' },
    { name: 'Evil Morty', url: 'https://rickandmortyapi.com/api/character/avatar/118.jpeg' },
    { name: 'President', url: 'https://rickandmortyapi.com/api/character/avatar/347.jpeg' },
    { name: 'Nimbus', url: 'https://rickandmortyapi.com/api/character/avatar/672.jpeg' },
    { name: 'Cornvelious', url: 'https://rickandmortyapi.com/api/character/avatar/150.jpeg' },
    { name: 'PBH', url: 'https://rickandmortyapi.com/api/character/avatar/244.jpeg' },
    { name: 'ScaryTerry', url: 'https://rickandmortyapi.com/api/character/avatar/306.jpeg' },
    { name: 'Meseeks', url: 'https://rickandmortyapi.com/api/character/avatar/242.jpeg' },
    { name: 'AntsInMyEyesJohnson', url: 'https://rickandmortyapi.com/api/character/avatar/20.jpeg' },
    { name: 'MillionAnts', url: 'https://rickandmortyapi.com/api/character/avatar/226.jpeg' },
    { name: 'Squanchy', url: 'https://rickandmortyapi.com/api/character/avatar/331.jpeg' },
    { name: 'Fart', url: 'https://rickandmortyapi.com/api/character/avatar/122.jpeg' },
    { name: 'Head', url: 'https://rickandmortyapi.com/api/character/avatar/24.jpeg' },
];    

    useEffect(() => {
        fetchProfile();
    }, []); 

    // Fetch user's profile information
    async function fetchProfile() {
        setLoading(true);
        try {
            const { data, error } = await supabase.from('profiles').select('*').eq('user_id', user.id).single();

            if (error) {
                console.log(error);
                return;
            }

            setProfile(data);
            if (data) setNewBio(data.bio);
        } catch (error) {
            console.log('Error fetching profile information:', error);
        } finally {
            setLoading(false);
        }
    }

    // Update avatar
    async function updateAvatar(avatarUrl) {
        setLoading(true);
        try {
            const { error } = await supabase.from('profiles').update({ avatar: avatarUrl }).eq('user_id', user.id);
            if (!error) {
                console.log('Successful update of avatar');
                setProfile(prevProfile => ({
                    ...prevProfile,
                    avatar: avatarUrl
                }));
            } else {
                console.log('Error updating avatar', error.message);
            }
        } catch (error) {
            console.log('Error updating avatar: ', error);
        } finally {
            setLoading(false);
        }
    }
    
    // Update bio
    async function updateBio(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const { error } = await supabase.from('profiles').update({ bio: newBio }).eq('user_id', user.id);
            if (!error) {
                console.log('Successful bio update');
                setProfile(prevProfile => ({
                    ...prevProfile,
                    bio: newBio
                }));
                setEditBio(false);
            } else {
                console.log('Error updating bio', error);
            }
        } catch (error) {
            console.log('Error updating bio: ', error);
        } finally {
            setLoading(false);
        }
    }

    // Function to toggle avatars visibility
    const toggleAvatars = () => {
        setShowAvatars(prevState => !prevState);
    };


    // Show spinning loader icon while page loads
    if (loading) {
        return (
            <Container fluid className='d-flex justify-content-center'>
                <FontAwesomeIcon icon={faSpinner} size="2xl" style={{color: 'white'}} spin />
            </Container>
        );
    };

    return (
        <Container className='my-4' style={{ backgroundColor: 'rgb(60, 62, 67)', padding: '20px', borderRadius: '10px', color: 'white', boxShadow: '10px 10px 10px rgb(27, 27, 27' }}>
            <Row className='align-items-center' style={{paddingBottom: '1em'}}>
                <Col md={3}>
                    <img src={profile?.avatar || avatars[0].url} alt="Profile Avatar" className='img-fluid' style={{ maxWidth: '200px', borderRadius: '50%'}} />
                </Col>
                <Col md={6}>
                    <h3 style={{color: 'orange'}}>{profile?.display_name.name}&nbsp;&nbsp;<FontAwesomeIcon icon={faUserPen} role="button" size="sm" color="white" onClick={() => setEditBio(true)}/></h3>
                    {!editBio ? (
                        <p style={{minHeight: '5em', fontWeight: '400', backgroundColor: 'rgb(40, 43, 50)', borderRadius: '10px', border: '2px solid white', paddingLeft: '0.7em', paddingRight: '1em', paddingTop: '0.2em', paddingBottom: '0.2em'}}><span style={{color: 'orange'}}>Bio: </span>{profile?.bio || "No bio available"}</p>
                    ) : (
                        <Form onSubmit={updateBio}>
                            <Form.Control as="textarea" value={newBio} onChange={e => setNewBio(e.target.value)} required />
                            <Button type="submit" className="mt-2">Save Bio</Button>
                        </Form>
                    )}
                </Col>
            </Row>
            <Row className='mt-3' style={{ backgroundColor: 'rgb(60, 62, 67)' }}>
            <h4 style={{ paddingBottom: '1em' }}>
                Change Avatar&nbsp;&nbsp;
                <FontAwesomeIcon 
                    icon={showAvatars ? faCaretUp : faCaretDown} 
                    role="button" 
                    size="lg" 
                    onClick={toggleAvatars}
                />
            </h4>
            {showAvatars && avatars.map((avatar, index) => (
                <Col key={index} xs={6} md={4} lg={2} className='mb-3'>
                    <img 
                        src={avatar.url} 
                        alt={avatar.name} 
                        className={`img-thumbnail ${profile?.avatar === avatar.url ? 'border-primary' : ''}`}
                        onClick={() => updateAvatar(avatar.url)}
                        style={{ cursor: 'pointer', maxWidth: '100px' }}
                    />
                </Col>
            ))}
        </Row>
        </Container>
    );
};

export default Profile;

