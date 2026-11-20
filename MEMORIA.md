# Memoria de Desarrollo: Actividad 1 – Blog Temático
**Autor:** Marco Antonio Fernández Heras

---

### 1. Resumen y Propósito del Proyecto
El proyecto **SecurityZone** consiste en un portal web informativo especializado en ciberseguridad. La solución combinando un frontend estático con un pipeline automatizado de ingesta y normalización de noticias (RSS) mediante tareas programadas en GitHub Actions.

---

### 2. Proceso de Desarrollo (Evolución Cronológica)

El desarrollo se gestionó mediante Git siguiendo un enfoque incremental:

1. **Configuración de Infraestructura y Despliegue Continuo (CI/CD):**  
   Se inicializó el repositorio y se configuró el pipeline de entrega continua mediante GitHub Actions (`.github/workflows/static.yml`), garantizando el despliegue automático del sitio en **GitHub Pages** tras cada integración en la rama principal.

2. **Diseño de la Interfaz y Prototipado Estático:**  
   Se estructuró la experiencia de usuario en tres páginas clave: portada principal (`index.html`), catálogo completo de noticias (`listado-articulos.html`) y lectura en profundidad (`detalle-articulo.html`). Se utilizó **Bootstrap 5.3** combinado con estilos CSS propios (`style.css`), estableciendo una estética oscura e incluyendo tipografía *Inter*.

3. **Motor de Ingesta y Automatización (Backend Serverless):**  
   Para mantener el portal actualizado sin un servidor web dedicado, se implementó un script en Node.js (`jobs/update_feeds.js`) apoyado en la librería `rss-parser`. El script agrega y normaliza publicaciones de fuentes oficiales y de referencia en ciberseguridad (INCIBE-CERT, INCIBE Ciudadanía, Hispasec Una al Día, El Lado del Mal y Cyberhades), generando un archivo estructurado `feeds.json`. Este proceso se automatizó con un flujo programado (`update-feeds.yml`) ejecutado cada 6 horas mediante un cron en GitHub Actions, que commitea automáticamente los nuevos datos.

4. **Dinamización del Frontend y Navegación Cliente:**  
   Se sustituyeron los datos estáticos de prueba por consumo asíncrono (`fetch`) del archivo `feeds.json` con JavaScript y AJAX. Se implementó un patrón de renderizado basado en plantillas del DOM (`cloneNode`), lógica de paginación dinámica en el listado y paso de parámetros mediante `URLSearchParams` para alimentar la vista de detalle. Finalmente, se incorporó un diagrama ilustrativo del flujo de datos en la portada.

---

### 3. Declaración sobre el Uso de Inteligencia Artificial
En cumplimiento de las buenas prácticas y la transparencia académica, se hace constar el apoyo puntual de herramientas de Inteligencia Artificial exclusivamente para:
* **Generación de recursos gráficos:** Creación de las imágenes e ilustraciones del sitio (imagen de portada e infografía del flujo de trabajo), posteriormente optimizadas usando la utilidad web Squoosh.
* **Soporte en CI/CD:** Asistencia en la sintaxis y depuración de errores de configuración en los flujos de trabajo de GitHub Actions.  

***La concepción arquitectónica, la maquetación (HTML/CSS), la lógica en JavaScript y la integración final han sido desarrolladas y validadas por mi.***

---

### 4. Enlaces de Acceso y código fuente

* **Sitio Web Publicado (GitHub Pages):**  
  `https://marcofernandezherasunir.github.io/dar-actividad1-blog/`
* **Repositorio de Código (GitHub):**  
  `https://github.com/MarcoFernandezHerasUnir/dar-actividad1-blog`
