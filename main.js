const HeaderComponent = {
    template: `
        <header>
            <h1>MY PORTFOLIO</h1>
        </header>
    `
};

const MainComponent = {
    template: `
        <main>
            <section id="about-me">
                <h2>About Me</h2>
                <p>Hello! I'm Yuber, an enthusiastic and budding electronic engineer with a passion for technology and a keen interest in web development. Although I'm just starting my professional journey in the frontend web development, my fascination with coding and commitment to continual learning have been the driving forces behind my growth.</p>
            </section>
            <section id="background">
                <h2>Educational Background & Learning Path</h2>
                <p>I recently graduated from [Your University/College Name] with a degree in [Your Degree, e.g., Computer Science]. During my academic tenure, I delved into various aspects of programming and completed several projects, which you can view in my portfolio section. My thirst for knowledge didn't stop at university; I've actively engaged in online courses on platforms like Coursera and Codecademy, focusing on [Specific Languages or Skills, e.g., JavaScript, React].</p>
            </section>
            <section id="projects">
                <h2>Proyectos</h2>
                <!-- Marcador de posición para proyectos -->
                <div v-for="project in projects" :key="project.id">
                    <h3><a :href="project.url" target="_blank">{{ project.title }}</a></h3>
                    <p>{{ project.description }}</p>
                </div>
            </section>
            <section id="skills-interest">
                <h2>Skills & Interests</h2>
                <p>While my primary focus has been on [Specific Skills or Area, e.g., Front-End Development], I am also proficient in [Other Skills, e.g., basic Python, UI design principles]. I am particularly fascinated by [A Specific Aspect of Development, e.g., the potential of AI in web development], and I'm eager to explore this field further.</p>
            </section>
            <section id="beyond-coding">
                <h2>Beyond Coding</h2>
                <p>When I'm not coding, you'll find me [Hobbies or Activities, e.g., participating in local hackathons, exploring new tech gadgets, or contributing to open-source projects]. I believe that being involved in the tech community is crucial for personal and professional growth.</p>
            </section>
            <section id="aspirations">
                <h2>My Aspirations</h2>
                <p>I am excited about the opportunity to start my professional career and contribute to meaningful projects. I'm looking for a role where I can collaborate with experienced developers, learn from real-world challenges, and grow as a developer.</p>
            </section>              
            <section id="contact">
                <h2>Let's Connect</h2>
                <p>I'd love to connect with fellow tech enthusiasts and potential employers. Feel free to browse through my projects, and don't hesitate to reach out for collaborations or opportunities. Thank you for visiting my portfolio!</p>
            </section>
        </main>
    `,
    data() {
        return {
            projects: [
                { id: 1, title: 'Monster Slayer', description: 'Descripción del Proyecto 1', url:'projects/monsterslayer/index.html' },
                { id: 2, title: 'Snake', description: 'Descripción del Proyecto 2', url:'projects/snake/index.html' },
                { id: 3, title: 'Tic Tac Toe', description: 'Descripción del Proyecto 3', url:'projects/tictactoe/index.html' },
                { id: 4, title: 'Robofriend(react-redux)', description: 'Descripción del Proyecto 4', url:'https://yuberalberto.github.io/robofriendsredux/' },
                { id: 5, title: 'VCCV Entrepreneurship Project', description: 'Descripción del Proyecto 5', url:'https://yuberalberto.github.io/vccv-app/' }
                // Add more projects here
            ]
        }
    }
};

const FooterComponent = {
    template: `
        <footer>
            <p>© 2024 Mi Portafolio</p>
        </footer>
    `
};

Vue.createApp({
    components: {
        'header-component': HeaderComponent,
        'main-component': MainComponent,
        'footer-component': FooterComponent
    }
}).mount('#app');
