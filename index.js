"use strict";

function formatDate(d){
    const fecha = new Date(d);
    return fecha.toLocaleString('es-ES', {
        day: '2-digit',       // Día con dos dígitos
        month: '2-digit',     // Mes con dos dígitos
        year: 'numeric',      // Año completo
        hour: '2-digit',      // Hora con dos dígitos
        minute: '2-digit',    // Minutos con dos dígitos
        hour12: false         // Formato 24 horas
    });
}

function addPost(post, index, template, container)
{
    //console.info(post)

    //Clonamos el nodo template y todos sus hijos
    const clone = template.cloneNode(true);

    //Quitamos el id para evitar id's duplicados
    clone.removeAttribute("id");

    //Obtenemos los nodos a rellenar con los datos de la noticia dentro del nodo clonado
    const nodoOrigen = clone.querySelector('#post-origin');
    const nodoFecha = clone.querySelector('#post-date');
    const nodoTitulo = clone.querySelector('#post-title');
    const nodoDescripcion = clone.querySelector('#post-description');
    const nodoEnlace = clone.querySelector('#post-link');

    //rellenamos los datos
    nodoOrigen.innerHTML = post.source;
    nodoFecha.innerHTML = formatDate(post.published)
    nodoTitulo.innerHTML = post.title;

    //Formamos la descripción con el inicio del post
    let sumaryParts = post.summary.split('\n').filter(s => s.trim().length > 0)
    nodoDescripcion.innerHTML = sumaryParts.slice(0, 5).reduce((p,c) => p + '</br>' + c, '') + '...';

    nodoEnlace.href = `./detalle-articulo.html?pos=${index}`;

    //Añadimos el post al container
    container.appendChild(clone);
}

//On load
window.onload = function() {
    //Obtenemos y almacenamos los nodos
    const template = document.querySelector('#post-template');
    const container = document.querySelector('#post-container');
    const numberOfPosts = Number(container.dataset['postNumber']);
    const lastUpdate = document.querySelector('#last-update');

    fetch('./feeds.json')
        .then(response => response.json())
        .then(data => {
            //console.info(data);

            //Establecer fecha última actualización
            lastUpdate.innerHTML = formatDate(data.updated_at)

            //Crear los post usando el template
            data.items.slice(0, numberOfPosts).forEach((post, index) => {
                addPost(post, index, template, container);
            });
        });
}