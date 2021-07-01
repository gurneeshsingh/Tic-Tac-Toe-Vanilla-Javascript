// to toggle night mode on switch

const Theme_toggle = document.getElementById("flexSwitchCheckDefault");
let count = 1

Theme_toggle.addEventListener('click', () => {
    count += 1;
    if (count % 2 == 0) {
        document.body.style.backgroundColor = "#1B262C"
        document.body.style.color = "#fff"
        document.getElementById("toggle_text").innerHTML = "Sunrise ☀️"

        //  get the div with cell class 
        let gamegrid = document.querySelectorAll('.cell')
        let i;
        for (i = 0; i < gamegrid.length; i++) {
            gamegrid[i].classList.replace('cell', 'cell_white');
        }

    } else {
        document.body.style.backgroundColor = "#fff"
        document.body.style.color = "#000"
        document.getElementById("toggle_text").innerHTML = "Dim Lights 🌙"

        // reverse the border color to original
        let gamegrid = document.querySelectorAll('.cell_white')
        let x;
        for (x = 0; x < gamegrid.length; x++) {
            gamegrid[x].classList.replace('cell_white', 'cell');
        }


    }
});

// start button 
const game_start_btn = document.getElementById("start_btn")

game_start_btn.addEventListener('click', () => {
    //  replace class to  the game rules container  
    document.querySelector('.gameRules').classList.replace('gameRules', 'swipe_to_left')

    // get the game container div and replace class to center in settimeout
    setTimeout(() => {
        document.querySelector('.gameContainer').classList.replace('gameContainer', 'gameContainer_Center')

    }, 500);


    // GAME LOGIC 


    // only run the game when newgame is clicked 

    //define variable and classes for game to determine which class turn it is x or o 
    const X_CLASS = "x";
    const O_CLASS = "o";

    // define the winning combinations  as an array of an array
    const Winning_combinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];


    const display_message = document.querySelector('.display_message');

    // define wins counts for x and o 

    let x_win_count = 0;
    let o_win_count = 0;

    const x_count_show = document.getElementById('x_wins');
    const o_count_show = document.getElementById('o_wins');

    //define turn 
    let o_Turn

    //firstly grab all the cell elements 
    const all_cells = document.querySelectorAll('[data-cell]'); // data-cell becuase class will eventuyally change 

    // get the board
    const board = document.getElementById('board');

    StartGame();

    function StartGame() {
        o_Turn = false;
        // add event listner to each of the cell , thus loop through the all_cells

        all_cells.forEach((cell) => {
            //remove all the classes and event listners 
            cell.classList.remove(X_CLASS);
            cell.classList.remove(O_CLASS);
            cell.removeEventListener('click', handleClick);
            cell.addEventListener('click', handleClick, { once: true })
        });

        setBoardHoverClass();
        document.getElementById('resetGame').style.display = 'none';

    };



    //define handleclick function

    function handleClick(e) {
        const cell = e.target;
        const currentClass = (o_Turn) ? O_CLASS : X_CLASS;

        // now current class is set , define a function to place mark and run it here
        placeMarker(cell, currentClass);

        // check for win after each turn , thus call checkwin function here
        if (checkWin(currentClass)) {
            // call endgame function 
            endGame(false);
        } else if (checkDraw()) {
            endGame(true)
        } else {
            // once any turn is made , next turn has to be changed , create a function to swap turns 
            swapTurn();

            // after the first turn we want to show the hover effect based on the current class  after the previous turn 
            setBoardHoverClass();
        }


    };

    function endGame(draw) {
        // if draw if true , nobody wins 
        if (draw) {
            display_message.innerHTML = `<h1> Its A Draw !</h1>`
        } else {
            display_message.innerHTML = `<h1>${o_Turn ? "O" : "X"} Wins !</h1>`;
            if (o_Turn) {
                o_win_count += 1
                o_count_show.innerHTML = `${o_win_count}`;

            } else {
                x_win_count += 1;
                x_count_show.innerHTML = `${x_win_count}`;


            }

        }
        document.getElementById('resetGame').style.display = 'flex';
    }

    function placeMarker(cell, currentClass) {
        // just grab the cell and add the current class to it , thats way the turn will be set 
        cell.classList.add(currentClass)
    };

    function swapTurn() {
        // just change the o_turn to its not or opposite , thus it will result in change in the current class
        o_Turn = !o_Turn;
    }

    function setBoardHoverClass() {
        // firstly remove any hover classes if any 
        board.classList.remove(X_CLASS);
        board.classList.remove(O_CLASS);

        // set class based on the current turn 
        if (o_Turn) {
            board.classList.add(O_CLASS);
        } else {
            board.classList.add(X_CLASS);
        }
    };

    function checkWin(currentClass) {
        // firstly iterate over the winning combination and check if any of the wining combination matches
        return Winning_combinations.some(combination => {
            return combination.every(index => {
                return all_cells[index].classList.contains(currentClass)
            })
        })
    };

    function checkDraw() {
        // just check if every cell contains any class of x or o 
        return [...all_cells].every(cell => {
            return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
        })
    };


    // grab the restartgame button , add event listner
    const restartGame = document.getElementById('restart_btn');
    restartGame.addEventListener('click', StartGame)

});


