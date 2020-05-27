'use strict';

let appData = {
    currentQuestion: 1,
    currentScore: 0,
    totalQuestions: 10,
    questions: [
        {
            id: 1,
            question: 'What animal is Indy afraid of?',
            option1: 'Snakes',
            option2: 'Rats',
            option3: 'Spiders',
            option4: 'Monkeys',
            correctAnswer: 'Snakes'
        },
        {
            id: 2,
            question: 'What weapon does Indy carry with him at all times?',
            option1: 'Knife',
            option2: 'Whip',
            option3: 'Slingshot',
            option4: 'Lightsaber',
            correctAnswer: 'Whip'
        },
        {
            id: 3,
            question: 'What song is Willie singing in the beginning of Temple of Doom?',
            option1: 'I Wanna Be Loved By You',
            option2: 'I\'m In The Mood for Love',
            option3: 'Anything Goes',
            option4: 'Just One of Those Things',
            correctAnswer: 'Anything Goes'
        },
        {
            id: 4,
            question: 'What is Indy\'s young sidekick\'s name in Temple of Doom?',
            option1: 'Data',
            option2: 'Jin',
            option3: 'Short Round',
            option4: 'Belloq',
            correctAnswer: 'Short Round'
        },
        {
            id: 5,
            question: 'Fill in the blank: \"They\'re ________, ya eat \'em!\"',
            option1: 'grapes',
            option2: 'figs',
            option3: 'apples',
            option4: 'dates',
            correctAnswer: 'dates'
        },
        {
            id: 6,
            question: 'In The Last Crusade, what language does Indy have to count in before his dad will listen to him?',
            option1: 'Hebrew',
            option2: 'Latin',
            option3: 'Greek',
            option4: 'Arabic',
            correctAnswer: 'Greek'
        },
        {
            id: 7,
            question: 'Where did Indy get his Fedora?',
            option1: 'His dad',
            option2: 'Garth',
            option3: 'Marcus',
            option4: 'Marion',
            correctAnswer: 'Garth'
        },
        {
            id: 8,
            question: 'Which female character meets Indy in Venice?',
            option1: 'Elsa',
            option2: 'Marion',
            option3: 'Willie',
            option4: 'Irene',
            correctAnswer: 'Elsa'
        },
        {
            id: 9,
            question: 'Where did Indy get his nickname?',
            option1: 'His dad',
            option2: 'His mom',
            option3: 'His dog',
            option4: 'His fellow boy scouts',
            correctAnswer: 'His dog'
        },
        {
            id: 10,
            question: 'What artifact is Indy looking for in the begining of Raiders of the Lost Ark?',
            option1: 'The Idol',
            option2: 'The Holy Grail',
            option3: 'The Ark of the Covenant',
            option4: 'The Cross of Coronado',
            correctAnswer: 'The Idol'
        }
    ]

}

$('#start-button').on('click', function(event) {
    event.preventDefault();
    generateQuestion(appData.currentQuestion);
    $('audio#whip')[0].play();
}) 

/** this function will be responsible for generating the quiz questions
    it should iterate through the questions array, and display one question
    at a time, user can submit answer */
function generateQuestion(questionNum) {
    
    const q = appData.questions[questionNum - 1];
    $('#intro-page').hide();
    $('#feedback-section').hide();
    $('#tracker').show();
    $('#question-text').text(q.question);
    for (let i = 1; i <= 4; i++) {
        $(`#label-${i}`).text(q[`option${i}`]);
        $(`#choice-${i}`).attr('value', q[`option${i}`]);
    }
    $('#question-number').text(appData.currentQuestion);
    $('#user-score').text(appData.currentScore);
    $('#question-form').trigger("reset");
    $('#question-page').show();

}

$('#submit-answer').on('click', function(event){
    event.preventDefault();
    generateFeedback(appData.currentQuestion);
});

function generateFeedback(questionNum) {

    // hide question
    $('#question-page').hide();
    const poorly = "images/poorly.png";
    const wisely = "images/wisely.png";

    // test if selection is correct, if yes, display message
    if ($('input:checked').val() === appData.questions[questionNum -1].correctAnswer) {
        $('#answer-result').text('You have chosen...wisely');
        $('#result-image').attr('src', wisely).attr('alt', 'wisely');
        $('#answer-comment').hide();
        appData.currentScore++;
        $('#user-score').text(appData.currentScore);
    
    // if not, display correct answer
    } else {
        $('#answer-result').text('You have chosen...poorly');
        $('#answer-comment').show();
        $('#result-image').attr('src', poorly).attr('alt', 'poorly');
        $('#answer-comment').text('The correct answer is: ' + `${appData.questions[questionNum -1].correctAnswer}`);
    }

    if (appData.currentQuestion === 10) {
        $('#next-question').hide();
        $('#see-results').show();
    }

    // show feedback
    $('#feedback-section').show();

}

$('#feedback-section').on('click', function(event) {
    handleNextQuestionButton();
});

function handleNextQuestionButton() {
    appData.currentQuestion++;
    generateQuestion(appData.currentQuestion);
    $('audio#whip')[0].play();
}

$('#see-results').on('click', function(event){
    showFinalResult();
    $('audio#whip')[0].play();
});

function showFinalResult() {
    $('#question-page').hide();
    $('#feedback-section').hide();
    $('#tracker-section').hide();
    $('#end-result-section').show();

    // this function will be responsible for displaying the user's final score 
    $('#final-score').text(appData.currentScore);

    // content about the how the user did
    if (appData.currentScore <= 3) {
        $('#final-feedback').text('\"You lost today, kid. But that doesn\'t mean you have to like it.\"');
        $('#final-comment').text('Try again!');
    
    } else if (appData.currentScore >= 4 &&  appData.currentScore < 9) {
        $('#final-feedback').text('\"Fly? Yes. Land? No!\"');
        $('#final-comment').text('Nice job, but take another stab at it!');
    
    } else {
        $('#final-feedback').text('\"Fortune and glory, kid. Fortune and glory.\"');
        $('#final-comment').text('Well done, you know your stuff!');
    }
    
}
// provide a button to start the quiz

$('#start-over').on('click', function(event){
    location.reload();
    
});

