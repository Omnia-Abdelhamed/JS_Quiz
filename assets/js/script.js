import { Quiz } from './Quiz.js';
import { questions } from './data.js';
onload=() => {
  let username = localStorage.getItem("username") || "";
    if(!username){
        location.assign("index.html");
    }
  const quiz = new Quiz(questions,60);
  quiz.startQuiz();
};