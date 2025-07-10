import styles from "../page.module.css";
import Link from "next/link";

export default function FactsPage() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1>Mars Facts</h1>
                <ol>
                    <li>Mars is the fourth planet from the Sun.</li>
                    <li>It is often called the "Red Planet" due to its reddish appearance.</li>
                    <li>Mars has two moons: Phobos and Deimos.</li>
                    <li>A year on Mars is 687 Earth days.</li>
                    <li>Mars has the largest volcano in the solar system, Olympus Mons.</li>
                </ol>
                <div className={styles.ctas}>
                    <Link href="/home" className={styles.secondary}>
                        Back to Home
                    </Link>
                </div>
            </main>
        </div>
    );
}
