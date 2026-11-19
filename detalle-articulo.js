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

//On load
window.onload = function() {
    //Obtenemos y almacenamos los nodos
    const nodoOrigin = document.querySelector('#origin');
    const nodoPostDate = document.querySelector('#post-date');
    const nodoTitle = document.querySelector('#post-title');
    const nodoPostBody = document.querySelector('#post-body');
    const nodoEnlace = document.querySelector('#post-original-link');

    const lastUpdate = document.querySelector('#last-update');

    const params = new URLSearchParams(window.location.search);
    const pos = Number(params.get("pos"));
    if(isNaN(pos)) return;

    fetch('./feeds.json')
        .then(response => response.json())
        .then(data => {

            //Establecer fecha última actualización
            lastUpdate.innerHTML = formatDate(data.updated_at)

            const post = data.items[pos];

            console.info(post);

            //rellenamos los datos
            nodoOrigin.innerHTML = post.source;
            nodoPostDate.innerHTML = formatDate(post.published)
            nodoTitle.innerHTML = post.title;
            nodoPostBody.innerHTML = post.summary.split('\n')
                                         .filter(s => s.trim().length > 0)
                                         .reduce((p,c) => p + '</br>' + c, '') ;

            nodoEnlace.href = post.link;

            //Formamos la descripción con el inicio del post
            // let sumaryParts = post.summary.split('\n').filter(s => s.trim().length > 0)
            // nodoDescripcion.innerHTML = sumaryParts.slice(0, 5).reduce((p,c) => p + '</br>' + c, '') + '...';


            // origin.innerHTML = formatDate(post.publised)
        });
}