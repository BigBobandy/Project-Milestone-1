// get all needed elements
const quizForm = document.getElementById("seo-quiz");
const resetButton = document.getElementById("reset-quiz");
const quizResults = document.getElementById("quiz-results");
const overallResult = document.getElementById("overall-result");
const passFailResult = document.getElementById("pass-fail-result");
const totalScore = document.getElementById("total-score");
const percentageScore = document.getElementById("percentage-score");
const resultsList = document.getElementById("results-list");

const totalQuestions = 5;
const passingPercentage = 70;

// fill in the blank question
function normalizeText(answer) {
  return answer.trim().toLowerCase();
}

// radio question
function getRadioAnswer(questionName) {
  const selectedAnswer = document.querySelector(
    `input[name="${questionName}"]:checked`,
  );

  return selectedAnswer ? selectedAnswer.value : "";
}

// checkbox question
function getCheckboxAnswers(questionName) {
  const selectedAnswers = document.querySelectorAll(
    `input[name="${questionName}"]:checked`,
  );

  return Array.from(selectedAnswers).map((answer) => answer.value);
}

function arraysMatch(userAnswers, correctAnswers) {
  if (userAnswers.length !== correctAnswers.length) {
    return false;
  }

  return correctAnswers.every((answer) => userAnswers.includes(answer));
}

// display feedback directly below an individual quiz question
function displayQuestionFeedback(
  resultElementId,
  isCorrect,
  userAnswer,
  correctAnswer,
) {
  const resultElement = document.getElementById(resultElementId);

  resultElement.classList.remove("correct-result", "incorrect-result");

  if (isCorrect) {
    resultElement.classList.add("correct-result");
  } else {
    resultElement.classList.add("incorrect-result");
  }

  resultElement.innerHTML = `
    <p><strong>${isCorrect ? "Correct" : "Incorrect"}</strong></p>
    <p><strong>Your answer:</strong> ${userAnswer}</p>
    <p><strong>Correct answer:</strong> ${correctAnswer}</p>
    <p><strong>Score:</strong> ${isCorrect ? "1/1" : "0/1"}</p>
  `;
}

// add a question review card to the final results section
function addResultSummary(
  questionNumber,
  isCorrect,
  userAnswer,
  correctAnswer,
) {
  const resultItem = document.createElement("div");

  resultItem.classList.add("result-item");

  if (isCorrect) {
    resultItem.classList.add("correct-result");
  } else {
    resultItem.classList.add("incorrect-result");
  }

  resultItem.innerHTML = `
    <h4>Question ${questionNumber}: ${isCorrect ? "Correct" : "Incorrect"}</h4>
    <p><strong>Your answer:</strong> ${userAnswer}</p>
    <p><strong>Correct answer:</strong> ${correctAnswer}</p>
    <p><strong>Score:</strong> ${isCorrect ? "1/1" : "0/1"}</p>
  `;

  resultsList.appendChild(resultItem);
}

