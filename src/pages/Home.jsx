import React, { useState, useEffect } from "react";
import useCharacters from '../hooks/useCharacters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from "react-bootstrap";
import CharacterCard from "../components/CharacterCard";

const Home = () => {
  const { characters, loading, error } = useCharacters();
  
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

  // Return character cards
  return (
    <Container fluid>
      <Row>
        {characters.map((character) => (
          <Col xs={10} sm={8} md={4} lg={3} key={character.id} >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', marginTop: '20px'}}>
                <CharacterCard character={character} />
              </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
