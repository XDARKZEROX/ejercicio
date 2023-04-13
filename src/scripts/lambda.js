export const handler = async(event) => {
    const numOfPlayers = parseInt(event.numOfPlayers);
    const resultString = event.resultString;
    let players = [];

    for(let i = 1; i <= numOfPlayers; i++) {
        players.push({id: i, chips: 3});
    }

    let pot = 0;

    for(let i = 0; i < resultString.length; i++) {
        let result = resultString[i];

        for(let j = 0; j < players.length; j++) {
            let player = players[j];

            if(player.chips > 0) {
                switch(result) {
                    case 'L':
                        if(player.id == 1) {
                            players[players.length - 1].chips++;
                            player.chips--;
                        } else {
                            players[player.id - 2].chips++;
                            player.chips--;
                        }
                        break;
                    case 'R':
                        if(player.id == players.length) {
                            players[0].chips++;
                            player.chips--;
                        } else {
                            players[player.id].chips++;
                            player.chips--;
                        }
                        break;
                    case 'C':
                        pot++;
                        player.chips--;
                        break;
                    default:
                        break;
                }
            }
        }
    }

    let gameState = "Game " + event.gameNumber + ":";

    for(let i = 0; i < players.length; i++) {
        let player = players[i];
        gameState += "\nPlayer " + player.id + " has " + player.chips + " chips.";
    }

    if(pot > 0) {
        gameState += "\nThe Center has " + pot + " chips.";
    }

    const response = {
        statusCode: 200,
        body: gameState
    };

    return response;
};
