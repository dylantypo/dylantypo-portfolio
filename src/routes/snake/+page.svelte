<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import { browser } from '$app/environment';

    // Constants
    const INITIAL_SNAKE_LENGTH = 3;
    const directions = [
        { x: 0, y: -1 },  // up
        { x: 0, y: 1 },   // down
        { x: -1, y: 0 },  // left
        { x: 1, y: 0 }    // right
    ];

    type Segment = {
        x: number,
        y: number,
        age: number,
        id: number
    };


    // Game State and Controls
    enum GameState {
        INIT,
        THEME_SELECTION,
        DIFFICULTY_SELECTION,
        PLAYING
    }
    let currentState: GameState = GameState.INIT;
    const NUM_CELLS = 28;
    let CELL_SIZE: number;
    let GRID_WIDTH: number;
    let GRID_HEIGHT: number;
    let snakeBody: Segment[] = [];
    // let snakeBody: { x: number, y: number }[] = [];
    let snakeDirection: { x: number, y: number };
    const MIN_TAIL_SIZE = 0.25; // This means the tail will be half the size of a regular cell. Adjust as needed.
    let score = 0;
    let munch = 0;
    let total_food = 0;
    let difficulty_value = 0;
    let growthQueue = 0;
    let movementQueue: { x: number, y: number }[] = [];
    let isGameOver = false;
    let gameInterval: string | number | NodeJS.Timer | undefined;
    let foodPosition: { x: number, y: number } | undefined;
    let startTouchX: number;
    let startTouchY: number;

    // Themes and Difficulties
    type ThemeKey = 'classic' | 'retro' | 'aquatic' | 'desert' | 'night';
    let themes = {
            classic: {
                snakeColor: "#E4B363",
                foodColor: "#EF6461",
                backgroundColor: "#E8E9EB",
            },
            retro: {
                snakeColor: "#00FF00",
                foodColor: "#FF0000",
                backgroundColor: "#1E1E1E",
            },
            aquatic: {
                snakeColor: "#285238",
                foodColor: "#FAD848",
                backgroundColor: "#4A90D9",
            },
            desert: {
                snakeColor: "#264653",
                foodColor: "#F4A261",
                backgroundColor: "#E9C46A",
            },
            night: {
                snakeColor: "#E63946",
                foodColor: "#F1FAEE",
                backgroundColor: "#1F1F3D",
            }
        };
    let currentTheme = themes.classic;
    let themeKeys: ThemeKey[] = Object.keys(themes) as ThemeKey[];
    const difficulties = ["Easy", "Medium", "Hard"];
    let selectedDifficulty: string = "";

    // Audio and Other
    let munchSound: HTMLAudioElement;
    let backgroundMusic: HTMLAudioElement;
    let highScore: number;

    // the linear interpolation (often abbreviated as lerp)
    function lerp(a: number, b: number, t: number): number {
        return a + t * (b - a);
    }

    // The function to calculate the scale factor for a given segment index
    function getScaleFactor(age: number): number {
        const t = age / (snakeBody[snakeBody.length - 1].age);
        return lerp(1, MIN_TAIL_SIZE, t);
    }

    // Function to compute adjusted size and offsets
    function getAdjustedSizeAndOffsets(index: number): { adjustedSize: number; offsetX: number; offsetY: number } {
        const scaleFactor = getScaleFactor(index);
        const adjustedSize = CELL_SIZE * scaleFactor;
        const offsetX = (CELL_SIZE - adjustedSize) / 2;
        const offsetY = (CELL_SIZE - adjustedSize) / 2;
        return { adjustedSize, offsetX, offsetY };
    }

    function manhattanDistance(p1: {x: number, y: number}, p2: {x: number, y: number}): number {
        return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
    }

    // Utility functions and core game logic.
    function generateFoodPosition(): { x: number, y: number } {
        let position: { x: any; y: any; };
        const MIN_DISTANCE_FROM_SNAKE = 5;

        do {
            position = {
                x: Math.floor(Math.random() * GRID_WIDTH),
                y: Math.floor(Math.random() * GRID_HEIGHT)
            };
        } while (
            snakeBody.some(segment => segment.x === position.x && segment.y === position.y) ||
            (manhattanDistance(position, snakeBody[0]) < MIN_DISTANCE_FROM_SNAKE)
        );

        return position;
    }

    function isEqualDirection(dir1: { x: number, y: number }, dir2: { x: number, y: number }): boolean {
        return dir1.x === dir2.x && dir1.y === dir2.y;
    }

    function invertDirection(dir: { x: number, y: number }): { x: number, y: number } {
        return { x: -dir.x, y: -dir.y };
    }

    function handleKeydown(event: KeyboardEvent) {
        let newDirection;
        switch (event.key) {
            case 'ArrowUp':
            case 'w':
                newDirection = { x: 0, y: -1 };
                break;
            case 'ArrowDown':
            case 's':
                newDirection = { x: 0, y: 1 };
                break;
            case 'ArrowLeft':
            case 'a':
                newDirection = { x: -1, y: 0 };
                break;
            case 'ArrowRight':
            case 'd':
                newDirection = { x: 1, y: 0 };
                break;
            case 'q':
            case 'Escape':
                resetGame();
                currentState = GameState.INIT;
                if (backgroundMusic) {
                    backgroundMusic.pause();
                }
                break;
        }
        if (newDirection && (movementQueue.length === 0 || !isEqualDirection(movementQueue[movementQueue.length - 1], newDirection))) {
            movementQueue.push(newDirection);
        }
    }

    function handleLeftClick(event: MouseEvent) {
        if (event.button === 0) {  // Left mouse button has a button value of 0
            munchSound.play().catch(error => console.error("Munch sound play error:", error));
        }
    }

    // Touch Controls
    function handleTouchStart(event: TouchEvent) {
        startTouchX = event.touches[0].clientX;
        startTouchY = event.touches[0].clientY;
    }

    function handleTouchMove(event: TouchEvent) {
        let newDirection;
        if (!startTouchX || !startTouchY) {
            return;
        }

        const xDiff = startTouchX - event.touches[0].clientX;
        const yDiff = startTouchY - event.touches[0].clientY;

        // Reset start touch coordinates for the next move
        startTouchX = 0;
        startTouchY = 0;

        // Determine swipe direction
        if (Math.abs(xDiff) > Math.abs(yDiff)) { // Horizontal swipe
            if (xDiff > 0) newDirection = { x: -1, y: 0 };
            else newDirection = { x: 1, y: 0 };
        } else { // Vertical swipe
            if (yDiff > 0) newDirection = { x: 0, y: -1 };
            else newDirection = { x: 0, y: 1 };
        }

        if (newDirection && (movementQueue.length === 0 || !isEqualDirection(movementQueue[movementQueue.length - 1], newDirection))) {
            movementQueue.push(newDirection);
        }
    }

    function resetGame() {
        const startX = Math.floor(GRID_WIDTH * 0.5);
        const startY = Math.floor(GRID_HEIGHT * 0.5);
        const timestamp = Date.now();
        snakeBody = Array.from({ length: INITIAL_SNAKE_LENGTH }).map((_, index) => {
            return { x: startX, y: startY - index, age: index, id: timestamp + index };
        });
        snakeDirection = directions[Math.floor(Math.random() * directions.length)];
        score = 0;
        munch = 0;
        total_food = 0;
        isGameOver = false;
        gameInterval && clearInterval(gameInterval);
        foodPosition = generateFoodPosition();
        backgroundMusic.playbackRate = 1;
    }

    function startGame(intervalSpeed: number) {
        // Start the game loop.
        gameInterval = setInterval(() => {
            if (movementQueue.length > 0) {
                const nextDirection = movementQueue.shift();
                if (!isEqualDirection(invertDirection(snakeDirection), nextDirection!)) {
                    snakeDirection = nextDirection!;
                }
            }

            // Update snake's position
            const head = Object.assign({}, snakeBody[0]);
            head.x += snakeDirection.x;
            head.y += snakeDirection.y;

            // Check for collision with walls or itself
            if (
                head.x < 0 || head.x > GRID_WIDTH - 1 ||
                head.y < 0 || head.y > GRID_HEIGHT - 1 ||
                snakeBody.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
            ) {
                isGameOver = true;
                clearInterval(gameInterval);  // Clear the game loop
                return;
            }

            snakeBody = [
                { x: head.x, y: head.y, age: 0, id: Date.now() },
                ...snakeBody.slice(0, -1).map((segment, index) => {
                    return { ...segment, age: segment.age + 1 };
                })
            ];

            // Check if snake ate the food
            if (head.x === foodPosition!.x && head.y === foodPosition!.y) {
                console.log("Snake ate the food");
                munchSound.play().catch(error => console.error("Munch sound play error:", error));

                // Scoring logic
                if (munch === 9) { // Changed this to 9 since we'll increment munch after this block
                    difficulty_value += 2;
                    score += Math.round((snakeBody.length - INITIAL_SNAKE_LENGTH) * 2.5); // Double score bonus every 10 foods
                    munch = 0; // Reset munch

                    backgroundMusic.playbackRate += 0.01;
                } else {
                    difficulty_value += 0.5;
                    score += Math.round((snakeBody.length - INITIAL_SNAKE_LENGTH) * 1.25); // Normal score increase

                    backgroundMusic.playbackRate += 0.005;
                }
                total_food += 1;
                munch += 1;

                // Grow snake based on INITIAL_SNAKE_LENGTH
                // Instead of directly growing the snake, we add to the growth queue
                growthQueue += INITIAL_SNAKE_LENGTH + 2;

                // Grow snake smoothly based on growthQueue
                if (growthQueue > 0) {
                    snakeBody.push({ ...snakeBody[snakeBody.length - 1], age: snakeBody[snakeBody.length - 1].age + 1, id: Date.now() + Math.random() });
                    growthQueue--;
                }

                // Generate new food position
                foodPosition = generateFoodPosition();
                console.log("New food position generated:", foodPosition);
            }
        }, intervalSpeed - difficulty_value);

        if (browser && score > highScore) {
            highScore = score;
            localStorage.setItem("snakeHighScore", highScore.toString());
        }
    }

    function stopGame() {
        // Stop the game loop.
        clearInterval(gameInterval);
    }

    function handleResize() {
        CELL_SIZE = Math.min(window.innerWidth, window.innerHeight) / NUM_CELLS;
        GRID_WIDTH = Math.floor(window.innerWidth / CELL_SIZE);
        GRID_HEIGHT = Math.floor(window.innerHeight / CELL_SIZE);
    }
    
    function handleRestart() {
        resetGame();
        currentState = GameState.DIFFICULTY_SELECTION;
    }

    function selectTheme(theme: ThemeKey) {
        currentTheme = themes[theme];
        currentState = GameState.DIFFICULTY_SELECTION;
    }

    function selectDifficulty(difficulty: string) {
        selectedDifficulty = difficulty;
        // Adjust game speed based on difficulty. This is just a basic example.
        let intervalSpeed: number = 10;
        switch (difficulty) {
            case "Easy": intervalSpeed = 135; break;
            case "Medium": intervalSpeed = 100; break;
            case "Hard": intervalSpeed = 65; break;
        }
        
        // Trying to adjust the difficulty based on screen size
        const speedModifier = CELL_SIZE / NUM_CELLS
        intervalSpeed += speedModifier;

        // Set your game interval speed here, then start the game.
        currentState = GameState.PLAYING;
        backgroundMusic.play().catch(error => console.error("Background music play error:", error));
        startGame(intervalSpeed);
    }

    // --- Component Lifecycle ---
    onMount(() => {
        if (browser) {
            munchSound = new Audio("/snake-assets/munch.wav");
            munchSound.volume = 0.15;
            backgroundMusic = new Audio("/snake-assets/snake_song.wav");
            backgroundMusic.volume = 0.35;
            backgroundMusic.loop = true;
            
            highScore = parseInt(localStorage.getItem("snakeHighScore") || "0");

            CELL_SIZE = Math.min(window.innerWidth, window.innerHeight) / NUM_CELLS;
            GRID_WIDTH = Math.floor(window.innerWidth / CELL_SIZE);
            GRID_HEIGHT = Math.floor(window.innerHeight / CELL_SIZE);

            document.addEventListener('click', handleLeftClick);
            document.addEventListener('touchstart', handleTouchStart, false);
            document.addEventListener('touchmove', handleTouchMove, false);
            window.addEventListener('resize', handleResize);

            resetGame();
            handleResize();
        }
    });

    // Cleanup on component destroy
    onDestroy(() => {
        stopGame();
        if (backgroundMusic) {
            backgroundMusic.pause();
        }
        if (browser) {
            document.removeEventListener('click', handleLeftClick); 
            document.removeEventListener('touchstart', handleTouchStart, false);
            document.removeEventListener('touchmove', handleTouchMove, false);
            window.removeEventListener('resize', handleResize);
        }
    });
