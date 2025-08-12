document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");

  const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
  ];
  let currenQuestionIndex = 0;
  let score = 0;
  let totalattempt = 0;
  startBtn.addEventListener("click", startQuiz);
  function startQuiz() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestion();
  }
  function showQuestion() {
    if (currenQuestionIndex === questions.length) {
      showScore();
      return;
    }
    nextBtn.classList.add("hidden");
    questionText.textContent = questions[currenQuestionIndex].question;
    showChoices();
  }
  function showChoices() {
    const options = questions[currenQuestionIndex].choices;
    choicesList.innerHTML = "";

    options.forEach((choice) => {
      const li = document.createElement("li");

      li.textContent = choice;
      choicesList.appendChild(li);
      li.addEventListener("click", () => showNext(choice));
    });
  }
  function showNext(choice) {
    if (choice === questions[currenQuestionIndex].answer) {
      score++;
    }
    totalattempt++;
    nextBtn.classList.remove("hidden");
    currenQuestionIndex++;
    nextBtn.addEventListener("click", showQuestion);
  }
  function showScore() {
    nextBtn.classList.add("hidden");
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} out of ${totalattempt}`;
    restartBtn.addEventListener("click", () => location.reload());
  }
});
