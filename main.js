const HeaderComponent = {
    template: `
        <header>
            <h1>Mi Portafolio</h1>
        </header>
    `
};

const MainComponent = {
    template: `
        <main>
            <section id="sobre-mi">
                <h2>Sobre Mí</h2>
                <p>Información sobre mí.</p>
            </section>
            <section id="proyectos">
                <h2>Proyectos</h2>
                <!-- Marcador de posición para proyectos -->
                <div v-for="project in projects" :key="project.id">
                    <h3>{{ project.title }}</h3>
                    <p>{{ project.description }}</p>
                </div>
            </section>
            <section id="contacto">
                <h2>Contacto</h2>
                <p>Detalles de contacto.</p>
            </section>
        </main>
    `,
    data() {
        return {
            projects: [
                { id: 1, title: 'Proyecto 1', description: 'Descripción del Proyecto 1' },
                { id: 2, title: 'Proyecto 2', description: 'Descripción del Proyecto 2' }
                // Agregar más proyectos aquí
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