// check all quiz answers and displays the final score
quizForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let score = 0;

  resultsList.innerHTML = "";

  // Question 1
  const questionOneInput = document.getElementById("question-one-answer");
  const questionOneAnswer = normalizeText(questionOneInput.value);
  const questionOneCorrect = questionOneAnswer === "optimization";

  const questionOneDisplay = questionOneInput.value.trim()
    ? questionOneInput.value.trim()
    : "No answer entered";

  if (questionOneCorrect) {
    score++;
  }

  displayQuestionFeedback(
    "question-one-result",
    questionOneCorrect,
    questionOneDisplay,
    "Optimization",
  );

  addResultSummary(1, questionOneCorrect, questionOneDisplay, "Optimization");

  // Question 2
  const questionTwoAnswer = getRadioAnswer("question-two-answer");
  const questionTwoCorrect = questionTwoAnswer === "on-page-seo";

  const questionTwoLabels = {
    "on-page-seo": "On-Page SEO",
    "technical-seo": "Technical SEO",
    "off-page-seo": "Off-Page SEO",
    "email-marketing": "Email marketing",
  };

  const questionTwoDisplay =
    questionTwoLabels[questionTwoAnswer] || "No answer selected";

  if (questionTwoCorrect) {
    score++;
  }

  displayQuestionFeedback(
    "question-two-result",
    questionTwoCorrect,
    questionTwoDisplay,
    "On-Page SEO",
  );

  addResultSummary(2, questionTwoCorrect, questionTwoDisplay, "On-Page SEO");

  // Question 3
  const questionThreeAnswer = getRadioAnswer("question-three-answer");
  const questionThreeCorrect = questionThreeAnswer === "technical-seo";

  const questionThreeLabels = {
    "off-page-seo": "Off-Page SEO",
    "technical-seo": "Technical SEO",
    "on-page-seo": "On-Page SEO",
    "social-media": "Social media",
  };

  const questionThreeDisplay =
    questionThreeLabels[questionThreeAnswer] || "No answer selected";

  if (questionThreeCorrect) {
    score++;
  }

  displayQuestionFeedback(
    "question-three-result",
    questionThreeCorrect,
    questionThreeDisplay,
    "Technical SEO",
  );

  addResultSummary(
    3,
    questionThreeCorrect,
    questionThreeDisplay,
    "Technical SEO",
  );

  // Question 4
  const questionFourAnswer = getRadioAnswer("question-four-answer");
  const questionFourCorrect = questionFourAnswer === "earning-backlink";

  const questionFourLabels = {
    "adding-heading": "Adding a heading to a webpage",
    "earning-backlink": "Earning a backlink from another website",
    "compressing-image": "Compressing a large image",
    "changing-title": "Changing a page title",
  };

  const questionFourDisplay =
    questionFourLabels[questionFourAnswer] || "No answer selected";

  if (questionFourCorrect) {
    score++;
  }

  displayQuestionFeedback(
    "question-four-result",
    questionFourCorrect,
    questionFourDisplay,
    "Earning a backlink from another website",
  );

  addResultSummary(
    4,
    questionFourCorrect,
    questionFourDisplay,
    "Earning a backlink from another website",
  );

  // Question 5
  const questionFiveAnswers = getCheckboxAnswers("question-five-answer");

  const correctQuestionFiveAnswers = [
    "on-page-seo",
    "technical-seo",
    "off-page-seo",
  ];

  const questionFiveCorrect = arraysMatch(
    questionFiveAnswers,
    correctQuestionFiveAnswers,
  );

  const questionFiveLabels = {
    "on-page-seo": "On-Page SEO",
    "technical-seo": "Technical SEO",
    "off-page-seo": "Off-Page SEO",
    "email-marketing": "Email marketing",
    "graphic-design": "Graphic design",
  };

  const questionFiveDisplay =
    questionFiveAnswers.length > 0
      ? questionFiveAnswers
          .map((answer) => questionFiveLabels[answer])
          .join(", ")
      : "No answers selected";

  const questionFiveCorrectDisplay = "On-Page SEO, Technical SEO, Off-Page SEO";

  if (questionFiveCorrect) {
    score++;
  }

  displayQuestionFeedback(
    "question-five-result",
    questionFiveCorrect,
    questionFiveDisplay,
    questionFiveCorrectDisplay,
  );

  addResultSummary(
    5,
    questionFiveCorrect,
    questionFiveDisplay,
    questionFiveCorrectDisplay,
  );

  // Calculate and dispaly score
  const percentage = Math.round((score / totalQuestions) * 100);
  const passedQuiz = percentage >= passingPercentage;

  overallResult.classList.remove("pass-result", "fail-result");

  if (passedQuiz) {
    overallResult.classList.add("pass-result");
    passFailResult.textContent = "You passed the quiz.";
  } else {
    overallResult.classList.add("fail-result");
    passFailResult.textContent = "You did not pass the quiz.";
  }

  totalScore.textContent = `Total score: ${score} out of ${totalQuestions}`;
  percentageScore.textContent = `Percentage: ${percentage}%`;

  quizResults.hidden = false;

  quizResults.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

// clears the quiz answers and all results
resetButton.addEventListener("click", function () {
  const questionResultElements = document.querySelectorAll(".question-result");

  questionResultElements.forEach((resultElement) => {
    resultElement.innerHTML = "";
    resultElement.classList.remove("correct-result", "incorrect-result");
  });

  resultsList.innerHTML = "";

  passFailResult.textContent = "";
  totalScore.textContent = "";
  percentageScore.textContent = "";

  overallResult.classList.remove("pass-result", "fail-result");
  quizResults.hidden = true;

  document.getElementById("quiz-section").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});
