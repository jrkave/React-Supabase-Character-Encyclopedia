import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import { supabase } from '../supabase/client';

const useComments = (characterId) => {
    const { user } = useAuth();
    const [comments, setComments] = useState([]);
    const [isCommented, setIsCommented] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            const { data, error } = await supabase
                .from('comments')
                .select(`
                    *,
                    profile:user_id (display_name)
                `)  
                .eq('character_id', characterId);
            
            if (error) {
                console.error('Error fetching comments:', error);
                setError(error);
                setLoading(false);
                return;
            }

            // Map through data to add display_name
            const enrichedComments = data.map(comment => ({
                ...comment,
                display_name: comment.profile ? comment.profile.display_name : 'No name'  // Check if profile exists
            }));

            setComments(enrichedComments);
            setIsCommented(data.some(comment => comment.user_id === user.id));
            setLoading(false);
        };

        fetchComments();
    }, [characterId, user.id]);

    return { comments, isCommented, setComments, setIsCommented, loading, error };
};

export default useComments;
