"use client"
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [prompt, setPrompt] = useState("");
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setResponseText("");
    setError("");
  
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });
  
      const data = await res.json();
      setResponseText(data.text);
    } catch (err) {
      setError("Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", padding: 24, border: "1px solid #eee", borderRadius: 10 }}>
      <div className="mb-4">
        <Link href="/">
          <Button variant="outline" size="sm" className="bg-transparent">
            Back to home
          </Button>
        </Link>
      </div>
      <h2 className="text-xl font-semibold mb-4">Ask Gemini (Google LLM)</h2>
      <div className="mb-2 text-sm text-gray-600">
        <span>Model used: </span>
        <span className="font-mono px-1 py-0.5 rounded bg-gray-200">gemini-3-flash-preview</span>
      </div>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your question or prompt"
        className="w-full px-3 py-2 mb-2 border rounded"
      />
      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading || !prompt.trim()}
      >
        {loading ? "Loading..." : "Ask Gemini"}
      </button>

      {error && (
        <div className="mt-4 text-red-500">{error}</div>
      )}

      {responseText && (
        <div className="mt-4 p-3 border rounded bg-gray-50">
          <strong>Response:</strong>
          <div>{responseText}</div>
        </div>
      )}
    </div>
  );
};

export default Page;




