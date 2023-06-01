<script lang="ts">
    import { onMount } from 'svelte';
    import gsap from 'gsap';

    let ScrollTrigger;
    let elements;

    onMount(async () => {
        const module = await import('gsap/ScrollTrigger');
        ScrollTrigger = module.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        elements = gsap.utils.toArray(".fade-in");

        elements.forEach(el => {
            let nodes = Array.from(el.childNodes);

            // clear the element's content
            el.innerHTML = '';

            nodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    // for normal text, split into words without adding the class
                    let words = node.textContent.split(" ");
                    words.forEach(word => {
                        let span = document.createElement('span');
                        span.textContent = word + " ";
                        el.appendChild(span);
                    });
                } else if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('highlighted-text')) {
                    // for each highlighted text, keep the highlighted-text class intact
                    let words = node.textContent.split(" ");
                    words.forEach(word => {
                        let span = document.createElement('span');
                        span.style.color = "#f9bc60";
                        span.textContent = word + " ";
                        el.appendChild(span);
                    });
                }
            });
        });

        let spans = gsap.utils.toArray(".fade-in span");

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
        <p class="text header">About Me</p>
        <h1 class="text long-text fade-in">I'm a versatile data scientist, expertly crafting <span class="highlighted-text">cutting-edge</span> analytics that illuminate data from fresh and inventive perspectives.</h1>
    </div>
    
    <div class="section">
        <p class="text header">Experience</p>
        <h1 class="text long-text fade-in">Nearly <span class="highlighted-text">half a decade</span> of diverse experience, enhancing data-driven decisions with a unique blend of creativity and innovation.</h1>
    </div>
    
    <div class="section">
        <p class="text header">History</p>
        <div class="job">
            <h1 class="text year">Now</h1>
            <div class="position">
                <h1 class="text">Booz Allen Hamilton Inc.</h1>
                <p class="text">Data Scientist (Senior Consultant)</p>
            </div>
            <!-- <p class="text">Advanced data validation and analysis tools using Python, optimized project timelines, and automated data extraction for financial performance assessment.</p> -->
            <div class="background"></div>
        </div>

        <div class="job">
            <h1 class="text year">2019</h1>
            <div class="position">
                <h1 class="text">Interos Inc.</h1>
                <p class="text">Data Analytics Intern</p>
            </div>
            <!-- <p class="text">Excelled in Snowflake to boost data handling, developed efficient data schema and SQL queries for optimized data relationships and processing.</p> -->
            <div class="background"></div>
        </div>

        <div class="job">
            <h1 class="text year">2018</h1>
            <div class="position">
                <h1 class="text">The Phoenix Team</h1>
                <p class="text">Product Development Intern</p>
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

    <div class="section">
        <p class="text header"><span id="copyright">&#169</span> Dylan Posner 2023</p>
    </div>
</div>

<style>
    #content {
        margin-top: 2rem;
        color: #e8e4e6;
    }

    #copyright {
        font-family: sans-serif;
    }

    .section {
        margin-bottom: 10vh;
        display: flex;
        flex-direction: column;
    }

    .text {
        padding-left: 20vw;
        user-select: none;
    }

    .header {
        font-size: 26px;
    }

    .long-text {
        font-size: 60px;
        padding-right: 20vw;
        color: #abd1c6;
    }

    .job {
        width: 100%;
        display: flex;
        flex-direction: row;
        text-align: center;
        align-items: center;
        position: relative;
        transition: color 0.3s;
    }

    .position, .year {
        z-index: 2;
    }

    .position {
        width: 100%;
        text-align: center;
        padding-right: 20vw;
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
        .text {
            padding-left: 12vw;
        }

        .long-text {
            font-size: 55px;
            padding-right: 12vw;
        }

        .job h1 {
            font-size: 22px;
        }

        .section p {
            font-size: 14px;
        }

        .position {
            padding-right: 12vw;
        }
    }

    @media (max-width: 610px) {
        .text {
            padding-left: 5vw;
        }

        .long-text {
            font-size: 40px;
            padding-right: 5vw;
        }

        .job h1 {
            font-size: 18px;
        }

        .section p {
            font-size: 10px;
        }

        .position {
            padding-right: 5vw;
        }
    }

    @media (max-width: 480px) {
        .long-text {
            font-size: 30px;
        }

        .job h1 {
            font-size: 14px;
        }

        .position {
            padding-right: 0vw;
        }
    }
</style>