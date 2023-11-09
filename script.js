// Initialize variables
let [userScore, computerScore, userChoices, gameResults, choices, lastComputerChoice] = [0, 0, [], [], ['rock', 'paper', 'scissors'], undefined];

// Add event listeners to buttons
['resetBtn', 'rock', 'paper', 'scissors'].forEach(id => {
    document.getElementById(id).addEventListener('click', () => {
        if (id === 'resetBtn') {
            resetGame();
        } else {
            userPlay(id);
        }
    });
});

// Function to reset the game
function resetGame() {
    userScore = 0;
    computerScore = 0;
    userChoices = [];
    gameResults = [];
    lastComputerChoice = undefined;

    ['computer-score1', 'computer-score2', 'names2', 'img', 'img2'].forEach(id => {
        if (id.includes('score')) {
            document.getElementById(id).innerHTML = "0";
        } else if (id === 'names2') {
            document.getElementById(id).innerHTML = "?";
        } else {
            document.getElementById(id).innerHTML = "";
        }
    });
}

// Function for user's play
function userPlay(userChoice) {
    let computerChoice = getComputerChoice();
    let choiceToImage = {
        'rock': "<img src='rock.png'>",
        'paper': "<img src='paper.png'>",
        'scissors': "<img src='scissors.png'>"
    };

    userChoices.push(userChoice);
    ['img2', 'img'].forEach(id => {
        document.getElementById(id).innerHTML = choiceToImage[id === 'img2' ? computerChoice : userChoice];
    });

    let result = userChoice === computerChoice ? 'draw' : 
                 (userChoice === 'rock' && computerChoice === 'scissors') || 
                 (userChoice === 'scissors' && computerChoice === 'paper') || 
                 (userChoice === 'paper' && computerChoice === 'rock') ? 'win' : 'lose';

    if (result === 'win') userScore++;
    else if (result === 'lose') computerScore++;

    document.getElementById('names2').innerHTML = result === 'draw' ? "=" : result === 'win' ? ">" : "<";
    gameResults.push(result);
    ['computer-score1', 'computer-score2'].forEach((id, i) => {
        document.getElementById(id).innerHTML = i === 0 ? userScore : computerScore;
    });
}

// Function to get computer's choice
function getComputerChoice() {
    let patternFrequency = {};
    for (let i = 0; i < userChoices.length; i++) {
        for (let patternLength = 1; patternLength <= 10 && i + patternLength < userChoices.length; patternLength++) {
            let pattern = userChoices.slice(i, i + patternLength).join('');
            let nextMove = userChoices[i + patternLength];
            if (!patternFrequency[pattern]) patternFrequency[pattern] = {};
            if (!patternFrequency[pattern][nextMove]) patternFrequency[pattern][nextMove] = 0;
            patternFrequency[pattern][nextMove]++;
        }
    }
    for (let patternLength = 10; patternLength >= 1; patternLength--) {
        let pattern = userChoices.slice(-patternLength).join('');
        if (patternFrequency[pattern]) return beat(Object.keys(patternFrequency[pattern]).reduce((a, b) => patternFrequency[pattern][a] > patternFrequency[pattern][b] ? a : b));
    }
    return choices[Math.floor(Math.random() * choices.length)];
}

// Function to beat the choice
function beat(choice) {
    return {'rock': 'paper', 'paper': 'scissors', 'scissors': 'rock'}[choice];
}