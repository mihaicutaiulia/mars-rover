import Image from "next/image";
import styles from "../page.module.css";
import rocketStyle from "./rocket.module.css";

import Link from 'next/link';

export default function HomePage() {
    return (
        <div className={styles.page}>
            <img src="/spaceship.png" alt="Rocket" className={rocketStyle.rocket} />
            <main className={styles.main}>
                <h1 className={styles.title}>Welcome to Mars Explorer</h1>
                <p className={styles.description}>
                    Discover amazing photos taken by real Mars Rovers!
                </p>
                <div className={styles.ctas}>
                    <a
                        href="/explore"
                        rel="noopener noreferrer"
                        className={styles.secondary}
                    >
                        Start Exploring
                    </a>
                    <a
                        href="/facts"
                        rel="noopener noreferrer"
                        className={styles.secondary}
                    >
                        Read facts
                    </a>
                    <a
                        href="quiz"
                        rel="noopener noreferrer"
                        className={styles.secondary}
                    >
                        Quiz Yourself
                    </a>
                </div>
            </main>
        </div>
    );
}