</script>

<svelte:head>
    <title>Snake.</title>
    <link rel="icon" href="\snake-assets\snake-logo.ico" />

    <!-- IOS Tags -->
    <link rel="apple-touch-icon" href="\snake-assets\snake-logo.ico">
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<!-- Game Initialization UI -->
{#if isGameOver}
    <div id="game-over">
        <p>Game Over!</p>
        <p>Score: {score}</p>
        <button on:click={handleRestart}>Try Again</button>
    </div>
{:else if currentState === GameState.INIT}
    <!-- Display logo with previous score (if any) -->
    <div id="logo" on:click={() => currentState = GameState.THEME_SELECTION} on:keypress={() => currentState = GameState.THEME_SELECTION}>
        <img src="/snake-assets/snake-logo-upscaled-5x.png" alt="Snake Game"/>
        <p>Snake.</p>
        {#if score > 0}<p id="previous-score">Previous Score: {score}</p>{/if}
    </div>
{:else if currentState === GameState.THEME_SELECTION}
    <!-- Display theme options -->
    <div class="menu">
        <p>Select a theme.</p>
        <div id="themes">
            {#each themeKeys as theme}
                <button on:click={() => selectTheme(theme)}>{theme}</button>
            {/each}
        </div>
    </div>
{:else if currentState === GameState.DIFFICULTY_SELECTION}
    <!-- Display difficulty options -->
    <div class="menu">
        <p>Select a difficulty.</p>
        <div id="difficulties">
            {#each difficulties as difficulty}
                <button on:click={() => selectDifficulty(difficulty)}>{difficulty}</button>
            {/each}
        </div>
    </div>
{:else}
    <!-- Snake Game -->
    <main style="background-color: {currentTheme.backgroundColor}">
        <svg width={CELL_SIZE * GRID_WIDTH} height={CELL_SIZE * GRID_HEIGHT}>
            <!-- Render the snake -->
            {#each snakeBody as segment (segment.id)}
                <rect 
                    x={segment.x * CELL_SIZE + getAdjustedSizeAndOffsets(segment.age).offsetX} 
                    y={segment.y * CELL_SIZE + getAdjustedSizeAndOffsets(segment.age).offsetY} 
                    width={getAdjustedSizeAndOffsets(segment.age).adjustedSize} 
                    height={getAdjustedSizeAndOffsets(segment.age).adjustedSize} 
                    fill={currentTheme.snakeColor}
                />
            {/each}

            <!-- Render the food -->
            {#if foodPosition}
                <rect x={foodPosition.x * CELL_SIZE} y={foodPosition.y * CELL_SIZE} width={CELL_SIZE} height={CELL_SIZE} fill={currentTheme.foodColor} />
            {/if}
        </svg>
    </main>
{/if}

<style>
    /* Variables */
    :root {
        --button-color: white;
        --button-highlighted-color: #ffffff7e;  /* This is a slightly darker shade of white. Adjust as needed. */
    }

    @font-face {
        font-family: "PressStart2P";
        src: url("/snake-assets/PressStart2P-Regular.ttf");
    }

    /* Hide scrollbar for all elements */
    :global(::-webkit-scrollbar) {
        display: none;
    }

    /* Hide scrollbar for non-webkit browsers */
    :global(html) {
        scrollbar-width: none;
        background-color: black;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }

    :global(body) {
        user-select: none;
        touch-action: none;
        background-color: black;
        color: white;
        overflow: hidden;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        padding-top: env(safe-area-inset-top);
        padding-right: env(safe-area-inset-right);
        padding-bottom: env(safe-area-inset-bottom);
        padding-left: env(safe-area-inset-left);
    }

    /* Apply theme background to the game area */
    p {
        font-family: "PressStart2P";
    }

    .menu p {
        z-index: 3;
    }

    main {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #game-over {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: "PressStart2P";
    }

    #previous-score {
        font-size: 1em;
        color: white;
    }

    #logo {
        width: 100vw;
        height: 100vh;
        font-size: 3em;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 50%; /* These four lines are used to */
        left: 50%; /* position the container in the */
        transform: translate(-50%, -50%); /* exact center of the parent. */
    }

    .menu {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center; /* Centers items vertically */
        position: absolute;
        top: 50%; /* These four lines are used to */
        left: 50%; /* position the container in the */
        transform: translate(-50%, -50%); /* exact center of the parent. */
        background-color: black;
    }

    .menu p:first-child {
        margin-bottom: 22rem; /* Adjust this value to your liking. */;
    }

    /* Button Container Styles */
    #themes, #difficulties {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center; /* Centers items vertically */
        position: absolute;
        top: 50%; /* These four lines are used to */
        left: 50%; /* position the container in the */
        transform: translate(-50%, -50%); /* exact center of the parent. */
    }

    /* Button Base Styles */
    button {
        font-family: "PressStart2P";
        font-size: 2em;
        width: 10em;
        background-color: var(--button-color);
        color: black;
        border: none;
        padding: 8px 12px;
        margin: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    /* First Button Style */
    #themes button:first-child, #difficulties button:first-child, #game-over button:first-child {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    /* Last Button Style */
    #themes button:last-child, #difficulties button:last-child, #game-over button:last-child {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }


    @media (min-width: 800px) {
        /* Button Hover Styles only on larger screens*/
        button:hover {
            background-color: var(--button-highlighted-color);
        }
    }
</style>