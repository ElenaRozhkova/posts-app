import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Posts.module.css';

const Post = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        async function fetchData() {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
                const result = await response.json();
                if (isMounted) {
                    setLoading(false);
                    setPost(result)
                }
            }
            catch (error) {
                if (isMounted) {
                    setError(error.message);
                    setLoading(false);
                }
            }
        } fetchData();
    }, [postId])

    if (loading) return <div className={styles.posts}>Lade...</div>;
    if (error) return <div className={styles.posts}>Fehler: {error}</div>;


    return (

        <main className={styles.posts}>
            <h2 className={styles.posts_title}>Post {post.id}</h2>
            <div className={styles.posts_list}>
                <div className={styles.post_item}>
                    <p className={styles.post_title}>{post.title}</p>
                    <p className={styles.post_body}>{post.body}</p>
                </div>
            </div>
        </main >

    );
}

export default Post;
