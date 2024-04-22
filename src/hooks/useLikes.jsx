import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import { supabase } from '../supabase/client';

const useLikes = (characterId) => {
    const { user } = useAuth();
    const [likes, setLikes] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLikes = async () => {
            const { data, error } = await supabase.from('likes').select('*').eq('character_id', characterId);
            if (error) {
                console.error('Error fetching likes:', error);
                setError(error.message);
                setLoading(false);
                return;
            }

            setLikes(data);
            setIsLiked(data.some(like => like.user_id === user.id));
            setLoading(false);
        };

        fetchLikes();
    }, [characterId, user.id]);

    return { likes, isLiked, setLikes, setIsLiked, loading, error };
};

export default useLikes;

