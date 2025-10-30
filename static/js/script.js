/**
 * Función para manejar el estado 'activo' del enlace del navbar clickeado.
 * Utiliza 'this' para identificar el elemento que activó el evento.
 * @param {HTMLAnchorElement} elementoNav - El elemento 'a' del navbar (usando this).
 */
function manejarNavActivo(elementoNav) {
    // 1. Remover la clase 'activo' de todos los enlaces
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.classList.remove('activo');
    });

    // 2. Agregar la clase 'activo' al enlace clickeado (usando 'this')
    elementoNav.classList.add('activo');
}

/**
 * Animación escalonada del título principal al cargar la página.
 */
function animarTituloHero() {
    const titulo = document.querySelector('.animar-titulo-hero');
    
    // Si el título no existe, sale de la función
    if (!titulo) return;

    // 1. Envolver cada caracter en un <span> (para el efecto escalonado)
    titulo.innerHTML = titulo.textContent.replace(/\S/g, "<span class='letter' style='display: inline-block;'>$&</span>");

    // 2. Definir la línea de tiempo de la animación
    anime.timeline({ loop: false })
        .add({
            targets: '.animar-titulo-hero .letter',
            scale: [0.3, 1],
            opacity: [0, 1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 950,
            delay: (el, i) => 70 * i // Efecto escalonado (staggering)
        });
}

/**
 * Gestiona las animaciones de entrada y de barras al hacer scroll.
 */
function manejarAnimacionesEnScroll() {
    const elementosParaAnimar = document.querySelectorAll('.animacion-entrada:not(.animado)');
    const barrasHabilidad = document.querySelectorAll('.barra-progreso-animada:not(.animado)');

    const viewportHeight = window.innerHeight;

    // --- Animación de Entrada para Secciones (Fade In Up) ---
    elementosParaAnimar.forEach(elemento => {
        const rect = elemento.getBoundingClientRect();
        // Dispara si el elemento está visible (un tercio de su altura dentro del viewport)
        if (rect.top < viewportHeight - (rect.height / 3) && rect.bottom > 0) {
            anime({
                targets: elemento,
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 800,
                easing: 'easeOutQuad',
            });
            elemento.classList.add('animado');
        }
    });

    // --- Animación de Barras de Habilidad (Llenado) ---
    barrasHabilidad.forEach(barra => {
        const rect = barra.getBoundingClientRect();
        // Dispara si la barra está visible
        if (rect.top < viewportHeight - 50 && rect.bottom > 50) {
            const targetWidth = barra.getAttribute('data-target-width');
            
            anime({
                targets: barra,
                width: targetWidth, // Anima al ancho ya definido en el atributo data
                duration: 1500,
                easing: 'easeOutQuad',
            });
            barra.classList.add('animado');
        }
    });
}

// Listener de scroll (Modificado para incluir animaciones)
window.addEventListener('scroll', () => {
    // Lógica de navegación activa
    const secciones = document.querySelectorAll('main section');
    const scrollPos = window.scrollY + 100; // Offset

    secciones.forEach(seccion => {
        const top = seccion.offsetTop;
        const bottom = top + seccion.offsetHeight;
        const id = seccion.id;

        if (scrollPos >= top && scrollPos < bottom) {
            const navLink = document.querySelector(`.navbar-nav a[href="#${id}"]`);
            if (navLink && !navLink.classList.contains('activo')) {
                manejarNavActivo(navLink);
            }
        }
    });

    // Lógica de animaciones de entrada
    manejarAnimacionesEnScroll();
});

/**
 * Efecto onmouseover/onmouseout para el nombre en HOME (Hover con JS).
 * @param {HTMLElement} elemento - El span del nombre (usando this).
 */
function resaltarNombre(elemento) {
    elemento.style.color = 'var(--color-accent)';
}

function normalizarNombre(elemento) {
    elemento.style.color = 'var(--color-dark)';
}

/**
 * Efecto onmouseover/onmouseout para la foto de perfil (Hover con JS).
 * @param {HTMLElement} elemento - El div de la foto (usando this).
 */
function escalarFoto(elemento) {
    elemento.style.transform = 'scale(1.05)';
}

function normalizarFoto(elemento) {
    elemento.style.transform = 'scale(1.0)';
}

/**
 * Efecto onmouseover/onmouseout para los badges de Habilidades (Hover con JS).
 * @param {HTMLElement} elemento - El badge (usando this).
 */
function resaltarBadge(elemento) {
    elemento.style.backgroundColor = 'var(--color-accent)';
    elemento.style.transform = 'scale(1.1)';
}

function normalizarBadge(elemento) {
    elemento.style.backgroundColor = 'var(--color-dark)';
    elemento.style.transform = 'scale(1.0)';
}

/**
 * Efecto onmouseover/onmouseout para las tarjetas del Portafolio (Hover con JS).
 * @param {HTMLElement} elemento - El enlace de la tarjeta (usando this).
 */
function escalarCard(elemento) {
    elemento.style.transform = 'translateY(-5px)';
    elemento.querySelector('.proyecto-card').style.boxShadow = '0 0.5rem 1rem var(--color-medium)';
}

function normalizarCard(elemento) {
    elemento.style.transform = 'translateY(0)';
    elemento.querySelector('.proyecto-card').style.boxShadow = '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)';
}

/**
 * Efecto onmouseover/onmouseout para los iconos del Footer (Hover con JS).
 * @param {HTMLAnchorElement} elemento - El enlace del icono (usando this).
 */
function resaltarIconoFooter(elemento) {
    elemento.style.color = 'var(--color-accent)';
}

function normalizarIconoFooter(elemento) {
    elemento.style.color = 'var(--color-light)';
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Animación del título principal
    animarTituloHero();
    
    // 2. Llamada inicial a la función de scroll para elementos visibles al cargar
    manejarAnimacionesEnScroll();
    
    // 3. Asegura que el primer enlace esté activo al cargar
    const primerEnlace = document.querySelector('.navbar-nav .nav-link');
    if (primerEnlace) {
        primerEnlace.classList.add('activo');
    }
});