import { useState } from 'react';
import styles from './Formular.module.css';

const Formular = () => {
    const [newPost, setNewPost] = useState({
        title: '',
        body: ''
    });
    const [errors, setErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState(null);

    const validate = () => {
        const newErrors = {};
        if (!newPost.title) newErrors.title = 'Titel darf nicht leer sein.';
        if (!newPost.body) newErrors.body = 'Inhalt darf nicht leer sein.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    title: newPost.title,
                    body: newPost.body,
                    userId: 1
                })
            });

            if (!response.ok) throw new Error('Fehler beim Senden des Posts.');

            const result = await response.json();
            console.log('Erfolgreich gesendet:', result);
            setSubmitStatus('success');
            setNewPost({ title: '', body: '' });
            setErrors({});
        } catch (error) {
            console.error(error);
            setSubmitStatus('error');
        }

        console.log("Gesendet:", newPost);
    };

    const handleChange = (field) => (e) => {
        setNewPost(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    return (
        <form className={styles.formular} onSubmit={handleSubmit}>
            <h2>Neuer Post</h2>
            <div className={styles.form_group}>
                <label htmlFor="title">Titel:</label>
                <input id="title" type="text" value={newPost.title} onChange={handleChange('title')} />

                {errors.title && <div className={styles.error_message}>{errors.title}</div>}
            </div>
            <div className={styles.form_group}>
                <label htmlFor="body">Text:</label>
                <textarea id="body" rows="5" value={newPost.body} onChange={handleChange('body')} />
                {errors.body && <div className={styles.error_message}>{errors.body}</div>}
            </div>
            <button type="submit" className={styles.submit_button}>Absenden</button>
            {submitStatus === 'success' && (
                <div className={styles.success}>Post erfolgreich gesendet!</div>
            )}
            {submitStatus === 'error' && (
                <div className={styles.error}>Fehler beim Senden. Bitte erneut versuchen.</div>
            )}
        </form>
    );
};

export default Formular;
