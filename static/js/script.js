/*
    JAVASCRIPT PERSONALIZADO
    Contiene la lógica para interactividad, efectos hover con this y manipulación del DOM.
*/

// ===================================================================
// 1. MANEJO DE SCROLL SUAVE Y ESTADO ACTIVO DEL NAVBAR
// ===================================================================

/**
 * Función para manejar el estado 'activo' de los enlaces del navbar.
 * Utiliza 'this' para identificar el enlace clickeado.
 * @param {HTMLAnchorElement} elementoNav - El elemento 'a' del navbar que fue clickeado.
 */
function manejarNavActivo(elementoNav) {
    // Remover la clase 'activo' de todos los enlaces
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.classList.remove('activo');
    });

    // Agregar la clase 'activo' al enlace clickeado (usando 'this')
    elementoNav.classList.add('activo');

    // Desplazamiento suave (Scroll Smooth)
    const targetId = elementoNav.getAttribute('href').substring(1); // Obtiene 'inicio', 'sobre-mi', etc.
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
        // Previene el comportamiento por defecto del ancla
        event.preventDefault();

        // Usa scrollIntoView para el desplazamiento suave
        targetElement.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// Función para actualizar el estado activo al hacer scroll
window.addEventListener('scroll', () => {
    const secciones = document.querySelectorAll('main section');
    const scrollPos = window.scrollY + 100; // Agregar un offset para mejor detección

    secciones.forEach(seccion => {
        if (scrollPos >= seccion.offsetTop && scrollPos < (seccion.offsetTop + seccion.offsetHeight)) {
            // Encuentra el enlace correspondiente a la sección actual
            const navLink = document.querySelector(`.navbar-nav a[href="#${seccion.id}"]`);
            
            // Si el enlace existe, simula el click para activar el estado (sin el comportamiento de scroll)
            if (navLink && !navLink.classList.contains('activo')) {
                document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                    link.classList.remove('activo');
                });
                navLink.classList.add('activo');
            }
        }
    });
});


// ===================================================================
// 2. INTERACTIVIDAD Y MANIPULACIÓN DEL DOM
// ===================================================================

/**
 * Efecto onmouseover y onmouseout con JS (Requisito 6)
 * Cambia el color del título principal.
 * @param {HTMLElement} elemento - El elemento que dispara el evento (usando this).
 * @param {string} color - El color CSS a aplicar.
 */
function cambiarColorTitulo(elemento, color) {
    elemento.style.transition = 'color 0.3s ease';
    elemento.style.color = color;
}

/**
 * Efecto onclick: Agrega un mensaje temporal al DOM (Requisito 5 & 7).
 * @param {HTMLButtonElement} boton - El botón que dispara el evento (usando this).
 */
function agregarMensaje(boton) {
    // Detiene la función si ya existe un mensaje
    if (document.getElementById('dato-curioso-mensaje')) {
        return;
    }

    // Crear el nuevo elemento (párrafo)
    const nuevoMensaje = document.createElement('p');
    nuevoMensaje.id = 'dato-curioso-mensaje';
    nuevoMensaje.className = 'mt-3 fw-bold texto-claro animate__animated animate__fadeIn'; // Clases de Bootstrap y animación
    nuevoMensaje.style.color = 'yellow';
    nuevoMensaje.innerHTML = '👉 **Dato Curioso**: Mi fuerte interés por el hardware me permite abordar la programación desde una perspectiva integral.';

    // Insertar el elemento justo después del botón
    boton.parentNode.insertBefore(nuevoMensaje, boton.nextSibling);

    // Opcional: Remover el mensaje después de 5 segundos
    setTimeout(() => {
        const mensajeExistente = document.getElementById('dato-curioso-mensaje');
        if (mensajeExistente) {
            mensajeExistente.classList.replace('animate__fadeIn', 'animate__fadeOut');
            mensajeExistente.addEventListener('animationend', () => {
                mensajeExistente.remove();
            }, { once: true });
        }
    }, 5000);
}

/**
 * Función para remover un elemento padre del DOM (Requisito 7).
 * Utiliza 'this' para identificar el elemento.
 * @param {HTMLButtonElement} boton - El botón que dispara el evento (usando this).
 */
function removerFooter(boton) {
    const footerElement = boton.previousElementSibling; // El blockquote
    const mensaje = document.createElement('p');
    mensaje.className = 'text-danger fw-bold mt-3';
    mensaje.textContent = '❌ ¡Contacto Oculto! Por favor, recarga la página para restaurarlo.';
    
    // Remover el elemento (el blockquote)
    if (footerElement) {
        footerElement.remove();
        boton.replaceWith(mensaje); // Reemplazar el botón con el mensaje
    }
}

/**
 * Efecto onmouseover para botones de servicio (Requisito 6).
 * Modifica el elemento usando 'this'.
 * @param {HTMLAnchorElement} boton - El botón que dispara el evento.
 */
function aplicarEfectoHover(boton) {
    boton.classList.replace('btn-outline-primary', 'btn-danger');
    boton.textContent = '¡Ver Ahora!';
}

/**
 * Efecto onmouseout para botones de servicio (Requisito 6).
 * Modifica el elemento usando 'this'.
 * @param {HTMLAnchorElement} boton - El botón que dispara el evento.
 */
function revertirEfectoHover(boton) {
    boton.classList.replace('btn-danger', 'btn-outline-primary');
    boton.textContent = 'Más Info';
}

/**
 * Efecto onmouseover (hover) con JS en los logos de clientes (Requisito 6).
 * @param {HTMLElement} elemento - El div del logo (usando this).
 */
function resaltarLogo(elemento) {
    elemento.style.transform = 'scale(1.1)';
    elemento.style.boxShadow = '0 0 15px var(--color-principal)';
}

/**
 * Efecto onmouseout (hover) con JS en los logos de clientes (Requisito 6).
 * @param {HTMLElement} elemento - El div del logo (usando this).
 */
function normalizarLogo(elemento) {
    elemento.style.transform = 'scale(1.0)';
    elemento.style.boxShadow = '0 .125rem .25rem rgba(0,0,0,.075)'; // Sombra de Bootstrap
}

/**
 * Manejo del evento onchange para cambiar el tema del sitio (Requisito 5).
 * Modifica la clase del body.
 * @param {string} tema - El valor seleccionado ('claro' u 'oscuro').
 */
function cambiarTema(tema) {
    const body = document.body;
    if (tema === 'oscuro') {
        body.classList.add('tema-oscuro');
    } else {
        body.classList.remove('tema-oscuro');
    }
}

// ===================================================================
// 3. INICIALIZACIÓN
// ===================================================================

// Asegura que al cargar la página el estado de la navegación sea correcto
document.addEventListener('DOMContentLoaded', () => {
    // Al cargar, activa el primer enlace
    const primerEnlace = document.querySelector('.navbar-nav .nav-link');
    if (primerEnlace) {
        primerEnlace.classList.add('activo');
    }
});