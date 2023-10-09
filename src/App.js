import React, { useEffect, useMemo, useState } from "react";

const style = {
  container: {
    padding: "20px",
    border: "1px solid #E0E0E0",
    borderRadius: "15px",
    width: "max-content",
    marginBottom: "40px",
  },
  question: {
    fontWeight: "bold",
    marginBottom: "10px",
  },
  options: {
    marginBottom: "5px",
  },
  button: {
    marginTop: "10px",
    padding: "10px 15px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#FFF",
    fontSize: "14px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  correct: {
    marginTop: "10px",
    fontSize: "14px",
    color: "green",
  },
  incorrect: {
    marginTop: "10px",
    fontSize: "14px",
    color: "red",
  },
};

function App() {
  const questions = useMemo(
    () => [
      {
        question: "What is the capital of France?",
        options: ["London", "Paris", "Berlin", "Madrid"],
        correct: "Paris",
      },
      {
        question: "What is the biggest country on the world?",
        options: ["United States", "Rusia", "China", "Brasil"],
        correct: "China",
      },
    ],
    []
  );

  const [countQuestion, setCountQuestion] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(
    questions[countQuestion]
  );
  const [selectedAnwser, setSelectedAnwser] = useState("");
  const [showScore, setShowScore] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    setCurrentQuestion(() => questions[countQuestion]);
  }, [countQuestion, questions]);

  const handleAnwserChange = (e) => {
    setSelectedAnwser(e.target.value);
  };

  const handleSubmit = () => {
    setIsCorrect(() => false);

    if (selectedAnwser === currentQuestion.correct) {
      setIsCorrect(() => true);
      setScore((score) => score + 1);
    }

    setShowNext(() => true);
    setShowFeedback(() => true);
  };

  const handleNext = () => {
    const len = questions.length - 1;
    if (countQuestion < len)
      setCountQuestion((countQuestion) => countQuestion + 1);
    else setShowScore(() => true);

    setShowNext(() => false);
    setShowFeedback(() => false);
  };

  return (
    <div style={style.container}>
      {!showScore ? (
        <div>
          <div id="question" style={style.question}>
            {currentQuestion.question}
          </div>
          <div style={style.options}>
            <form>
              {currentQuestion.options.map((option, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    value={option}
                    checked={selectedAnwser === option}
                    onChange={handleAnwserChange}
                  />
                  {option}
                </label>
              ))}
            </form>
          </div>
          {!showNext ? (
            <button style={style.button} id="submitBtn" onClick={handleSubmit}>
              Submit
            </button>
          ) : (
            <button style={style.button} id="nextBtn" onClick={handleNext}>
              {countQuestion < questions.length - 1
                ? "Next question"
                : " Watch score"}
            </button>
          )}
          {showFeedback && (
            <div
              id="feedback"
              style={isCorrect ? style.correct : style.incorrect}
            >
              {isCorrect ? "Correct!" : "Incorrect"}
            </div>
          )}
        </div>
      ) : (
        <div style={style.feedback}>
          {`Your score is:  ${score} correct anwsers of ${
            countQuestion + 1
          } questions`}
        </div>
      )}
    </div>
  );
}

export default App;
