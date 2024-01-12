const app = Vue.createApp({
    data() {
        return {
            board: Array.from({ length: 20 }, () => Array(20).fill('')),
            snake: [{ x: 10, y: 10 }, { x: 9, y: 10 }],
            direction: 'right',
            food: null,
            score: 0,
            record: 0,
            gameOver: false,
            gameInterval: null,
            defaultSpeed: 300,
            speed: 0,
        };
    },
    methods: {
        startGame() {
            this.resetGame();
            this.gameInterval = setInterval(this.gameLoop, this.speed);
        },
        pauseGame() {
            clearInterval(this.gameInterval);
        },
        continueGame() {
            if (!this.gameOver) {
                this.gameInterval = setInterval(this.gameLoop, this.speed);
            }
        },
        resetGame() {
            this.board = Array.from({ length: 20 }, () => Array(20).fill(''));
            this.snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }];
            this.direction = 'right';
            this.generateFood();
            this.score = 0;
            this.gameOver = false;
            clearInterval(this.gameInterval);
            this.speed = this.defaultSpeed;
        },
        gameLoop() {
            this.moveSnake();
            this.checkCollision();
            this.checkFood();
            this.updateBoard();
        },
        moveSnake() {
            const newHead = { ...this.snake[0] };
            if (this.direction === 'right') newHead.x += 1;
            if (this.direction === 'left') newHead.x -= 1;
            if (this.direction === 'up') newHead.y -= 1;
            if (this.direction === 'down') newHead.y += 1;

            this.snake.unshift(newHead);
            if (this.snake[0].x !== this.food.x || this.snake[0].y !== this.food.y) {
                this.snake.pop();
            }
        },
        checkCollision() {
            const head = this.snake[0];
            const hitLeftWall = head.x < 0;
            const hitRightWall = head.x >= 20;
            const hitTopWall = head.y < 0;
            const hitBottomWall = head.y >= 20;
            const hitSelf = this.snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);

            if (hitLeftWall || hitRightWall || hitTopWall || hitBottomWall || hitSelf) {
                this.gameOver = true;
                if(this.record<this.score) {
                    this.record=this.score;
                }
                clearInterval(this.gameInterval);
            }
        },
        checkFood() {
            if (this.snake[0].x === this.food.x && this.snake[0].y === this.food.y) {
                this.score += 1;
                this.generateFood();

                if (this.score % 2 === 0) {
                    this.increaseSpeed();
                }
            }
        },
        increaseSpeed() {
            clearInterval(this.gameInterval);
            this.speed = Math.max(this.speed - 20, 100);
            this.gameInterval = setInterval(this.gameLoop, this.speed);
        },
        updateBoard() {
            this.board = this.board.map(row => row.fill(''));
            this.snake.forEach(segment => this.board[segment.y][segment.x] = 'snake');
            this.board[this.food.y][this.food.x] = 'food';
        },
        generateFood() {
            let foodPosition;
            do {
                foodPosition = {
                    x: Math.floor(Math.random() * 20),
                    y: Math.floor(Math.random() * 20)
                };
            } while (this.snake.some(segment => segment.x === foodPosition.x && segment.y === foodPosition.y));
            this.food = foodPosition;
        },
        getCellClass(cell) {
            return cell === 'snake' ? 'snake-cell' : cell === 'food' ? 'food-cell' : '';
        },
        handleKeydown(e) {
            const key = e.key;
            if (key === 'ArrowUp' && this.direction !== 'down') this.direction = 'up';
            if (key === 'ArrowDown' && this.direction !== 'up') this.direction = 'down';
            if (key === 'ArrowLeft' && this.direction !== 'right') this.direction = 'left';
            if (key === 'ArrowRight' && this.direction !== 'left') this.direction = 'right';
        }
    },
    mounted() {
        window.addEventListener('keydown', this.handleKeydown);
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.handleKeydown);
    }
});

app.mount('#app');
