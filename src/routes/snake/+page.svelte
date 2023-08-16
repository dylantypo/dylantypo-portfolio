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

    // Game State and Controls
    enum GameState {
        INIT,
        THEME_SELECTION,
        DIFFICULTY_SELECTION,
        PLAYING
    }
    let currentState: GameState = GameState.INIT;
    const NUM_CELLS = 32;
    let CELL_SIZE: number;
    let GRID_WIDTH: number;
    let GRID_HEIGHT: number;
    let snakeBody: { x: number, y: number }[] = [];
    let snakeDirection: { x: number, y: number } = { x: 0, y: -1 };
    let score = 0;
    let munch = 0;
    let total_food = 0;
    let difficulty_value = 0;
    let growthQueue = 0;
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

    // Utility functions and core game logic.
    function generateFoodPosition(): { x: number, y: number } {
        let position: { x: any; y: any; };
        do {
            position = {
                x: Math.floor(Math.random() * GRID_WIDTH),
                y: Math.floor(Math.random() * GRID_HEIGHT)
            };
        } while (snakeBody.some(segment => segment.x === position.x && segment.y === position.y));

        return position;
    }

    function handleKeydown(event: KeyboardEvent) {
        // Handle arrow key presses to change snake direction.
        switch (event.key) {
            case 'ArrowUp':
            case 'w':
                if (snakeDirection.y !== 1) snakeDirection = { x: 0, y: -1 };
                break;
            case 'ArrowDown':
            case 's':
                if (snakeDirection.y !== -1) snakeDirection = { x: 0, y: 1 };
                break;
            case 'ArrowLeft':
            case 'a':
                if (snakeDirection.x !== 1) snakeDirection = { x: -1, y: 0 };
                break;
            case 'ArrowRight':
            case 'd':
                if (snakeDirection.x !== -1) snakeDirection = { x: 1, y: 0 };
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
    }


    function handleLeftClick(event: MouseEvent) {
        if (event.button === 0) {  // Left mouse button has a button value of 0
            munchSound.play();
        }
    }

    // Touch Controls
    function handleTouchStart(event: TouchEvent) {
        startTouchX = event.touches[0].clientX;
        startTouchY = event.touches[0].clientY;
    }

    function handleTouchMove(event: TouchEvent) {
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
            if (xDiff > 0 && snakeDirection.x !== 1) { 
                snakeDirection = { x: -1, y: 0 };
            } else if (snakeDirection.x !== -1) {
                snakeDirection = { x: 1, y: 0 };
            }
        } else { // Vertical swipe
            if (yDiff > 0 && snakeDirection.y !== 1) {
                snakeDirection = { x: 0, y: -1 };
            } else if (snakeDirection.y !== -1) {
                snakeDirection = { x: 0, y: 1 };
            }
        }
    }

    function resetGame() {
        const startX = Math.floor(GRID_WIDTH * 0.5);
        const startY = Math.floor(GRID_HEIGHT * 0.5);
        snakeBody = Array.from({ length: INITIAL_SNAKE_LENGTH }).map((_, index) => {
            return { x: startX, y: startY - index };
        });
        snakeDirection = directions[Math.floor(Math.random() * directions.length)];
        score = 0;
        munch = 0;
        total_food = 0;
        isGameOver = false;
        gameInterval && clearInterval(gameInterval);
        foodPosition = generateFoodPosition();
    }

    function startGame(intervalSpeed: number) {
        // Start the game loop.
        gameInterval = setInterval(() => {
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

            snakeBody = [head, ...snakeBody.slice(0, -1)];

            // Grow snake smoothly based on growthQueue
            if (growthQueue > 0) {
                snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
                growthQueue--;
            }

            // Check if snake ate the food
            if (head.x === foodPosition!.x && head.y === foodPosition!.y) {
                munchSound.play();

                // Scoring logic
                if (munch === 9) { // Changed this to 9 since we'll increment munch after this block
                    difficulty_value += 2; // Increase speed every 10 foods
                    score += Math.round((snakeBody.length - INITIAL_SNAKE_LENGTH) * 2.5); // Double score bonus every 10 foods
                    munch = 0; // Reset munch
                } else {
                    score += Math.round((snakeBody.length - INITIAL_SNAKE_LENGTH) * 1.25); // Normal score increase
                }
                total_food += 1;
                munch += 1;

                // Grow snake based on INITIAL_SNAKE_LENGTH
                // Instead of directly growing the snake, we add to the growth queue
                growthQueue += INITIAL_SNAKE_LENGTH + 2;

                // Generate new food position
                foodPosition = generateFoodPosition();
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
        backgroundMusic.play(); // Start music when game starts
        startGame(intervalSpeed);
    }

    // --- Component Lifecycle ---
    onMount(() => {
        if (browser) {
            munchSound = new Audio("/snake-assets/munch.wav");
            backgroundMusic = new Audio("/snake-assets/snake_song.wav");
            backgroundMusic.loop = true;
            highScore = parseInt(localStorage.getItem("snakeHighScore") || "0");

            CELL_SIZE = Math.min(window.innerWidth, window.innerHeight) / NUM_CELLS;
            GRID_WIDTH = Math.floor(window.innerWidth / CELL_SIZE);
            GRID_HEIGHT = Math.floor(window.innerHeight / CELL_SIZE);
            foodPosition = generateFoodPosition();

            resetGame();
            document.addEventListener('click', handleLeftClick);
            document.addEventListener('touchstart', handleTouchStart, false);
            document.addEventListener('touchmove', handleTouchMove, false);
            window.addEventListener('resize', handleResize)
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
        }
    });
</script>

<svelte:head>
    <title>Snake.</title>
    <link rel="icon" href="\snake-assets\snake-logo.ico" />
    <meta name="theme-color" content="#00000">

    <!-- IOS Tags -->
    <link rel="apple-touch-icon" href="\snake-assets\snake-logo.ico">
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<!-- Game Initialization UI -->
{#if isGameOver}
    <div id="game-over">
        <p>Game Over!</p>
        <p>Score: {score}</p>
        <!-- Transition back to INIT state with a button or delay -->
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
            {#each snakeBody as segment}
                <rect x={segment.x * CELL_SIZE} y={segment.y * CELL_SIZE} width={CELL_SIZE} height={CELL_SIZE} fill={currentTheme.snakeColor}/>
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
        background-color: black;
        color: white;
        overflow: hidden;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
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