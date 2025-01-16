"use client"

import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  // Funkcja do obsługi wysyłania zapytania do n8n
  const handleGenerateAnswers = async () => {
    try {
      const response = await fetch("http://your-server-ip:5678/webhook/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });
      const data = await response.json();
      setAnswers(data.answers);
      setCorrectAnswer(data.correct);  // Przechowujemy poprawną odpowiedź
    } catch (error) {
      console.error("Błąd przy generowaniu odpowiedzi:", error);
    }
  };

  // Funkcja do obsługi kliknięcia w odpowiedź
  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  // Funkcja do sprawdzenia, czy odpowiedź jest poprawna
  const getAnswerClass = (answer) => {
    if (selectedAnswer === null) return "";
    if (answer === correctAnswer) return "bg-green-500"; // Zaznaczenie na zielono
    if (answer !== correctAnswer && answer === selectedAnswer) return "bg-red-500"; // Zaznaczenie na czerwono
    return "";
  };

  return (
    <div className="flex flex-col items-center">
      <h1>Wpisz temat</h1>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Wpisz temat"
        className="mb-4 p-2 border border-gray-300"
      />
      <button onClick={handleGenerateAnswers} className="mb-4 p-2 bg-blue-500 text-white">
        Generuj odpowiedzi
      </button>

      {answers.length > 0 && (
        <div className="flex flex-col items-center">
          <h2>Wybierz odpowiedź</h2>
          {answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(answer)}
              className={`p-2 my-2 border ${getAnswerClass(answer)} ${selectedAnswer === answer ? "font-bold" : ""}`}
            >
              {answer}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
