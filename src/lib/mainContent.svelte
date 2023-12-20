<script lang="ts">
    import { onMount } from 'svelte';
    import gsap from 'gsap';

    let ScrollTrigger;
    let elements: HTMLElement[] | undefined;

    onMount(async () => {
        const module = await import('gsap/ScrollTrigger');
        ScrollTrigger = module.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        elements = gsap.utils.toArray(".fade-in") as HTMLElement[];

        if (elements) {
            elements.forEach(el => {
                let nodes = Array.from(el.childNodes);

                // clear the element's content
                el.innerHTML = '';

                nodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE) {
                        // for normal text, split into words without adding the class
                        let words = node.textContent ? node.textContent.split(" ") : [];
                        words.forEach(word => {
                            let span = document.createElement('span');
                            span.textContent = word + " ";
                            el.appendChild(span);
                        });
                    } else if (node.nodeType === Node.ELEMENT_NODE && (node as Element).classList.contains('highlighted-text')) {
                        // for each highlighted text, keep the highlighted-text class intact
                        let words = node.textContent ? node.textContent.split(" ") : [];
                        words.forEach(word => {
                            let span = document.createElement('span');
                            span.style.color = "#f9bc60";
                            span.textContent = word + " ";
                            el.appendChild(span);
                        });
                    }
                });
            });
        }

        let spans = gsap.utils.toArray(".fade-in span") as HTMLElement[];

        spans.forEach(span => {
            gsap.from(span, {
                scrollTrigger: {
                    trigger: span,
                    start: "top 75%",
                    end: "bottom 25%",
                    scrub: true
                },
                autoAlpha: 0.025, // start at 5% opacity
                duration: 1, // animate over 1 second
            });
        });
    });
</script>

<div id="content">
    <div class="section">
        <p class="header">About Me</p>
        <h1 class="long-text fade-in">I'm a versatile data scientist, expertly crafting <span class="highlighted-text">cutting-edge</span> analytics that illuminate data from fresh and inventive perspectives.</h1>
    </div>
    
    <div class="section">
        <p class="header">Experience</p>
        <h1 class="long-text fade-in">Nearly <span class="highlighted-text">half a decade</span> of diverse experience, enhancing data-driven decisions with a unique blend of creativity and innovation.</h1>
    </div>
    
    <div class="section">
        <p class="header">History</p>
        <div class="job">
            <h1 class="year">Now</h1>
            <div class="position">
                <h1 class="company">Booz Allen Hamilton</h1>
                <p class="role">Data Scientist (Senior Consultant)</p>
            </div>
            <!-- <p class="text">Advanced data validation and analysis tools using Python, optimized project timelines, and automated data extraction for financial performance assessment.</p> -->
            <div class="background"></div>
        </div>

        <div class="job">
            <h1 class="year">2019</h1>
            <div class="position">
                <h1 class="company">Interos</h1>
                <p class="role">Data Analytics Intern</p>
            </div>
            <!-- <p class="text">Excelled in Snowflake to boost data handling, developed efficient data schema and SQL queries for optimized data relationships and processing.</p> -->
            <div class="background"></div>
        </div>

        <div class="job">
            <h1 class="year">2018</h1>
            <div class="position">
                <h1 class="company">The Phoenix Team</h1>
                <p class="role">Product Development Intern</p>
            </div>
            <!-- <p class="text">Drove agile product development and led interns in delivering a detailed white paper on effective product management.</p> -->
            <div class="background"></div>
        </div>
    </div>

    <!-- Skills to Include -->
    <!-- <dl id="skills">
        <dt>Python</dt>
            <dd>NumPy</dd>
            <dd>SciPy</dd>
            <dd>Pandas</dd>
            <dd>Matplotlib</dd>
            <dd>Seaborn</dd>
            <dd>SciKit-learn</dd>
            <dd>OpenCV</dd>
            <dd>PyTorch</dd>
        <dt>SQL</dt>
        <dt>R</dt>
            <dd>dplyr</dd>
            <dd>ggplot2</dd>
        <dt>Excel</dt>
        <dt>D3.js</dt>
    </dl> -->
    <!-- NEED TO REDESIGN SKILLS SECTION -->
    <!-- <div class="section">
        <p class="text header">Skills</p>
    </div> -->

    <div id="footer-content">
        <p class="footer"><span id="copyright">&#169</span> Dylan Posner 2023</p>
        <div class="headshot"><img src="favicon.png" alt="avatar headshot by midjourney"></div>
    </div>
</div>

<style>
    :global(html) {
        scrollbar-width: none;
        width: 100vw;
        height: 100%;
        margin: 0;
        padding: 0;
        background-color: #004643;
    }

    :global(body) {
        width: 100vw;
        height: 100%;
        margin: 0;
        padding: 0;
    }

    #content {
        color: #e8e4e6;
        user-select: none;
    }

    #copyright {
        font-family: sans-serif;
    }

    #footer-content {
        padding-bottom: 10vh;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .section {
        margin-bottom: 12.5vh;
        display: flex;
        flex-direction: column;
    }

    .headshot {
        display: inline-block;
    }

    .headshot img {
        width: 10vmin;
        height: auto;
        margin-left: 1em;
        border-radius: 50%;
        opacity: 0.60;
        box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.85);
        transition: transform 0.55s, opacity 0.55s, box-shadow 0.55s;
    }

    .headshot img:hover {
        transform: scale(1.2);
        opacity: 1;
        box-shadow: 0px 12px 16px rgba(0, 0, 0, 0.75);
    }


    .header, .footer{
        width: max-content;
        padding-left: 20vw;
        font-size: 3.5vmin;
    }

    .long-text {
        font-size: 7.5vmin;
        padding-left: 20vw;
        padding-right: 20vw;
        color: #abd1c6;
    }

    .job {
        width: 100vw;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        position: relative;
        transition: color 0.3s;
    }

    .position, .year {
        padding-left: 20vw;
        z-index: 2;
    }

    .position {
        width: 100%;
        padding-right: 20vw;
    }

    .company, .year {
        font-size: 4vmin;
    }

    .role {
        font-size: 2vmin;
    }

    .background {
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgb(249, 188, 96);
        transform-origin: center; 
        transform: scaleY(0);
        transition: transform 0.3s;
        z-index: 1;
    }

    .job:hover .background {
        transform: scaleY(1);
    }

    .job:hover {
        color: #004643;
    }

    @media (max-width: 925px) {
        .long-text {
            padding-left: 12vw;
            padding-right: 12vw;
        }

        .section p, .job h1 {
            padding-left: 12vw;
        }

        .position {
            padding-left: 12vw;
            padding-right: 12vw;
        }
    }

    @media (max-width: 610px) {
        .long-text {
            padding-left: 5vw;
            padding-right: 5vw;
        }

        .section p, .job h1 {
            padding-left: 5vw;
        }

        .position {
            padding-left: 5vw;
            padding-right: 5vw;
        }
    }

    @media (max-width: 480px) {
        #footer-content {
            flex-direction: column-reverse;
            margin-bottom: 5vh;
        }

        .footer {
            padding-left: 0;
        }

        .position {
            padding-right: 0;
        }
    }
</style>