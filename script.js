function loadTopScore() {
    return JSON.parse(localStorage.getItem("value")) || { "value": 0};
}

document.addEventListener('DOMContentLoaded', () => {

    const scoreBlock = document.createElement('div');
    scoreBlock.classList.add('score');
    scoreBlock.innerText = 'Score: 0';
    
    const topScore = document.createElement('div');
    topScore.classList.add('score'); 
    topScore.innerText = 'Top Score: ' + loadTopScore().value;

    const grid = document.getElementById('grid');
    let score = 0;
    const cellSize = 20; // gridSize = 600; 30 * 30 -- [0 - 29]
    let food = {row: 15, col: 20}; // top left coordinates
    let snake = [{row: 15, col: 8}, {row: 15, col: 9}, {row: 15, col: 10}];
    
    let dx = 0;
    let dy = cellSize;

    let intervalId = null;
    let snakeSpeed = 100;

    function moveFood(){
        food.row = Math.floor(Math.random() * 30);
        food.col = Math.floor(Math.random() * 30);

        for(let i = 0; i < snake.length; i++){
            if(food.row === snake[i].row && food.col === snake[i].col){
                moveFood();
            }
        }
    }

    function updateSnake(){
        const length = snake.length;
        const newHead = {row: snake[length - 1].row + (dx/cellSize), col: snake[length - 1].col + (dy/cellSize)};
        snake.push(newHead);

        if(newHead.row === food.row && newHead.col === food.col){
            score++;
            scoreBlock.innerText = 'Score: ' + score;
            if(snakeSpeed > 75){
                snakeSpeed--;
                clearInterval(intervalId);
                gameLoop();
            }
            moveFood();
        } else {
            snake.shift();
        }
        let mxScore = loadTopScore(); 
        if(score > mxScore.value){
            localStorage.setItem("value", JSON.stringify({ "value": score})); 
            topScore.innerText = 'Top Score: ' + score; 
        }
    }

    function changeDirection(event){
        const isGoingDown = dx === cellSize;
        const isGoingUp = dx === -cellSize;
        const isGoingRight = dy === cellSize;
        const isGoingLeft = dy === -cellSize;

        if(event.key === 'ArrowUp' && !isGoingDown){
            dy = 0;
            dx = -cellSize;
        }
        else if(event.key === 'ArrowDown' && !isGoingUp){
            dy = 0;
            dx = cellSize;
        }
        else if(event.key === 'ArrowLeft' && !isGoingRight){
            dx = 0;
            dy = -cellSize;
        }
        else if(event.key === 'ArrowRight' && !isGoingLeft){
            dx = 0;
            dy = cellSize;
        }
    }

    function drawDiv(startRow, startCol, className){
        const element = document.createElement(className === 'food' ? 'img' : 'div');
        if(className === 'food'){
            element.src = 'https://www.google.com/logos/fnbx/snake_arcade/v17/apple_00.png'; 
        }
        element.classList.add(className);
        element.style.top = (startRow * cellSize) + 'px';
        element.style.left = (startCol * cellSize) + 'px';
        return element;
    }

    function draw(){
        grid.innerHTML = '';

        const foodElement = drawDiv(food.row, food.col, 'food');
        grid.append(foodElement);

        snake.forEach((cell) => {
            const snakeElement = drawDiv(cell.row, cell.col, 'snake');
            grid.append(snakeElement);
        });

        const gameHeader = document.getElementById('gameHeader');
        gameHeader.appendChild(topScore);
    }

    function isGameOver(){
        const head = snake[snake.length - 1];
        if(head.row < 0 || head.row >= 30 || head.col < 0 || head.col >= 30){
            return true;
        }

        for(let i = 0; i < snake.length - 1; i++){
            if(head.row === snake[i].row && head.col === snake[i].col){
                return true;
            }
        }
        return false;
    }

    function gameLoop(){
        intervalId = setInterval(() => {
            updateSnake();
            draw();
            if(isGameOver()){
                gameStarted = false;
                clearInterval(intervalId);
                alert('Game Over' + '\n' + 'Your Score: ' + score);
                location.reload();
            }
        }, snakeSpeed);
    }

    const startBtn = document.createElement('button');
    startBtn.innerText = 'Start Game';
    startBtn.id = 'startBtn';

    const gameHeader = document.getElementById('gameHeader');
    gameHeader.append(startBtn);
    
    startBtn.addEventListener('click', () => {  
        gameHeader.replaceChild(scoreBlock, startBtn);
        document.addEventListener('keydown', changeDirection);
        gameLoop();
    })
    
    draw();
});