module.exports.roundResult = function (player1, player2) {
    if (player1 === 'rock') {
        if (player2 === 'rock') {
            return 'tie'
        }
        else if (player2 === 'paper') {
            return 'player2'
        }
        else if (player2 === 'scissors') {
            return 'player1'
        }
    }
    else if (player1 === 'paper') {
        if (player2 === 'rock') {
            return 'player1'
        }
        else if (player2 === 'paper') {
            return 'tie'
        }
        else if (player2 === 'scissors') {
            return 'player2'
        }
    }
    else if (player1 === 'scissors') {
        if (player2 === 'rock') {
            return 'player2'
        }
        else if (player2 === 'paper') {
            return 'player1'
        }
        else if (player2 === 'scissors') {
            return 'tie'
        }
    }
}