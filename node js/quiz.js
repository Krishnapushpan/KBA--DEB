const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "Madrid", "Lisbon"],
    answer: 0
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    answer: 2
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: 1
  }
];

let currentQuestionIndex = 0;
let score = 0;
const timeLimit = 10; // Time limit per question (in seconds)
let timer;

function askQuestion() {
  if (currentQuestionIndex < quizData.length) {
    const question = quizData[currentQuestionIndex];
    console.log(`\n${question.question}`);
    question.options.forEach((option, index) => {
      console.log(`${index}: ${option}`);
    });

    startTimer();
    rl.question("Enter your answer (0-3): ", (answer) => {
      clearInterval(timer);
      handleAnswer(parseInt(answer));
    });
  } else {
    endQuiz();
  }
}

function startTimer() {
  let timeLeft = timeLimit;
  console.log(`You have ${timeLeft} seconds to answer...`);

  timer = setInterval(() => {
    timeLeft--;
    console.log(`Time left: ${timeLeft}s`);

    if (timeLeft === 0) {
      clearInterval(timer);
      console.log("Time's up! Moving to the next question...");
      currentQuestionIndex++;
      askQuestion();
    }
  }, 100000);
}

function handleAnswer(answer) {
  const correctAnswer = quizData[currentQuestionIndex].answer;
  if (answer === correctAnswer) {
    console.log("Correct!");
    score++;
  } else {
    console.log(`Wrong! The correct answer was: ${quizData[currentQuestionIndex].options[correctAnswer]}`);
  }
  currentQuestionIndex++;
  askQuestion();
}

function endQuiz() {
  console.log(`\nQuiz over! Your score: ${score} / ${quizData.length}`);
  rl.close();
}

console.log("Welcome to the Quiz!");
askQuestion();
