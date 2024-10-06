const questions = [
    {
        question: "Qual é o valor do logaritmo de 100 na base 10?",
        choices: ["2","10","100","1"],
        answer: "2"
    },
    {
        question: "Qual o valor de log₂(8)?",
        choices: ["1","3","4","8"],
        answer: "3"
    },
    {
        question: "O logaritmo de qual número é indefinido?",
        choices: ["-1","1","100","10"],
        answer: "-1"
    },
    {
        question: "Qual é o valor de log₁₀(10)?",
        choices: ["10","1","0","100"],
        answer: "1"
    },
    {
        question: "Se logₓ(81) = 4, qual o valor de x?",
        choices: ["3","9","81","4"],
        answer: "3"
    },
    {
        question: "Qual é o valor de log₁₀(1)?",
        choices: ["0","1","10","-1"],
        answer: "0"
    },
    {
        question: "Qual é a função inversa da função logarítmica?",
        choices: ["Função quadrática","Função exponencial","Função polinomial","Função linear"],
        answer: "Função exponencial"
    },
    {
        question: "Qual das seguintes expressões representa uma função logarítmica?",
        choices: ["f(x) = x²","f(x) = 2x + 3","f(x) = logₓ(x)","f(x) = e^x"],
        answer: "f(x) = logₓ(x)"
    },
    {
        question: "Qual o valor de log₂(1/8)?",
        choices: ["3","-3","1/3","-1/3"],
        answer: "-3"
    },
    {
        question: "Qual é o valor do logaritmo de 100 na base 10?",
        choices: ["2","10","100","1"],
        answer: "2"
    },
]
let currentQuestionIndex = 0;
let score = 0;
let playerName = "";
let ranking = JSON.parse(localStorage.getItem('ranking')) || [];

function startQuiz() {
    playerName = document.getElementById("nome").value;
    if (playerName === "") {
        alert("Por favor, digite seu nome.");
        return;
    }

    document.querySelector("center").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("reset-ranking-btn").style.display = "none";
    
    loadQuiz();
}

function loadQuiz() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        document.getElementById("quiz").innerHTML = `
            <div class="question">${currentQuestion.question}</div>
            <ul class="choices">
                ${currentQuestion.choices.map((choice, index) => `
                    <li><button onclick="selectAnswer('${choice}')">${choice}</button></li>
                `).join('')}
            </ul>
        `;
    } else {
        endQuiz();
    }
}

function selectAnswer(choice) {
    const currentQuestion = questions[currentQuestionIndex];
    if (choice === currentQuestion.answer) {
        score++;
    }
    currentQuestionIndex++;
    loadQuiz();
}

function endQuiz() {
    document.getElementById("quiz").innerHTML = `<h1>Quiz Completo!</h1><h4>${playerName}, sua pontuação: ${score}/${questions.length}</h4>`;
    saveRanking(playerName, score);
    displayRanking();
    document.getElementById("restart-btn").style.display = "block";
    document.getElementById("reset-ranking-btn").style.display = "block";
}

function saveRanking(name, score) {
    ranking.push({ name, score });
    ranking.sort((a, b) => b.score - a.score);
    localStorage.setItem('ranking', JSON.stringify(ranking));
}

function displayRanking() {
    const rankingDiv = document.getElementById("ranking");
    rankingDiv.innerHTML = "<h2>Ranking:</h2><ol>";
    ranking.forEach(player => {
        rankingDiv.innerHTML += `<li>${player.name}: ${player.score} pontos</li>`;
    });
    rankingDiv.innerHTML += "</ol>";
}

function resetRanking() {
    if (confirm("Tem certeza que deseja apagar o ranking?")) {
        localStorage.removeItem('ranking');
        ranking = [];
        displayRanking();
    }
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("quiz-container").style.display = "none";
    document.querySelector("center").style.display = "block";
    document.getElementById("restart-btn").style.display = "none";
}