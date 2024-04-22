import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthProvider';
import useLikes from '../hooks/useLikes';
import { supabase } from '../supabase/client';
import '../styles/FaButton.css';

function LikeButton({ id }) {
    const { likes, isLiked, setLikes, setIsLiked, loading } = useLikes(id);
    const { user } = useAuth();

    const handleLikeClick = async () => {
        if (loading) return; // Prevent action if already processing

        const newIsLiked = !isLiked;
        setIsLiked(newIsLiked); // Optimistically update the UI

        if (newIsLiked) {
            // User is liking the item
            const { error } = await supabase.from('likes').insert([{ character_id: id, user_id: user.id }]);
            if (error) {
                console.error('Error liking:', error);
                setIsLiked(!newIsLiked); // Revert state on error
            } else {
                setLikes(likes + 1); // Increment likes count
            }
        } else {
            // User is unliking the item
            const { error } = await supabase.from('likes').delete().match({ character_id: id, user_id: user.id });
            if (error) {
                console.error('Error unliking:', error);
                setIsLiked(!newIsLiked); // Revert state on error
            } else {
                setLikes(likes - 1); // Decrement likes count
            }
        }
    };

    return (
        <span className="section">
            <FontAwesomeIcon
                className="fa-button"
                icon={faThumbsUp}
                role="button"
                color={isLiked ? 'orange' : 'white'}
                onClick={handleLikeClick}
            />
            <span id="count">&nbsp;&nbsp;{likes.length}</span>
        </span>
    );
}

export default LikeButton;
