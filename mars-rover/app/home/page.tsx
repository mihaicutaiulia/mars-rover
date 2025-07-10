import Image from "next/image";
import styles from "../page.module.css";

import Link from 'next/link';

export default function HomePage() {
    return (
        <main style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>🪐Welcome to Mars Explorer</h1>
            <p>Discover amazing photos taken by real Mars Rovers!</p>
            <Link href="/explore">
                <button style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
                    Start Exploring
                </button>
            </Link>
        </main>
    );
}
