<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null;
    let animationId: number;

    let balls: any[] = [];

    // User Inputs
    let gravity: number = 0.2;
    $: gravityLabel = `Gravity: ${formatNumber(gravity)}`;

    let bounce: number = 0.5;
    $: bounceLabel = `Bounce: ${formatNumber(bounce)}`;

    let friction: number = 0.1; // friction coefficient
    let drag: number = friction; // drag coefficient
    $: frictionLabel = `Friction: ${formatNumber(friction)}`

    let radius: number = 35; // ball size (radius)
    $: sizeLabel = `Radius: ${formatNumber(radius)}`

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
    let floorDrop: boolean = false; // Whether the floor is dropping

    $: numBalls = balls.length;
    $: modeBallSize = calculateModeBallSize(balls);
    $: avgBallSize = calculateAvgBallSize(balls);
    // Reactive statements to update the display labels
    $: numBallsLabel = `Number of Balls: ${numBalls}`;
    $: modeBallSizeLabel = `Mode Ball Radius: ${formatNumber(modeBallSize)}`;
    $: avgBallSizeLabel = `Average Ball Radius: ${formatNumber(avgBallSize)}`;

    // FPS Variables
    let fps = 0;
    let framesRendered = 0;
    let lastTime = 0;

    // Device Orientation Variables
    let deviceOrientation = { alpha: 0, beta: 0, gamma: 0 };
    let lastMotion = { x: 0, y: 0, z: 0 };
    let shakeThreshold = 15;

    let gravityX: number = 0;
    let gravityY: number = 0;

    function handleDeviceMotion(event: DeviceMotionEvent) {
        const deltaX = Math.abs(lastMotion.x - (event.accelerationIncludingGravity?.x || 0));
        const deltaY = Math.abs(lastMotion.y - (event.accelerationIncludingGravity?.y || 0));
        const deltaZ = Math.abs(lastMotion.z - (event.accelerationIncludingGravity?.z || 0));

        if (deltaX + deltaY + deltaZ > shakeThreshold) {
            // Shake detected
            for (let ball of balls) {
                ball.vx += (Math.random() - 0.5) * 10;  // Adjust values based on desired shake intensity
                ball.vy += (Math.random() - 0.5) * 10;
            }
        }

        lastMotion = {
            x: event.accelerationIncludingGravity?.x || 0,
            y: event.accelerationIncludingGravity?.y || 0,
            z: event.accelerationIncludingGravity?.z || 0
        };
    }


    function handleDeviceOrientation(event: DeviceOrientationEvent) {
        deviceOrientation = {
            alpha: event.alpha ?? 0,
            beta: event.beta ?? 0,
            gamma: event.gamma ?? 0
        };
    }

    function isMobileDevice() {
        return window.innerWidth <= 800;  // This threshold can be adjusted based on your requirements.
    };

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
        event.preventDefault();  // Prevents default behavior like scrolling
        
        let touch = event.touches[0];
        let x = touch.clientX;
        let y = touch.clientY;

        // Similar logic as in the mousedown event listener
        // For instance:
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
        if (!dragging) {
            spawnBall(touch.clientX, touch.clientY);
        }
        if (dragging && dragBall) {
            dragBall.vx = touch.clientX - lastMouseX;
            dragBall.vy = touch.clientY - lastMouseY;
            dragBall.dragging = false;
            dragBall = null;
            dragging = false;
            dragOffsetX = 0;
            dragOffsetY = 0;
        }
    }

    function touchMoveHandler(event: TouchEvent) {
        event.preventDefault();

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

    function requestOrientationPermission() {
        if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
            (DeviceOrientationEvent as any).requestPermission().then((permissionState: string) => {
                if (permissionState === 'granted') {
                    window.addEventListener('deviceorientation', handleDeviceOrientation);
                }
            })
            .catch(console.error);
        } else if (typeof (window.DeviceMotionEvent as any).requestPermission === 'function') { // Check for DeviceMotionEvent
            (window.DeviceMotionEvent as any).requestPermission().then((permissionState: string) => {
                if (permissionState === 'granted') {
                    window.addEventListener('deviceorientation', handleDeviceOrientation);
                }
            })
            .catch(console.error);
        } else {
            window.addEventListener('deviceorientation', handleDeviceOrientation);
        }
    }

    onMount(() => {
        if (browser && canvas) {
            requestOrientationPermission();

            // Set the initial size of the canvas to match the window size
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Update the canvas size when the window is resized
            window.addEventListener('resize', () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            });

            if (isMobileDevice()) {
                if (window.DeviceOrientationEvent) {
                    window.addEventListener('deviceorientation', handleDeviceOrientation);
                }
                if (window.DeviceMotionEvent) {
                    window.addEventListener('devicemotion', handleDeviceMotion);
                }
                // Add touch event listeners
                canvas.addEventListener('touchstart', touchStartHandler);
                canvas.addEventListener('touchend', touchEndHandler);
                canvas.addEventListener('touchmove', touchMoveHandler);
            } else {
                canvas.addEventListener('mousedown', (event) => {
                    // The mouse button has been pressed
                    // Check if the mouse is over a ball
                    for (let i = 0; i < balls.length; i++) {
                        let ball = balls[i];
                        let dx = event.clientX - ball.x;
                        let dy = event.clientY - ball.y;
                        if (Math.sqrt(dx * dx + dy * dy) < ball.radius) {
                            // The mouse is over this ball
                            // Start dragging it
                            dragging = true;
                            dragBall = ball;
                            ball.dragging = true;

                            // Store the drag offset
                            dragOffsetX = ball.x - event.clientX;
                            dragOffsetY = ball.y - event.clientY;

                            break;
                        }
                    }
                });

                canvas.addEventListener('mouseup', (event) => {
                    // The mouse button has been released
                    // If a ball was being dragged, throw it
                    if (dragging && dragBall) {
                        dragBall.vx = event.clientX - lastMouseX;
                        dragBall.vy = event.clientY - lastMouseY;
                        dragBall.dragging = false;
                        dragBall = null;
                        dragOffsetX = 0;
                        dragOffsetY = 0;

                        // Add a small delay before resetting the dragging state
                        setTimeout(() => {
                            dragging = false;
                        }, 0);
                    }
                });

                canvas.addEventListener('mousemove', (event) => {
                    // Store the last mouse position
                    lastMouseX = mouseX;
                    lastMouseY = mouseY;

                    // Update the current mouse position
                    mouseX = event.clientX;
                    mouseY = event.clientY;

                    // If a ball is being dragged, move it to the current mouse position
                    if (dragging && dragBall) {
                        dragBall.x = event.clientX + dragOffsetX;
                        dragBall.y = event.clientY + dragOffsetY;
                    }
                });

                canvas.addEventListener('click', (event) => {
                    if(dragging) return;
                    spawnBall(event.clientX, event.clientY);
                });
            }

            ctx = canvas.getContext('2d');
        }

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

            if (isMobileDevice()) {
                gravityX = deviceOrientation.gamma / 90;  // Normalize between -1 and 1
                gravityY = deviceOrientation.beta / 90;   // Normalize between -1 and 1
            } else {
                gravityX = 0;
                gravityY = gravity;
            }

            for (let i = 0; i < balls.length; i++) {
                let ball = balls[i];

                ball.vx += gravityX;  // Apply horizontal gravity
                ball.vy += gravityY;  // Apply vertical gravity
                ball.vy += gravity;
                ball.x += ball.vx;
                ball.y += ball.vy;

                // If the ball is below the floor, remove it from the array
                if (ball.y - ball.radius > floorY) {
                    balls.splice(i, 1);
                    i--;  // Decrease the index to account for the removed ball
                    continue;  // Skip the rest of the loop for this ball
                }

                // If the ball is being dragged, don't apply gravity or bouncing
                if (!ball.dragging) {
                    ball.vy += gravity / ball.mass;
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
                        ball.colliding = true;  // Add this line
                        otherBall.colliding = true;  // And this line
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
            // Clean up the resize event listener when the component is destroyed
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

    <!-- IOS Icon Tag -->
    <link rel="apple-touch-icon" href="\ballz_icon.ico">
</svelte:head>

<div id="stats-wrapper">
    <div id="stats-container">
        <label for="frames-sec" style="display: flex; justify-content: center; color: rgb(61, 169, 252);">{fps} fps</label>

        <label for="num-balls">{numBallsLabel}</label>

        <label for="mode-ball-size">{modeBallSizeLabel}</label>

        <label for="avg-ball-size">{avgBallSizeLabel}</label>
    </div>
    <div id="stats-placeholder"> Statistics </div>
</div>

<div id="slider-wrapper">
    <div id="slider-container">
        <label for="gravity-slider">{gravityLabel}</label>
        <input id="gravity-slider" type="range" min="0" max="2" step="0.05" bind:value={gravity} />

        <label for="friction-slider">{frictionLabel}</label>
        <input id="friction-slider" type="range" min="0" max="1" step="0.1" bind:value={friction} />

        <label for="bounce-slider">{bounceLabel}</label>
        <input id="bounce-slider" type="range" min="0" max="1" step="0.05" bind:value={bounce} />

        <label for="size-slider">{sizeLabel}</label>
        <input id="size-slider" type="range" min="10" max="250" step="0.1" bind:value={radius} />

        <button on:click={dropFloor} style="opacity: {floorDrop? 1 : 0.5};">Floor <i class="fa-solid fa-person-falling"></i> Toggle</button>
    </div>
    <div id="slider-placeholder"> Settings </div>
</div>

<canvas bind:this={canvas}></canvas>

<style>

    #stats-wrapper {
        position: fixed;
        top: 2%;
        right: 2%;
    }

    #stats-container {
        display: flex;
        flex-direction: column;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 10px;
        border-radius: 5px;
        transform: translateX(200%);
        transition: transform 0.75s;
    }

    #stats-container label {
        padding: 4px;
    }

    #stats-wrapper:hover #stats-container {
        transform: translateX(0);
    }

    #stats-placeholder {
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0.5;
        padding: 10px;
        border-radius: 5px;
        transform: translateX(0);
        transition: opacity 0.65s, transform 0.75s;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 0;
    }

    #stats-wrapper:hover #stats-placeholder {
        opacity: 0;
        transform: translateX(200%);
    }

    #slider-wrapper {
        position: fixed;
        bottom: 2%;
        right: 2%;
        z-index: 2;
    }

    #slider-container {
        display: flex;
        flex-direction: column;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 10px;
        border-radius: 5px;
        transform: translateX(200%);
        transition: transform 0.65s;
    }

    #slider-wrapper:hover #slider-container {
        transform: translateX(0);
    }

    #slider-placeholder {
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0.5;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        transform: translateX(0);
        transition: opacity 0.55s, transform 0.65s;
        position: absolute;
        top: 50%;
        left: 25%;
        z-index: 0;
    }

    #slider-wrapper:hover #slider-placeholder {
        opacity: 0;
        transform: translateX(200%);
    }

    #slider-container input, button {
        margin: 5px;
        cursor: pointer;
        z-index: 1;
    }

    #slider-container button {
        font-family: 'KenneyFuture', sans-serif;
        color: white;
        background: rgba(0, 0, 0, 0.144);
        border: none;
        border-radius: 5px;
    }

    canvas {
        background-color: #90b4ce;
    }

    /* Body color and other properties */
    :global(body) {
        overflow: hidden;
        user-select: none;
        color: white;
        background-color: #90b4ce;
        margin: 0;
        padding: 0;
    }
</style>