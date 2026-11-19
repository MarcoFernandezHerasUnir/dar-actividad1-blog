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

function htmlToNode(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
}

function crearPaginacion(node, pages, current){
    //Limpiamos
    node.replaceChildren();

    if(pages == 0) return; //No pintamos nada si no hay más de una página

    //Anterior
    node.appendChild(
        htmlToNode(
            `<li class="page-item ${current === 0 ? 'disabled' : ''}">
                <a class="page-link" href="#" tabindex="-1" data-index="${current-1}">Anterior</a>
            </li>`
        )
    );

    for (let index = 1; index <= pages; index++) 
    {
        node.appendChild(
            htmlToNode(
                `<li class="page-item ${index-1 === current ? 'active' : ''}">
                    <a class="page-link" href="#" data-index="${index-1}">${index}</a>
                </li>`
            )
        );
    }

    //Siguiente
    node.appendChild(
        htmlToNode(
            `<li class="page-item ${current === pages-1 ? 'disabled' : ''}">
                <a class="page-link" href="#" data-index="${current+1}">Siguiente</a>
            </li>`
        )
    );


}

function cambiarPagina(data, page, itemsXpage, template, container)
{
    //Limpiamos
    container.replaceChildren();

    data.slice(page * itemsXpage, (page * itemsXpage) + itemsXpage).forEach((post, index) => {
        addPost(post, (page * itemsXpage) + index, template, container);
    });
}

//On load
window.onload = function() {
    //Obtenemos y almacenamos los nodos
    const template = document.querySelector('#post-template');
    const container = document.querySelector('#articlesGrid');
    const numberOfPosts = Number(container.dataset['postNumber']);

    const pagination = document.querySelector('#pagination');

    const lastUpdate = document.querySelector('#last-update');
    const lastUpdateHdr = document.querySelector('#last-update-hdr')

    fetch('./feeds.json')
        .then(response => response.json())
        .then(data => {
            //console.info(data);

            //Establecer fecha última actualización
            lastUpdate.innerHTML = formatDate(data.updated_at)
            lastUpdateHdr.innerHTML = formatDate(data.updated_at)

            //establecer la paginacion
            const pages = Math.ceil(data.items.length / numberOfPosts);
            crearPaginacion(pagination, pages, 0);

            pagination.addEventListener('click', function(e) {
                const page = Number(e.target.dataset.index);
                if(!isNaN(page)){
                    crearPaginacion(pagination, pages, page);
                    cambiarPagina(data.items, page, numberOfPosts, template, container);
                }
            })

            cambiarPagina(data.items, 0, numberOfPosts, template, container);
        });
}