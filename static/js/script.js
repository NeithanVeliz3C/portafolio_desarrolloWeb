/*
    JAVASCRIPT PERSONALIZADO
    Contiene la lógica para interactividad, efectos hover con this y manipulación del DOM.
*/

// ===================================================================
// 1. MANEJO DE SCROLL SUAVE Y ESTADO ACTIVO DEL NAVBAR
// ===================================================================

/**
 * Función para manejar el estado 'activo' de los enlaces del navbar.
 * Utiliza 'this' para identificar el enlace clickeado (Requisito 5).
 * @param {HTMLAnchorElement} elementoNav - El elemento 'a' del navbar que fue clickeado (usando this).
 */
function manejarNavActivo(elementoNav) {
    // Remover la clase 'activo' de todos los enlaces
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.classList.remove('activo');
    });

    // Agregar la clase 'activo' al enlace clickeado (usando 'this')
    elementoNav.classList.add('activo');
}

// Función para actualizar el estado activo al hacer scroll
window.addEventListener('scroll', () => {
    const secciones = document.querySelectorAll('main section');
    const scrollPos = window.scrollY + 100; // Offset

    secciones.forEach(seccion => {
        const top = seccion.offsetTop;
        const bottom = top + seccion.offsetHeight;
        const id = seccion.id;

        if (scrollPos >= top && scrollPos < bottom) {
            const navLink = document.querySelector(`.navbar-nav a[href="#${id}"]`);
            
            if (navLink && !navLink.classList.contains('activo')) {
                // Simular la acción para actualizar el estado
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
 * Efecto onmouseover y onmouseout con JS (Requisito 6).
 * Cambia el color del título principal usando 'this'.
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
    const contenedor = boton.closest('.bloque-contenido');

    // Remover mensaje anterior si existe (Manipulación del DOM con 'this')
    const mensajeAnterior = contenedor.querySelector('#mensaje-lema');
    if (mensajeAnterior) {
        mensajeAnterior.remove();
        boton.textContent = 'Mostrar Lema'; // Restaurar texto del botón
        return; // Detener si ya existe (funciona como toggle)
    }

    // Crear el nuevo elemento (párrafo)
    const nuevoMensaje = document.createElement('p');
    nuevoMensaje.id = 'mensaje-lema';
    nuevoMensaje.className = 'mt-3 fst-italic';
    nuevoMensaje.style.color = 'var(--color-principal)';
    nuevoMensaje.textContent = '🧠 Mi lema: "Siempre hay una mejor forma de hacer las cosas. Búscala."';

    // Insertar el elemento justo antes del botón
    boton.parentNode.insertBefore(nuevoMensaje, boton);

    // Modificar el texto del botón (Manipulación con 'this')
    boton.textContent = 'Ocultar Lema';
}


// ===================================================================
// 3. EFECTOS HOVER CON JS (USANDO THIS)
// ===================================================================

/**
 * Efecto onmouseover/onmouseout para las habilidades (Requisito 6).
 * @param {HTMLElement} elemento - El badge (usando this).
 * @param {boolean} esMouseOver - Si es true (mouseover), si es false (mouseout).
 */
function resaltarHabilidad(elemento, esMouseOver) {
    elemento.style.transition = 'transform 0.3s, background-color 0.3s';
    if (esMouseOver) {
        elemento.style.transform = 'scale(1.1)';
        elemento.style.backgroundColor = 'var(--color-secundario)'; // Cambia a un color diferente
    } else {
        elemento.style.transform = 'scale(1.0)';
        elemento.style.backgroundColor = 'var(--bs-success)'; // Vuelve al color original de Bootstrap
    }
}

/**
 * Efecto onmouseover/onmouseout para las tarjetas de Portafolio (Requisito 6).
 * @param {HTMLElement} elemento - La tarjeta (usando this).
 */
function resaltarCard(elemento) {
    elemento.style.border = '2px solid var(--color-principal)';
}

function normalizarCard(elemento) {
    elemento.style.border = '1px solid var(--color-sombra)';
}

/**
 * Efecto onmouseover/onmouseout para los iconos de Contacto (Requisito 6).
 * @param {HTMLElement} elemento - El enlace del icono (usando this).
 */
function resaltarIcono(elemento) {
    elemento.style.color = 'var(--color-principal)';
    elemento.style.transform = 'scale(1.2) rotate(5deg)';
}

function normalizarIcono(elemento) {
    elemento.style.color = 'var(--color-texto-principal)';
    elemento.style.transform = 'scale(1.0) rotate(0deg)';
}

// Nota: La función 'cambiarTema' ha sido eliminada.

// ===================================================================
// 4. INICIALIZACIÓN
// ===================================================================

// Asegura que al cargar la página el estado de la navegación sea correcto
document.addEventListener('DOMContentLoaded', () => {
    // Al cargar, activa el primer enlace
    const primerEnlace = document.querySelector('.navbar-nav .nav-link');
    if (primerEnlace) {
        primerEnlace.classList.add('activo');
    }
});