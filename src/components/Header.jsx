import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';


const Header = () => {

    return (
        <header className={styles.header}>
            <nav>
                <div className={styles['left-links']}>
                    <NavLink to="/" className={({ isActive }) => isActive ? styles.activeLink : ''}>
                        Home
                    </NavLink>
                    <NavLink to="/posts" className={({ isActive }) => isActive ? styles.activeLink : ''}>
                        Posts
                    </NavLink>
                </div>
            </nav>
        </header>
    );
};

export default Header;
