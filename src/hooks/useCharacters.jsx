import { useState, useEffect } from 'react';
import { supabase } from '../supabase/client';

const useCharacters = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const projectID = 'ntfdooesmfiusqjkbgem';
                const bucketName = 'images';
                
                let query = supabase.from('characters').select('*');
                const { data, error } = await query;
                if (error) {
                    console.log('Error fetching characters:', error);
                    setError(error);
                }

                const processedData = data.map(character => ({
                    ...character,
                    imageUrl: `https://${projectID}.supabase.co/storage/v1/object/public/${bucketName}/char-${character.id}.jpeg`
                }));

                setCharacters(processedData);
            } catch (error) {
                console.error('Error fetching characters:', error);
                setError(error);
            }
            setLoading(false);
        };

        fetchCharacters();
    }, []);

    return { characters, loading, error };
};

export default useCharacters;
