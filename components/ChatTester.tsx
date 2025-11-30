"use client";
import { useState } from "react";

export default function ChatTester() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function send() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });
      console.log("fetch response status:", res.status);
      const json = await res.json();
      console.log("fetch response json:", json);
      setResult(json);
    } catch (err) {
      console.error("fetch error:", err);
      setResult({ error: String(err) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask something" />
      <button onClick={send} disabled={loading}>
        {loading ? "Sending…" : "Send"}
      </button>
      <pre>{result ? JSON.stringify(result, null, 2) : "No response yet"}</pre>
    </div>
  );
}
