'use client'

import { useState } from "react";
import styles from "../page.module.css";

export default function AskMePage() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAsk = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setAnswer("");
        const apiKey = process.env.GEMINI_API_KEY;
        const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [
                        { parts: [{ text: question }] }
                    ]
                }),
            }
        );
        const data = await res.json();
        setAnswer(
            // data?.candidates?.[0]?.content?.parts?.[0]?.text || "No answer."
            data?.error.text || "No answer." // Handle error case
        );
        setLoading(false);
    };

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1 className={styles.title}>Ask Gemini</h1>
                <form onSubmit={handleAsk} style={{ display: "flex", gap: 8 }}>
                    <input
                        type="text"
                        value={question}
                        onChange={e => setQuestion(e.target.value)}
                        placeholder="Ask something..."
                        required
                        style={{ flex: 1, padding: 8 }}
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? "Thinking..." : "Ask"}
                    </button>
                </form>
                {answer && (
                    <div style={{ marginTop: 24, background: "#000000", padding: 16, borderRadius: 8 }}>
                        <strong>Gemini:</strong> {answer}
                    </div>
                )}
            </main>
        </div>
    );
}
