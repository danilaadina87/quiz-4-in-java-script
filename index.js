const quizData = [
    {
        question: "Alege raspunsul corect: 7+8?",
        a: "13",
        b: "16",
        c: "11",
        d: "15",
        correct: "d",
    },
    {
        question: "Alege raspunsul corect: 11-3?",
        a: "5",
        b: "8",
        c: "6",
        d: "7",
        correct: "b",
    },
    {
        question: "Alege raspunsul corect: 9+5",
        a: "14",
        b: "11",
        c: "15",
        d: "13",
        correct: "a",
    },
    {
        question: "Alege raspunsul corect: 11-5",
        a: "9",
        b: "6",
        c: "8",
        d: "7",
        correct: "b",
    },
];
const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const nextQuestion = document.getElementById("next-question")
const allLabel = document.querySelectorAll("label")
const canvas = document.getElementById('custom_canvas')
const jsConfetti = new JSConfetti({ canvas })   
let currentQuiz = 0;
let score = 0;

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}
loadQuiz();


function deselectAnswers() {
    answerEls.forEach((answerEl) => (answerEl.checked = false));
}

function getSelected() {
    let answer;
    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

function checkAnswer(response, sw) {
    switch(response) {
        case 'a':
            sw ? a_text.classList.add("correct") : a_text.classList.add("incorrect")
            break
        case 'b':
            sw ? b_text.classList.add("correct") : b_text.classList.add("incorrect")
            break
        case 'c':
            sw ? c_text.classList.add("correct") : c_text.classList.add("incorrect")
            break
        case 'd':
            sw ? d_text.classList.add("correct") : d_text.classList.add("incorrect")
            break
        default:
            console.log("da");
    }
}

submitBtn.addEventListener("click", () => {
    submitBtn.classList.add("hidden");
    nextQuestion.classList.remove("hidden")
    const answer = getSelected();
    const sw = true
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            checkAnswer(answer, sw);
            score++;
            
        } else {
            checkAnswer(answer, !sw);
            checkAnswer(quizData[currentQuiz].correct, sw);
        }
        
    }
});

nextQuestion.addEventListener("click", () => {
    submitBtn.classList.remove("hidden");
    nextQuestion.classList.add("hidden")
    currentQuiz++;
    allLabel.forEach((el) => el.className = '');
    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        if(score === quizData.length){
            for(let i = 0 ; i < 3 ; i++){
                setTimeout(() => {
                    jsConfetti.addConfetti({
                        emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
                    }) 
                }, i * 300);
            }
        }
        quiz.innerHTML = `
        <h2>You answered ${score}/${quizData.length} questions correctly</h2>
        <button onclick="window.location.reload(true)">Reload</button>`;
    }
});


