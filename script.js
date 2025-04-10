const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const resetButton = document.getElementById('resetButton');

canvas.width = 400;
canvas.height = 400;

let snake = [{x: 10, y: 10}];
let snakeLength = 1;
let direction = {x: 0, y: 0};
let food = {};
let score = 0;
let gameInterval;

function initGame() {
    snake = [{x: 10, y: 10}];
    snakeLength = 1;
    direction = {x: 0, y: 0};
    score = 0;
    scoreDisplay.textContent = score;
    placeFood();
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 100);
}

function gameLoop() {
    updateSnake();
    checkCollision();
    drawGame();
}

function placeFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
}

function updateSnake() {
    const head = {x: snake[0].x + direction.x * 10, y: snake[0].y + direction.y * 10};
    snake.unshift(head);
    
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.textContent = score;
        snakeLength++;
        placeFood();
    }
    
    if (snake.length > snakeLength) {
        snake.pop();
    }
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'red'; // color of food
    ctx.fillRect(food.x, food.y, 10, 10);

    ctx.fillStyle = 'lime'; // color of snake
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, 10, 10);
    });
}

function checkCollision() {
    const head = snake[0];

    // Wall collision
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        gameOver();
    }

    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }
}

function gameOver() {
    clearInterval(gameInterval);
    alert("Game Over! Your score: " + score);
    initGame();
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = {x: 0, y: -1};
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = {x: 0, y: 1};
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = {x: -1, y: 0};
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = {x: 1, y: 0};
            break;
    }
});

// Reset button
resetButton.addEventListener('click', initGame);

// Start the game initially
initGame();
