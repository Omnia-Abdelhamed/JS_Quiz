export class Question {
    constructor(id,title, image, answers, correctAnswer) {
      this.id = id;
      this.title = title;
      this.image = image;
      this.answers = answers;
      this.correctAnswer = correctAnswer;
    }
  
    displayQuestion() {
      const questionArea = document.getElementById("question-area");
      questionArea.innerHTML = '';
      const questionTitle = document.createElement('h2');
      questionTitle.textContent = this.title;
      questionArea.appendChild(questionTitle);
  
      if (this.image) {
        const questionImage = document.createElement('img');
        questionImage.src = `../assets/img/${this.image}`;
        questionImage.alt = "Question Image";
        questionArea.appendChild(questionImage);
      }
  
      const answersList = document.createElement('ul');
      let count = 1;
      this.answers.forEach(answer => {
        const answerItem = document.createElement('li');
        // div for input and label
        const answerContainer = document.createElement('div');
        answerContainer.classList.add("answer-container");
        // input
        const answerInput = document.createElement('input');
        answerInput.setAttribute("type","radio");
        answerInput.setAttribute("id",`q${this.id}-ans${count}`);
        answerInput.classList.add("answer-input");
        answerInput.setAttribute("value",answer);
        answerInput.setAttribute("name",`q${this.id}`);
        // label
        const answerLabel = document.createElement('label');
        answerLabel.setAttribute("for",`q${this.id}-ans${count}`);
        answerLabel.classList.add("answer-label");
        answerLabel.textContent = answer;

        answerInput.addEventListener('change', function(){
          document.querySelectorAll(".answer-label").forEach(label => {
            label.style.backgroundColor = "lightgray";
          });
          if (this.checked) {
            this.closest('.answer-container').querySelector('.answer-label').style.backgroundColor = "gray";
            document.getElementById("next-button").disabled = false;
          }
        });
        
        answerContainer.appendChild(answerInput);
        answerContainer.appendChild(answerLabel);
        answerItem.appendChild(answerContainer);
        answersList.appendChild(answerItem);
        count++;
      });
      questionArea.appendChild(answersList);
    }
}