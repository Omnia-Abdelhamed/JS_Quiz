export class Quiz {
  constructor(questions,timeRemaining) {
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.timeRemaining = timeRemaining;
    this.timerInterval = null;
    this.timerDisplay = document.getElementById("timer-display");
    this.nextButton = document.getElementById("next-button");

    this.nextButton.disabled = true;
    this.nextButton.addEventListener('click', () => this.nextQuestion());
  }

  startQuiz() {
    this.questions = this.shuffleArray(this.questions);
    this.displayCurrentQuestion();
    this.startTimer();
  }

  displayCurrentQuestion() {
    if (this.currentQuestionIndex < this.questions.length) {
      const currentQuestion = this.questions[this.currentQuestionIndex];
      currentQuestion.displayQuestion();
      this.nextButton.disabled = true;
    }else {
      this.displayResults();
    }
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      document.getElementById("timer-display").textContent = `Time: ${this.timeRemaining} seconds`;
      if (this.timeRemaining <= 0) {
        clearInterval(timerInterval);
        this.displayResults();
      }
    }, 1000);
  }

  nextQuestion() {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const selectedInput = document.querySelector(`input[name="q${currentQuestion.id}"]:checked`);
    
    if (selectedInput) {
      if (selectedInput.value === currentQuestion.correctAnswer) {
        this.score++;
      }
    }
    this.currentQuestionIndex++;
    this.displayCurrentQuestion();
  }

  displayResults() {
    clearInterval(this.timerInterval);
    let percentage = (this.score / this.questions.length) * 100;
    percentage = Math.round(percentage);

    const resultsArea = document.getElementById('results-area');
    const percentageSpan = document.getElementById('percentage');
    const scoreText = document.getElementById('score-text');
    const circleWrap = resultsArea.querySelector('.circle-wrap .circle .mask.full');
    const fillCircle = resultsArea.querySelector('.circle-wrap .circle .fill');
    const headTiltle = document.querySelector('#head-title');

    headTiltle.textContent=localStorage.getItem("username")
    percentageSpan.textContent = percentage + "%";
    scoreText.textContent = `You got ${this.score} out of ${this.questions.length} correct answers`;

    const rotationDegrees = (percentage / 100) * 360;

    if (rotationDegrees <= 180) {
      fillCircle.style.transform = `rotate(${rotationDegrees}deg)`;
    } else {
      fillCircle.style.transform = `rotate(180deg)`;
    }
    document.getElementById("question-area").innerHTML = '';
    this.timerDisplay.textContent = '';
    this.nextButton.style.display = 'none';
    resultsArea.classList.add('visible');
    resultsArea.style.display="block";
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}