import { supabase } from "./client.js";

// Format strings
function formatString(string) {
    return string[0].toUpperCase() + string.slice(1);
}

// API Endpoint to Rick and Morty characters
const charEndpoint = 'https://rickandmortyapi.com/api/character';

// Function to fetch characters from API 
async function fetchCharacters(url) {
    let characters = []; 
    for (let i = 1; i < 827; i++) {
        // Request for character information
        const charResponse = await fetch(`${url}/${i}`);
        const charJSON = await charResponse.json();
        // Request for the episode in which the character first appeared
        const epResponse = await fetch(charJSON.episode[0]);
        const epJSON = await epResponse.json();
        const epName = epJSON.name;

        const character = 
            {'id': parseInt(charJSON.id),
            'name': charJSON.name,
            'status': formatString(charJSON.status),
            'species': charJSON.species,
            'gender': formatString(charJSON.gender),
            'origin': charJSON.origin.name,
            'location': charJSON.location.name,
            'image': charJSON.image,
            'episode': epName,
            'url': charJSON.url,
            'likes': 0}
        
            characters.push(character);
        }
    return characters;
}

async function insertCharacters() {
    try {
        const characters = await fetchCharacters(charEndpoint);
        const response = await supabase.from('characters').insert(characters);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

// insertCharacters();
