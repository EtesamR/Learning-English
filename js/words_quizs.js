const maxQuestions = 20;
let currentQuestion = 0;
let correctCount = 0;
let wrongCount = 0;
let usedWords = [];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const counterEl = document.getElementById("counter");
const progressFill = document.getElementById("progressFill");
const restartBtn = document.getElementById("restartBtn");
const scoreEl = document.getElementById("score");
const endScreen = document.getElementById("endScreen");
const finishBtn = document.getElementById("finishBtn");

function getRandomWord() {
  const available = words.filter((w) => !usedWords.includes(w.word));
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function showQuestion() {
  if (currentQuestion >= Math.min(words.length, maxQuestions)) {
    endQuiz();
    return;
  }

  const current = getRandomWord();
  if (!current) return endQuiz();

  usedWords.push(current.word);

  const correctAnswer = current.meaning;
  const allMeanings = words.map((w) => w.meaning);
  let options = [correctAnswer];

  while (options.length < 4) {
    const rand = allMeanings[Math.floor(Math.random() * allMeanings.length)];
    if (!options.includes(rand)) options.push(rand);
  }

  options = shuffle(options);

  questionEl.textContent = `کلمه «${current.word}» یعنی چه؟`;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  counterEl.textContent = `سؤال ${currentQuestion + 1} از ${Math.min(words.length, maxQuestions)}`;

  options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt, correctAnswer);
    optionsEl.appendChild(btn);
  });

  progressFill.style.width = `${((currentQuestion) / Math.min(words.length, maxQuestions)) * 100}%`;
}

function checkAnswer(selected, correct) {
  const buttons = document.querySelectorAll(".option");
  buttons.forEach((b) => (b.disabled = true));

  buttons.forEach((btn) => {
    if (btn.textContent === correct) {
      btn.style.border = "2px solid #149632ff"; 
    }
    if (btn.textContent === selected && selected !== correct) {
      btn.style.border = "2px solid #cc1f30ff"; 
    }
  });

  if (selected === correct) {
    feedbackEl.textContent = "آفرین! درست گفتی ✅";
    feedbackEl.className = "feedback correct";
    correctCount++;
  } else {
    feedbackEl.innerHTML = `❌ اشتباه گفتی. پاسخ درست: <strong>${correct}</strong>`;
    feedbackEl.className = "feedback incorrect";
    wrongCount++;
  }

  scoreEl.textContent = `درست: ${correctCount} — اشتباه: ${wrongCount}`;
  currentQuestion++;

  setTimeout(showQuestion, 1500);
}

function startQuiz() {
  currentQuestion = 0;
  correctCount = 0;
  wrongCount = 0;
  usedWords = [];
  endScreen.style.display = "none";
  finishBtn.style.display = "block";
  restartBtn.textContent = "دوباره"
  scoreEl.textContent = "درست: 0 — اشتباه: 0";
  showQuestion();
}

function endQuiz() {
  questionEl.textContent = "پایان آزمون 🎉";
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  progressFill.style.width = "100%";

  endScreen.style.display = "block";
  endScreen.innerHTML = `<p>تعداد پاسخ‌های درست: <strong>${correctCount}</strong><br>
  تعداد پاسخ‌های اشتباه: <strong>${wrongCount}</strong></p>`;
}

restartBtn.addEventListener("click", startQuiz);
finishBtn.addEventListener("click", endQuiz);