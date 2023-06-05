<script lang="ts">
    import gsap from 'gsap';
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';

    let expandedGame = false;
    let game;
    let gameBoard; // Variable to bind to the board element
    let resizeObserver;

    let isScrollDisabled = false; // New variable to control the scroll behavior

    let gridSize = 42;  // Number of cells in each row/column

    // Snake Game Script
    type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
    type Point = { x: number, y: number };

    class SnakeGame {
        private direction: Direction = 'RIGHT';
        private snake: Point[] = [{ x: 10, y: 10 }];
        private apple: Point = { x: 20, y: 20 };

        public setDirection(newDirection: Direction) {
            this.direction = newDirection;
        }

        public tick() {
            let head = Object.assign({}, this.snake[0]); // copy head
            switch (this.direction) {
                case 'UP':    head.y--; break;
                case 'DOWN':  head.y++; break;
                case 'LEFT':  head.x--; break;
                case 'RIGHT': head.x++; break;
            }
            this.snake.unshift(head); // add new head to snake

            // if head is on the apple
            if (this.snake[0].x === this.apple.x && this.snake[0].y === this.apple.y) {
                this.apple.x = Math.floor(Math.random() * gridSize);
                this.apple.y = Math.floor(Math.random() * gridSize);
            } else {
                this.snake.pop(); // remove tail
            }

            // If the snake hits the border, reset the game
            if (head.x < 0 || head.y < 0 || head.x >= gridSize || head.y >= gridSize) {
                this.resetGame();
                return;
            }

            // Game over if snake hits itself
            if (this.snake.slice(1).some(p => p.x === head.x && p.y === head.y)) {
                this.resetGame();
            }
        }

        private resetGame() {
            this.direction = 'RIGHT';
            this.snake = [{ x: 10, y: 10 }];
            this.apple = this.getRandomPoint();
        }

        private getRandomPoint(): Point {
            return { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
        }

        public getSnake() {
            return this.snake;
        }

        public getApple() {
            return this.apple;
        }
    }

    let snakeGame: SnakeGame;
    let board: string[][] = [];

    const updateBoard = () => {
        if (!snakeGame) return;

        const newBoard = Array.from({ length: gridSize }, () => Array(gridSize).fill('empty'));
        snakeGame.getSnake().forEach(point => {
            if (point.x >= 0 && point.y >= 0 && point.x < gridSize && point.y < gridSize) {
                newBoard[point.y][point.x] = 'snake';
            }
        });
        let apple = snakeGame.getApple();
        if (apple && apple.x >= 0 && apple.y >= 0 && apple.x < gridSize && apple.y < gridSize) {
            newBoard[apple.y][apple.x] = 'apple';
        }
        board = newBoard;
    };

    let gameInterval: number; // Declare a variable to store the reference to the interval

    // Toggle function for snake game
    function toggleGame() {
        expandedGame = !expandedGame;
        if (expandedGame) {
                snakeGame = new SnakeGame();
                gameInterval = setInterval(() => {
                snakeGame.tick();
                updateBoard();
            }, 100);

            // Disable scrolling
            isScrollDisabled = true; // Update the variable when game is toggled on
        } else {
            if (gameInterval) {
                clearInterval(gameInterval); // Clear the interval when the game is toggled off
            }

            // Enable scrolling
            isScrollDisabled = false; // Update the variable when game is toggled off
        }
    }

    // Keypress functions for each bubble
    function handleKeydownGame(event: { key: string; }) {
        if (event.key === 'Enter' || event.key === ' ') {
            toggleGame();
        }
    }
    
    function handleArrowKeys(e) {
        switch(e.key) {
            case 'ArrowUp':    snakeGame.setDirection('UP'); break;
            case 'ArrowDown':  snakeGame.setDirection('DOWN'); break;
            case 'ArrowLeft':  snakeGame.setDirection('LEFT'); break;
            case 'ArrowRight': snakeGame.setDirection('RIGHT'); break;
        }
    }

    $: { // This reactive statement will run whenever isScrollDisabled changes
        if (typeof window !== 'undefined') {
            if (isScrollDisabled) {
                document.body.classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
            }
        }
    }

    onMount(async () => {
        gsap.fromTo(game, { x: '200' }, { delay: 1, duration: 4, x: '0', ease: "back" });

        if (browser) {
            window.addEventListener('keydown', handleArrowKeys);
        }

        resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const style = getComputedStyle(gameBoard);
                const emSize = parseFloat(style.fontSize);
                const gridWidth = Math.floor(entry.contentRect.width / emSize);
                const gridHeight = Math.floor(entry.contentRect.height / emSize);
                gridSize = Math.min(gridWidth, gridHeight);
            }
        });

        // Check if the gameBoard is defined before observing it
        if (gameBoard) {
            resizeObserver.observe(gameBoard);
        }
    });

    // This will make updateBoard run every time snakeGame changes.
    $: {
        if (snakeGame) {
            updateBoard();
        }
    }

    if (browser) {
        onDestroy(() => {
            window.removeEventListener('keydown', handleArrowKeys);

            if (resizeObserver && gameBoard) {
                resizeObserver.unobserve(gameBoard);
            }
        });
    }
</script>

<!-- Snake Game Bubble -->
<div
    bind:this={game}
    class="game"
    class:expandedGame={expandedGame}
    style="--gridSize: {gridSize};"
    on:click={toggleGame}
    on:keydown={handleKeydownGame}
    tabindex="0"
    role="button"
    aria-pressed="{expandedGame}"
>
    <div class="game-content">
        <!-- Snake Game Content -->
        <div id="board" bind:this={gameBoard}>
            {#each board as row, i}
                {#each row as cell, j}
                    <div class={cell === 'snake' ? 'cell snake' : cell === 'apple' ? 'cell apple' : 'cell'}></div>
                {/each}
            {/each}
        </div>
    </div>
    {#if !expandedGame}
        <i class="fa-regular fa-gamepad fa-bounce fa-2xl" style="--fa-animation-delay: 5s; --fa-animation-iteration-count: 1"></i>
    {/if}
</div>

<style>
    :global(body.no-scroll) {
        overflow: hidden;
    }

    #board {
        overflow: hidden;
        display: grid;
        gap: 2px;
        grid-template-columns: repeat(var(--gridSize), 1fr);
        grid-template-rows: repeat(var(--gridSize), 1fr);
        border: 4px solid #004643;
        border-radius: 25px;
    }

    .game {
        position: fixed;
        top: 5em;
        right: 5em;
        background: #f9bc60;
        opacity: 45%;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        transition: border-radius 0.25s, opacity 0.5s;
        color: #004643;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 4;
    }
    .game.expandedGame {
        width: 92vw;
        height: 92vw;   /* Maintain a square ratio */
        max-height: 85vh;
        max-width: 85vh; /* Prevent overflowing the viewport */
        border-radius: 25px;
        opacity: 100%;
    }
    .game-content {
        display: none;
    }
    .game.expandedGame .game-content {
        display: grid;
    }
    .cell {
        width: 1em;  /* Modify as needed */
        height: 1em; /* Modify as needed */
        background: #f9bc60;
    }
    .snake {
        background: #004643;
    }
    .apple {
        background: #e16162;
    }

    @media (max-width: 1030px) {
        .game {
            display: none;
            /* opacity: 35%;
            top: 2em;
            right: 1em; */
        }
    }
</style>