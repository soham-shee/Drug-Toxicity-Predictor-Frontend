"use client";

import React, { useState } from "react";

export default function ToxicityChecker() {
  const [compound, setCompound] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ compound }),
      });

      const data = await response.json();
      setResult(data.prediction);
    } catch (err) {
      console.error("Error calling backend:", err);
      setResult("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Toxicity Checker</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={compound}
            onChange={(e) => setCompound(e.target.value)}
            placeholder="Enter compound name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Checking..." : "Check Toxicity"}
          </button>
        </form>

        {result && (
          <div
            className={`mt-4 text-center font-semibold ${
              result === "Toxic" ? "text-red-600" : "text-green-600"
            }`}
          >
            Result: {result}
          </div>
        )}
      </div>
    </div>
  );
}
