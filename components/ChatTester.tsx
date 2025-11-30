"use client";
import { useState } from "react";

export default function ChatTester() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [raw, setRaw] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function send() {
    setLoading(true);
    setResult(null);
    setRaw(null);
    console.log("[ChatTester] sending request to /api/chat with:", input);

    const start = Date.now();
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      console.log("[ChatTester] fetch completed, status:", res.status);
      console.log("[ChatTester] response headers:");
      res.headers.forEach((v, k) => console.log("  ", k, v));

      // try JSON, but fall back to text if parse fails
      let json: any = null;
      try {
        json = await res.json();
        console.log("[ChatTester] parsed JSON:", json);
        setResult(json);
      } catch (e) {
        const text = await res.text();
        console.warn("[ChatTester] failed to parse JSON, raw text:", text);
        setRaw(text);
        setResult({ error: "invalid-json", status: res.status });
      }
    } catch (err) {
      console.error("[ChatTester] fetch error:", err);
      setResult({ error: String(err) });
    } finally {
      console.log("[ChatTester] roundtrip ms:", Date.now() - start);
      setLoading(false);
    }
  }

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask something" />
      <button onClick={send} disabled={loading}>
        {loading ? "Sending…" : "Send"}
      </button>
      <div>
        <h4>Result</h4>
        <pre>{result ? JSON.stringify(result, null, 2) : "No response yet"}</pre>
        {raw && (
          <>
            <h4>Raw text</h4>
            <pre>{raw}</pre>
          </>
        )}
      </div>
    </div>
  );
}
