document.addEventListener('DOMContentLoaded', () => {

    const scoreBlock = document.createElement('div');
    scoreBlock.id = 'score';
    scoreBlock.innerText = 'Score: 0';

    const grid = document.getElementById('grid');
    let gameStarted = false;
    let score = 0;
    const gridSize = 600; // 30 * 30 -- [0 - 29]
    const cellSize = 20; 
    let food = {row: 15, col: 20}; // top left coordinates
    let snake = [{row: 15, col: 8}, {row: 15, col: 9}, {row: 15, col: 10}];
    
    let dx = 0;
    let dy = cellSize;

    function updateSnake(){
        const length = snake.length;
        const newHead = {row: snake[length - 1].row + (dx/cellSize), col: snake[length - 1].col + (dy/cellSize)};
        snake.push(newHead);

        if(newHead.row === food.row && newHead.col === food.col){
            score++;
            scoreBlock.innerText = 'Score: ' + score;
            food = {row: Math.floor(Math.random() * 30), col: Math.floor(Math.random() * 30)};
        } else {
            snake.shift();
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
        return;
    }

    function drawDiv(startRow, startCol, className){
        const div = document.createElement('div');
        div.classList.add(className);
        div.style.top = (startRow * cellSize) + 'px';
        div.style.left = (startCol * cellSize) + 'px';
        return div;
    }

    function draw(){
        grid.innerHTML = '';

        const foodElement = drawDiv(food.row, food.col, 'food');
        grid.append(foodElement);

        snake.forEach((cell) => {
            const snakeElement = drawDiv(cell.row, cell.col, 'snake');
            grid.append(snakeElement);
        });
    }

    function gameLoop(){
        setInterval(() => {
            updateSnake();
            draw();
        }, 200);
    }

    function startGame(){

        const startBtn = document.createElement('button');
        startBtn.innerText = 'Start Game';
        startBtn.id = 'startBtn';

        const gameHeader = document.getElementById('gameHeader');
        gameHeader.append(startBtn);
        
        startBtn.addEventListener('click', () => {  
            gameHeader.replaceChild(scoreBlock, startBtn);
            gameStarted = true;
            document.addEventListener('keydown', changeDirection);
            gameLoop();
        })

    }
    startGame();
});