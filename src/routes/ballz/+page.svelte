<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null;
    let animationId: number;

    let balls: any[] = [];

    // User Inputs
    let gravity = $state(0.2);
    let gravityLabel = $derived(`Gravity: ${formatNumber(gravity)}`);

    let bounce = $state(0.5);
    let bounceLabel = $derived(`Bounce: ${formatNumber(bounce)}`);

    let friction = $state(0.1);
    let drag = $state(0.1);
    let frictionLabel = $derived(`Friction: ${formatNumber(friction)}`);

    let radius = $state(35);
    let sizeLabel = $derived(`Radius: ${formatNumber(radius)}`);

    const correctionFactor = 0.45;  // Factor to correct the positions of the balls after collision

    let dragging = false;  // Whether we are currently dragging a ball
    let dragBall: { vx: number; vy: number; dragging: boolean; x: number; y: number; } | null = null;  // The ball that we are dragging
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    // Variables to keep track of the mouse position
    let mouseX = 0;
    let mouseY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;

    let floorY: number;
    let floorDrop = $state(false);

    let isMobileDevice = $state(false);
    let permissionGranted = $state(false); // Whether orientation permissions are granted

    let numBalls = $derived(balls.length);
    let modeBallSize = $derived(calculateModeBallSize(balls));
    let avgBallSize = $derived(calculateAvgBallSize(balls));
    let numBallsLabel = $derived(`Number of Balls: ${numBalls}`);
    let modeBallSizeLabel = $derived(`Mode Ball Radius: ${formatNumber(modeBallSize)}`);
    let avgBallSizeLabel = $derived(`Average Ball Radius: ${formatNumber(avgBallSize)}`);

    // FPS Variables
    let fps = $state(0);
    let framesRendered = 0;
    let lastTime = 0;

    // Device Orientation Variables
    let deviceOrientation = { alpha: 0, beta: 0, gamma: 0 };
    let lastMotion = { x: 0, y: 0, z: 0 };
    let shakeThreshold = 15;

    let gravityX: number = 0;
    let gravityY: number = 0;

    async function requestOrientationPermission() {
        const requestPermission = async (eventType: any, handler: (event: any) => void) => {
            if (typeof eventType.requestPermission === 'function') {
                try {
                    const permissionState = await eventType.requestPermission();
                    if (permissionState === 'granted') {
                        permissionGranted = true;
                        window.addEventListener(eventType.name, handler);
                    } else {
                        permissionGranted = false;
                    }
                } catch (error) {
                    console.error(error);
                    permissionGranted = false;
                }
            } else {
                window.addEventListener(eventType.name, handler);
            }
        };

        await requestPermission(DeviceOrientationEvent as any, handleDeviceOrientation);
        await requestPermission(DeviceMotionEvent as any, handleDeviceMotion);
    }

    function handleDeviceOrientation(event: DeviceOrientationEvent) {
        deviceOrientation = {
            alpha: event.alpha ?? 0,
            beta: event.beta ?? 0,
            gamma: event.gamma ?? 0
        };
        gravityX = deviceOrientation.gamma / 90;
        gravityY = deviceOrientation.beta / 180;
    }

    function isMobileDev() {
        // User Agent detection
        let mobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        // Feature detection
        let touchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        // Screen size detection
        let screenSize = Math.min(screen.width, screen.height) <= 800;  // consider devices with min dimension <= 800px as mobile

        return mobileUserAgent || touchSupport || screenSize;
    }

    function handleDeviceMotion(event: DeviceMotionEvent) {
        const acceleration = event.accelerationIncludingGravity;
        const deltaX = Math.abs(lastMotion.x - (acceleration?.x || 0));
        const deltaY = Math.abs(lastMotion.y - (acceleration?.y || 0));
        const deltaZ = Math.abs(lastMotion.z - (acceleration?.z || 0));

        if (deltaX + deltaY + deltaZ > shakeThreshold) {
            balls.forEach(ball => {
                ball.vx += (Math.random() - 0.5) * 10;
                ball.vy += (Math.random() - 0.5) * 10;
            });
        }

        lastMotion = {
            x: acceleration?.x || 0,
            y: acceleration?.y || 0,
            z: acceleration?.z || 0
        };
    }

    function formatNumber(num: number) {
        return parseFloat(num.toFixed(2)).toString();
    }

    function calculateModeBallSize(balls: any[]) {
        const frequency: { [key: number]: number } = {};

        balls.forEach(ball => {
            frequency[ball.radius] = (frequency[ball.radius] || 0) + 1;
        });

        let modeRadius = 0;
        let maxCount = -1;
        for (const radius in frequency) {
            if (frequency[radius] > maxCount) {
                maxCount = frequency[radius];
                modeRadius = parseFloat(radius);
            }
        }
        return modeRadius;
    }

    function calculateAvgBallSize(balls: any[]) {
        const totalSize = balls.reduce((sum, ball) => sum + ball.radius, 0);
        return totalSize / balls.length;
    }

    function dropFloor() {
        floorDrop = !floorDrop;
    }

    function bounceOnce(position: number, boundary: number, velocity: number, radius: number) {
        if ((radius > 0 && position + radius >= boundary) || (radius < 0 && position + radius <= 0)) {
            velocity *= (1 - friction);
            position = radius > 0 ? boundary - radius : Math.abs(radius);
            velocity *= -bounce;
        }

        return { position, velocity };
    }

    function spawnBall(x: number, y: number) {
        if (balls.length === 500) {
            // Remove a random ball from the array
            let randomIndex = Math.floor(Math.random() * balls.length);
            balls.splice(randomIndex, 1);
        }

        // Calculate the velocity based on the difference between the last and current mouse positions
        let vx = x - lastMouseX;
        let vy = y - lastMouseY;

        // Base color in RGB format
        let baseColor = {r: 61, g: 169, b: 252};

        // Generate a random color based on the base color
        let color = `rgb(
            ${Math.min(255, baseColor.r + Math.floor((Math.random() - 0.5) * 60))}, 
            ${Math.min(255, baseColor.g + Math.floor((Math.random() - 0.5) * 60))}, 
            ${Math.min(255, baseColor.b + Math.floor((Math.random() - 0.5) * 60))}
        )`;

        let ball = {
            x: x,
            y: y,
            vx: vx,
            vy: vy,
            prevX: x,
            prevY: y,
            radius: radius,
            mass: radius * radius, // Mass proportional to the square of the radius
            color: color,
            colliding: false,
            dragging: false,
            draw: function() {
                if (ctx) {
                    let angle;

                    // If the ball is on the ground or colliding with another ball
                    if ((this.y + this.radius >= canvas.height && Math.abs(this.vy) < 1) || this.colliding) {
                        // Determine the direction of rotation
                        angle = this.x >= this.prevX ? 0 : Math.PI;
                    } else {
                        // If the ball is in the air, use the overall velocity to determine the direction of rotation
                        angle = Math.atan2(this.vy, this.vx);
                    }

                    // Calculate the offset for the gradient's center
                    let offset = this.radius / 5;  // Increase this value to make the rotation more obvious
                    let offsetX = offset * Math.cos(angle);
                    let offsetY = offset * Math.sin(angle);

                    let gradient = ctx.createRadialGradient(this.x + offsetX, this.y + offsetY, 0, this.x, this.y, this.radius);
                    gradient.addColorStop(0, '#fffffe');
                    gradient.addColorStop(1, this.color);

                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.fillStyle = gradient;
                    ctx.fill();
                }
            }
        };

        balls.push(ball);
    }

    function touchStartHandler(event: TouchEvent) {
        let touch = event.touches[0];
        let x = touch.clientX;
        let y = touch.clientY;

        for (let i = 0; i < balls.length; i++) {
            let ball = balls[i];
            let dx = x - ball.x;
            let dy = y - ball.y;
            if (Math.sqrt(dx * dx + dy * dy) < ball.radius) {
                dragging = true;
                dragBall = ball;
                ball.dragging = true;

                // Store the drag offset
                dragOffsetX = ball.x - x;
                dragOffsetY = ball.y - y;

                break;
            }
        }
    }

    function touchEndHandler(event: TouchEvent) {
        event.preventDefault();
        let touch = event.changedTouches[0];  // Use changedTouches for the end event
        if (dragging && dragBall) {
            dragBall.vx = touch.clientX - lastMouseX;
            dragBall.vy = touch.clientY - lastMouseY;
            dragBall.dragging = false;
            dragBall = null;
            dragging = false;
            dragOffsetX = 0;
            dragOffsetY = 0;
        } else {
            spawnBall(touch.clientX, touch.clientY);
        }
    }

    function touchMoveHandler(event: TouchEvent) {
        let touch = event.touches[0];
        let x = touch.clientX;
        let y = touch.clientY;

        lastMouseX = mouseX;
        lastMouseY = mouseY;
        mouseX = x;
        mouseY = y;

        if (dragging && dragBall) {
            dragBall.x = x + dragOffsetX;
            dragBall.y = y + dragOffsetY;
        }
    }

    onMount(() => {
        if (!browser || !canvas) return;

        isMobileDevice = isMobileDev();
        
        // Set canvas dimensions
        const setCanvasDimensions = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasDimensions();

        window.addEventListener('resize', setCanvasDimensions);

        if (isMobileDevice) {
            if ('DeviceOrientationEvent' in window) {
                window.addEventListener('deviceorientation', handleDeviceOrientation);
            }
            if ('DeviceMotionEvent' in window) {
                window.addEventListener('devicemotion', handleDeviceMotion);
            }
            
            canvas.addEventListener('touchstart', touchStartHandler, { passive: true });
            canvas.addEventListener('touchend', touchEndHandler);
            canvas.addEventListener('touchmove', touchMoveHandler, { passive: true });
        } else {
            const detectBallUnderCursor = (event: MouseEvent) => {
                for (let ball of balls) {
                    const dx = event.clientX - ball.x;
                    const dy = event.clientY - ball.y;
                    if (Math.sqrt(dx * dx + dy * dy) < ball.radius) {
                        return ball;
                    }
                }
                return null;
            };

            canvas.addEventListener('mousedown', (event) => {
                const ball = detectBallUnderCursor(event);
                if (ball) {
                    dragging = true;
                    dragBall = ball;
                    dragBall!.dragging = true;
                    dragOffsetX = ball.x - event.clientX;
                    dragOffsetY = ball.y - event.clientY;
                }
            });

            canvas.addEventListener('mouseup', (event) => {
                if (dragging && dragBall) {
                    dragBall.vx = event.clientX - lastMouseX;
                    dragBall.vy = event.clientY - lastMouseY;
                    dragBall.dragging = false;
                    dragBall = null;
                    dragOffsetX = 0;
                    dragOffsetY = 0;
                    setTimeout(() => dragging = false, 0);
                }
            });

            canvas.addEventListener('mousemove', (event) => {
                lastMouseX = mouseX;
                lastMouseY = mouseY;
                mouseX = event.clientX;
                mouseY = event.clientY;
                if (dragging && dragBall) {
                    dragBall.x = event.clientX + dragOffsetX;
                    dragBall.y = event.clientY + dragOffsetY;
                }
            });

            canvas.addEventListener('click', (event) => {
                if (!dragging) spawnBall(event.clientX, event.clientY);
            });
        }

        ctx = canvas.getContext('2d');

        function gameLoop(timestamp: number = 0) {
            if (!lastTime) {
                lastTime = timestamp;
            }

            const deltaTime = timestamp - lastTime;
            if (deltaTime >= 1000) { // If 1 second has passed
                fps = framesRendered;
                framesRendered = 0;
                lastTime = timestamp;
            }

            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }

            floorY = floorDrop ? floorY + 10 : canvas.height; // Adjust this value to change the speed of the floor dropping

            if (isMobileDevice) {
                gravityX = deviceOrientation.gamma / 90;  // Normalize between -1 and 1
                gravityY = deviceOrientation.beta / 90;   // Normalize between -1 and 1
            } else {
                gravityX = 0;
                gravityY = gravity;
            }

            for (let i = 0; i < balls.length; i++) {
                let ball = balls[i];

                // If the ball is below the floor, remove it from the array
                if (ball.y - ball.radius > floorY) {
                    balls.splice(i, 1);
                    i--;  // Decrease the index to account for the removed ball
                    continue;  // Skip the rest of the loop for this ball
                }

                // If the ball is being dragged, don't apply gravity or bouncing
                if (!ball.dragging) {
                    ball.vy += gravity;

                    ball.vy += gravity / ball.mass; // Apply ball mass
                    ball.vx += gravityX;  // Apply horizontal gravity
                    ball.vy += gravityY;  // Apply vertical gravity
                    ball.x += ball.vx;  // Apply x velocity
                    ball.y += ball.vy;  // Apply y velocity
                }

                let bounceResult;

                // Bounce off the bottom and top
                bounceResult = bounceOnce(ball.y, floorY, ball.vy, ball.radius);
                ball.y = bounceResult.position;
                ball.vy = bounceResult.velocity;

                bounceResult = bounceOnce(ball.y, 0, ball.vy, -ball.radius);
                ball.y = bounceResult.position;
                ball.vy = bounceResult.velocity;

                // Bounce off the right and left
                bounceResult = bounceOnce(ball.x, canvas.width, ball.vx, ball.radius);
                ball.x = bounceResult.position;
                ball.vx = bounceResult.velocity;

                bounceResult = bounceOnce(ball.x, 0, ball.vx, -ball.radius);
                ball.x = bounceResult.position;
                ball.vx = bounceResult.velocity;

                for (let j = i + 1; j < balls.length; j++) {
                    let otherBall = balls[j];

                    let dx = otherBall.x - ball.x;
                    let dy = otherBall.y - ball.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < ball.radius + otherBall.radius) {
                        // Applying drag every frame
                        ball.vx *= (1 - drag / ball.mass);
                        ball.vy *= (1 - drag / ball.mass);
                        // The balls are colliding
                        ball.colliding = true;
                        otherBall.colliding = true;
                        // Calculate the overlap between the balls
                        let overlap = ball.radius + otherBall.radius - distance;

                        // Correct the positions of the balls to remove the overlap
                        ball.x -= overlap * 0.5 * dx / distance * correctionFactor;
                        ball.y -= overlap * 0.5 * dy / distance * correctionFactor;
                        otherBall.x += overlap * 0.5 * dx / distance * correctionFactor;
                        otherBall.y += overlap * 0.5 * dy / distance * correctionFactor;

                        // Calculate the direction vector between the balls
                        let nx = dx / distance;
                        let ny = dy / distance;

                        // Calculate the relative velocity of the balls
                        let vx = ball.vx - otherBall.vx;
                        let vy = ball.vy - otherBall.vy;

                        // Calculate the collision response velocity along the direction vector
                        let p = 2 * (vx * nx + vy * ny) / (ball.radius + otherBall.radius);

                        // Adjust the velocities of the balls along the direction vector
                        ball.vx -= p * otherBall.radius * nx;
                        ball.vy -= p * otherBall.radius * ny;
                        otherBall.vx += p * ball.radius * nx;
                        otherBall.vy += p * ball.radius * ny;
                    }
                }

                ball.draw();
            }

            framesRendered++;
            animationId = requestAnimationFrame(gameLoop);
            for (let i = 0; i < balls.length; i++) {
                balls[i].colliding = false;  // Reset the colliding property
            }
        }

        gameLoop();
    });

    onDestroy(() => {
        if (browser) {
            window.removeEventListener('resize', () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            });
            window.removeEventListener('deviceorientation', handleDeviceOrientation);
            window.removeEventListener('devicemotion', handleDeviceMotion);
            window.cancelAnimationFrame(animationId);
        }
    });
