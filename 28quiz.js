(function() {
    const myQuestions = [
    {
    question: "Which sea creature has three hearts? ",
    answers: {
    a: "Octopus",
    b: "Blue Whale",
    c: "Sea Turtle"
    },
    correctAnswer: "a"
    },
    {
    question: "What is the Italian word for pie?",
    answers: {
    a: "Donut",
    b: "Pie cake",
    c: "Pizza"
    },
    correctAnswer: "c"
    },
    {
    question: "Which is the only mammal that can not jump?",
    answers: {
    a: "Snake",
    b: "Elephant",
    c: "Kangaroo",
    },
    correctAnswer: "b"
    }
    ];
     
    function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];
     
    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
    // we'll want to store the list of answer choices
    const answers = [];
     
    // and for each available answer...
    for (letter in currentQuestion.answers) {
    // ...add an HTML radio button
    answers.push(
    `<label id="${questionNumber}${letter}" href="#">
    <input type="radio" name="question${questionNumber}" value="${letter}"} id="${questionNumber}${letter}"">
    ${letter} :
    ${currentQuestion.answers[letter]}
    </label>`
    );
    }
     
    // add this question and its answers to the output
     
    output.push(
    `<div class="slide">
    <div class="question"> ${currentQuestion.question} </div>
    <div class="answers"> ${answers.join("")} </div>
    </div>`
    );
    });
     
    // finally combine our output list into one string of HTML and put it on the page
     
    quizContainer.innerHTML = output.join("");
    }
     
    function showResults() {
    // gather answer containers from our quiz
     
    const answerContainers = quizContainer.querySelectorAll(".answers");
     
    // keep track of user's answers
     
    let numCorrect = 0;
     
    // for each question...
     
    myQuestions.forEach((currentQuestion, questionNumber) => {
     
    // find selected answer
     
    const answerContainer = answerContainers[questionNumber];
    const selector = `label input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;
    const answerID = (answerContainer.querySelector(selector) || {}).id;
    const selector1 = `label[id="${answerID}"]`; //Select user's answer
    var answerElem = answerContainer.querySelector(selector1);
    const selector2 = `label[id="${questionNumber}${currentQuestion.correctAnswer}"]`;
    var answerElem1 = answerContainer.querySelector(selector2);
     
    // if answer is correct
     
    if (userAnswer === currentQuestion.correctAnswer) {
    // add to the number of correct answers
     
    numCorrect++;
     
    // color the answers green
     
    //console.log(answerElem)
     
    answerElem.style.background = "#70F85A";
    answerElem.style.fontWeight = "900";
     
    } else {
    // if answer is wrong or blank
    // color the answers red
     
    answerElem1.style.color="#70F85A";
    answerElem.style.background="#FD2929";
    answerElem1.style.fontWeight = "900";
    //console.log(answerContainers)
    }
    });
     
    // show number of correct answers out of total
     
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }
     
    function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
     
    if (currentSlide === 0) {
    previousButton.style.display = "none";
    } else {
    previousButton.style.display = "inline-block";
    }
     
    if (currentSlide === slides.length - 1) {
    nextButton.style.display = "none";
    submitButton.style.display = "inline-block";
    } else {
    nextButton.style.display = "inline-block";
    submitButton.style.display = "none";
    }
    }
     
    function showNextSlide() {
    showSlide(currentSlide + 1);
    }
     
    function showPreviousSlide() {
    showSlide(currentSlide - 1);
    }
     
    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");
     
    // display quiz right away
     
    buildQuiz();
     
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
     
    showSlide(0);
     
    // on submit, show results
     
    submitButton.addEventListener("click", showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
    })();