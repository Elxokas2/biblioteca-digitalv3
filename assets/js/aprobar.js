document.addEventListener('DOMContentLoaded', function() {
    const metodos = document.querySelectorAll('.metodo');
    const beneficios = document.querySelectorAll('.beneficio');
    const testimonios = document.querySelector('.testimonio-carousel');
    const testimonioItems = document.querySelectorAll('.testimonio');
    const themeToggle = document.getElementById('theme-toggle');

    // Tema claro/oscuro
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });

    // Verificar preferencia de tema guardada
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    // Animación de entrada para los métodos y beneficios
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                if (entry.target.classList.contains('metodo')) {
                    animateIcon(entry.target.querySelector('.metodo-icon i'));
                }
            }
        });
    }, { threshold: 0.1 });

    metodos.forEach(met => observer.observe(met));
    beneficios.forEach(ben => observer.observe(ben));

    // Animación suave de los iconos
    function animateIcon(icon) {
        icon.style.animation = 'float 3s ease-in-out infinite';
    }

    // Agregar animaciones
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }

        .fade-in {
            animation: fadeIn 1.5s ease-out forwards;
            opacity: 0;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // Efecto parallax suave para el fondo y los círculos decorativos
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        document.querySelector('.background-animation').style.transform = `translateY(${scrollPosition * 0.5}px)`;
        
        const circles = document.querySelectorAll('.circle');
        circles.forEach((circle, index) => {
            circle.style.transform = `translate(${scrollPosition * 0.1 * (index + 1)}px, ${scrollPosition * 0.1 * (index + 1)}px)`;
        });
    });

    // Efecto de hover suave para las tarjetas de método y beneficios
    const cards = [...metodos, ...beneficios];
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.03)';
            card.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
        });
    });

    // Carrusel automático de testimonios
    let currentIndex = 0;
    const totalTestimonios = testimonioItems.length;

    function moveCarousel() {
        currentIndex = (currentIndex + 1) % totalTestimonios;
        testimonios.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    setInterval(moveCarousel, 5000); // Cambia cada 5 segundos

    // Smooth scroll para el botón "Descubre los Métodos"
    document.querySelector('.btn-primary').addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Funcionalidad para los botones "Explorar técnica"
    document.querySelectorAll('.btn-secondary').forEach(button => {
        button.addEventListener('click', function() {
            const tecnica = this.closest('.metodo').id;
            alert(`Has seleccionado explorar la técnica: ${tecnica}`);
            // Aquí puedes agregar la lógica para mostrar más información sobre la técnica
        });
    });
});