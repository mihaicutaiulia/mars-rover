'use client';

import { useState } from 'react';
import styles from '../page.module.css';
import Link from 'next/link';

import { questions } from './questions';

export default function QuizPage() {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [score, setScore] = useState(0);

    const handleSelect = (idx: number) => {
        setSelected(idx);
        setShowAnswer(true);
        if (idx === questions[current].answer) setScore(score + 1);
    };

    const handleNext = () => {
        setSelected(null);
        setShowAnswer(false);
        setCurrent(current + 1);
    };

    const isFinished = current >= questions.length;

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1>Mars Quiz</h1>
                {isFinished ? (
                    <div>
                        <p>Your score: {score} / {questions.length}</p>
                        <div className={styles.ctas}>
                            <Link href="/home" className={styles.secondary}>
                                Back to Home
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p>{questions[current].question}</p>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {questions[current].options.map((opt, idx) => (
                                <li key={idx} style={{ margin: '8px 0' }}>
                                    <button
                                        onClick={() => handleSelect(idx)}
                                        disabled={showAnswer}
                                        style={{
                                            padding: '8px 16px',
                                            borderRadius: 8,
                                            border: idx === selected
                                                ? idx === questions[current].answer
                                                    ? '2px solid green'
                                                    : '2px solid red'
                                                : '1px solid #ccc',
                                            background: idx === selected ? '#fffff' : '#fffff',
                                            cursor: showAnswer ? 'default' : 'pointer',
                                            width: '100%',
                                            textAlign: 'left'
                                        }}
                                    >
                                        {opt}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        {showAnswer && (
                            <div>
                                {selected === questions[current].answer
                                    ? <p style={{ color: 'green' }}>Correct!</p>
                                    : <p style={{ color: 'red' }}>Incorrect. The correct answer is "{questions[current].options[questions[current].answer]}".</p>
                                }
                                <button onClick={handleNext} className={styles.secondary} style={{ marginTop: 16 }}>
                                    {current === questions.length - 1 ? 'Finish' : 'Next'}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}