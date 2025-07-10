import styles from './navbar.module.css';

export default function Navbar() {
    return (
        <nav>
            <div className={styles.topnav}>
                <a href="/planets">Planets</a>
                <a href="/quiz">Quiz</a>
                <a href="/explore">Explore</a>
                <a href="/facts">Facts</a>
                <a className="active" href="/home">Home</a>
            </div>
        </nav>
    );
}