</script>

<svelte:head>
    <title>Ballz: A Ball Based Physics Simulator</title>
    <link rel="icon" href="\ballz_icon.ico" />
    <meta name="theme-color" content="#90b4ce">

    <!-- IOS Tags -->
    <link rel="apple-touch-icon" href="\ballz_icon.ico">
</svelte:head>

<div id="stats-wrapper">
    <div class="menu">
        <div id="stats-placeholder"> Statistics </div>
        <div id="stats-container">
            <label for="frames-sec" style="display: flex; justify-content: center; color: rgb(61, 169, 252);">{fps} fps</label>

            <label for="num-balls">{numBallsLabel}</label>

            <label for="mode-ball-size">{modeBallSizeLabel}</label>

            <label for="avg-ball-size">{avgBallSizeLabel}</label>
        </div>
    </div>
</div>

<div id="slider-wrapper">
    <div class="menu">
        <div id="slider-placeholder"> Settings </div>
        <div id="slider-container">
            {#if isMobileDevice}
                <button onclick={requestOrientationPermission} style="opacity: {permissionGranted? 1 : 0.5};">Mobile <i class="fa-solid fa-cube"></i> Motion</button>
            {/if}

            <label for="gravity-slider">{gravityLabel}</label>
            <input id="gravity-slider" type="range" min="0" max="2" step="0.05" bind:value={gravity} />

            <label for="friction-slider">{frictionLabel}</label>
            <input id="friction-slider" type="range" min="0" max="1" step="0.1" bind:value={friction} />

            <label for="bounce-slider">{bounceLabel}</label>
            <input id="bounce-slider" type="range" min="0" max="1" step="0.05" bind:value={bounce} />

            <label for="size-slider">{sizeLabel}</label>
            <input id="size-slider" type="range" min="10" max="250" step="0.1" bind:value={radius} />

            <button onclick={dropFloor} style="opacity: {floorDrop? 1 : 0.5};">Floor <i class="fa-solid fa-person-falling"></i> Toggle</button>
        </div>
    </div>
</div>

<canvas bind:this={canvas}></canvas>

<style>
    :root {
        --bg-color-dark-translucent: rgba(0, 0, 0, 0.5);
        --transition-duration: 0.75s;
        --padding-default: 10px;
        --border-radius-default: 5px;
        --menu-transform: translateX(200%);
    }

    .menu {
        position: relative;
        width: fit-content;
    }

    #stats-wrapper, #slider-wrapper {
        position: fixed;
        right: 2%;
    }

    #stats-wrapper {
        top: 2%;
    }

    #slider-wrapper {
        bottom: 2%;
        z-index: 2;
    }

    #stats-container, #slider-container {
        display: flex;
        flex-direction: column;
        background-color: var(--bg-color-dark-translucent);
        padding: var(--padding-default);
        border-radius: var(--border-radius-default);
        transform: var(--menu-transform);
        transition: transform var(--transition-duration);
    }

    #stats-container label, #slider-container label {
        padding: 4px;
    }

    #stats-wrapper .menu:hover #stats-container, 
    #slider-wrapper .menu:hover #slider-container {
        transform: translateX(0);
    }

    #stats-placeholder, #slider-placeholder {
        background-color: var(--bg-color-dark-translucent);
        opacity: 0.5;
        padding: var(--padding-default);
        border-radius: var(--border-radius-default);
        cursor: pointer;
        transform: translateX(0);
        transition: opacity 0.65s, transform var(--transition-duration);
        position: absolute;
        z-index: 3;
    }

    #stats-placeholder {
        top: 50%;
        left: 50%;
    }

    #slider-placeholder {
        top: 50%;
        left: 25%;
    }

    #stats-wrapper .menu:hover #stats-placeholder, 
    #slider-wrapper .menu:hover #slider-placeholder {
        opacity: 0.5;
        transform: var(--menu-transform);
    }

    #slider-container input, #slider-container button {
        margin: 5px;
        cursor: pointer;
        z-index: 1;
    }

    #slider-container button {
        font-family: 'KenneyFuture', 'sans-serif';
        color: white;
        background: rgba(0, 0, 0, 0.144);
        border: none;
        border-radius: var(--border-radius-default);
    }

    canvas, :global(body) {
        background-color: #90b4ce;
    }

    :global(body) {
        font-family: 'KenneyFuture', 'sans-serif';
        overflow: hidden;
        user-select: none;
        color: white;
        margin: 0;
        padding: 0;
    }
</style>