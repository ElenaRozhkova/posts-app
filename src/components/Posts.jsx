import { useState, useEffect } from "react";
import styles from './Posts.module.css';
import { NavLink } from 'react-router-dom';
import Formular from "./Formular";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPostData();
    }, []);

    async function fetchPostData() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            if (!response.ok) {
                throw new Error('Daten konnten nicht geladen werden');
            }
            const data = await response.json();
            setPosts(data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    if (loading) return <div className={styles.posts}>Lade...</div>;
    if (error) return <div className={styles.posts}>Fehler: {error}</div>;

    return (
        <>
            <Formular />
            <main className={styles.posts}>
                <h2 className={styles.posts_title}>Po
                    sts</h2>
                <ul className={styles.posts_list}>
                    {posts.map(post => (
                        <NavLink key={post.id} to={`/posts/${post.id}`} >
                            <li className={styles.post_item}>
                                <p className={styles.post_title}>{post.title}</p>
                            </li>
                        </NavLink>
                    ))}
                </ul>
            </main >
        </>

    );
}

export default Posts;
