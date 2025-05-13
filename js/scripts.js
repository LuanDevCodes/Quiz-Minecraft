// DECLARAÇÃO DE VARIÁVEIS
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answer-box");
const quizContainer = document.querySelector("#quiz-container");
const scoreContainer = document.querySelector("#score-container");
const messageContainer = document.querySelector("#message-container");
const letters = ['a', 'b', 'c', 'd'];
let points = 0;
let actualQuestion = 0;

// AS PERGUNTAS E AS RESPOSTAS (array)
const questions = [
    {
        "question": "Qual das seguintes combinações pode gerar um golem naturalmente em uma vila?",
        "answers": [
            {
                "answer": "Três aldeões, uma estação de trabalho e uma cama",
                "correct": true
            },
            {
                "answer": "Quatro camas, dois sinos e cinco portas",
                "correct": false
            },
            {
                "answer": "Pelo menos um aldeão e um sino",
                "correct": false
            },
            {
                "answer": "Dez aldeões e pelo menos um bloco de ouro",
                "correct": false
            },
        ],
    },
    {
        "question": "Qual dessas plantas só pode ser obtida negociando com aldeões ou em baús especiais?",
        "answers": [
            {
                "answer": "Bambu",
                "correct": false
            },
            {
                "answer": "Cogumelo do Nether",
                "correct": false
            },
            {
                "answer": "Planta do Chorus",
                "correct": true
            },
            {
                "answer": "Cacto",
                "correct": false
            },
        ],
    },
    {
        "question": "O que acontece se um Ghast atirar uma bola de fogo em um bloco de mel?",
        "answers": [
            {
                "answer": "O bloco explode",
                "correct": false
            },
            {
                "answer": "A bola de fogo ricocheteia",
                "correct": false
            },
            {
                "answer": "A bola de fogo gruda no bloco",
                "correct": true
            },
            {
                "answer": "Nada, o bloco é imune",
                "correct": false
            },
        ],
    },
    {
        "question": "Em qual bioma NÃO é possível encontrar Axolotes naturalmente?",
        "answers": [
            {
                "answer": "Floresta de Bambu",
                "correct": false
            },
            {
                "answer": "Deserto",
                "correct": true
            },
            {
                "answer": "Pântano",
                "correct": false
            },
            {
                "answer": "Cavernas de Lush Caves",
                "correct": false
            },
        ],
    },
    {
        "question": "Qual chefe NÃO pode ser revivido após ser derrotado?",
        "answers": [
            {
                "answer": "Ender Dragon",
                "correct": false
            },
            {
                "answer": "Wither",
                "correct": true
            },
            {
                "answer": "Elder Guardian",
                "correct": false
            },
            {
                "answer": "Devastador (Ravager)",
                "correct": false
            },
        ],
    },
]

//SUBSTITUIÇÃO DO QUIZ PARA A PRIMEIRA PERGUNTA
function init(){
    //Vai criar a primeira pergunta
    createQuestion(0);
}

//CRIA AS PERGUNTAS
function createQuestion(x){
    //Primeiro, vamos limpar as quesões anteriores
    const oldButtons = answersBox.querySelectorAll("button");
    
    oldButtons.forEach(function(btn){
        btn.remove();
    });

    //Segundo, alterando o texto da pergunta via DOOM
    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");

    questionText.textContent = questions[x].question; //Vai selecionar o conteúdo de texto do array questions, e o conteúdo "question"
    questionNumber.textContent = x + 1; //Vai exibir o número com base no auto incremento, começando como zero e aumentando gradualmente

    //Insere as alternativas
    questions[x].answers.forEach(function(answer, x){

        //Cria o template do botão do quiz, cria as 4 alternativas (mas com aquelas informações aleatórias que coloquei no html)
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);
        
        const letterBtn = answerTemplate.querySelector(".btn-letter"); //Selecionando a letra
        const answerText = answerTemplate.querySelector(".question-answer"); //Selecionando o texto

        letterBtn.textContent = letters[x];
        answerText.textContent = answer['answer'];
        
        answerTemplate.setAttribute("correct-answer", answer["correct"]);

        //Removendo o Hide e o Template Class
        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-template");

        //Inserindo as alternativas na tela
        answersBox.appendChild(answerTemplate); //Toda vez que entrar uma nova alternativa ela vai ser jogada sobre a outra

        //Inserir evento de click no botão
        answerTemplate.addEventListener("click", function(){
            checkAnswer(this); //Invocando a função e passando o parâmetro "this" pois ele está se referindo ao botão que foi clicado
        });
    });

    //Incrementando o número da questão
    actualQuestion++;
}

//VERIFICANDO AS RESPOSTAS DO USUÁRIO
function checkAnswer(btn){
    
    //Seleciona todos os botões
    const buttons = answersBox.querySelectorAll("button");

    //Verifica se a resposta está correta e adiciona as classes dos botões
    buttons.forEach(function(button){
        if(button.getAttribute("correct-answer") == "true"){
            button.classList.add("correct-answer");

            //Checa se o usuário acertou a pergunta
            if (btn == button){ //Se o botão que o usuário apertou for igual a esse botão que eu estou no loop e por acaso esse ser o correto
                //Incremento dos pontos
                points++;
            }
        }else{
            button.classList.add("wrong-answer");
        }
    });

   //Exibir próxima pergunta
   nextQuestion();
}

//EXIBE A PRÓXIMA QUESTÃO DO QUIZ
function nextQuestion(){
 
    //Timer para o usuário ver as respostas
    setTimeout(function(){
        //Verifica se ainda há perguntas
        if(actualQuestion >= questions.length){
            //Apresenta a mensagem de sucesso
            showSucessMessage();
            return; //Vai impedir o resto do código de executar desnecessariamente após isso
        }

        createQuestion(actualQuestion);
    }, 700);
}

//EXIBE A TELA FINAL
function showSucessMessage(){

    escondendoElementos();

    //Trocar dados da tela de sucesso
    //Calculando o score
    const score = ((points / questions.length) * 100).toFixed(2); //Aqui estamos conseguindo a porcentagem de acertos

    //Alterando o score com base no cálculo anterior
    const displayScore = document.querySelector("#display-score span");
    displayScore.textContent = score.toString(); //Convertendo o resultado da conta para uma string

    //Alterando o número de perguntas corretas
    const correctAnswers = document.querySelector("#corret-answer");
    correctAnswers.textContent = points;

    confetti(); //É uma função pronta, não precisei editar nada
}

//ALTERANDO AS CLASSES PARA ESCONDER OS ELEMENTOS
function escondendoElementos(){ //Vai inserir a classe hide se não tiver e retirar se ela tiver, por isso vai funcionar com o score
    quizContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");
    messageContainer.classList.toggle("hide"); //Pra esconder aquela mensagem animada também
}

//REINICIAR O QUIZ
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function(){

    //Zerando o jogo
    actualQuestion = 0;
    points = 0;
    escondendoElementos();
    init();
});

//INICIALIZAÇÃO DO QUIZ
init();