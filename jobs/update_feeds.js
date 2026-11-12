const Parser = require('rss-parser');
const fs = require('fs');

const parser = new Parser({
  customFields: {
    item: [['pubDate', 'pubDate'], ['updated', 'updated']]
  }
});

const RSS_FEEDS = [
  { name: "INCIBE-CERT Avisos", url: "https://www.incibe.es/incibe-cert/alerta-temprana/avisos/feed" },
  { name: "INCIBE-Ciudadania", url: "https://www.incibe.es/ciudadania/avisos/feed" },
  { name: "Una al Día (Hispasec)", url: "https://unaaldia.hispasec.com/feed/" },
  { name: "Un informático en el lado del mal", url: "https://www.elladodelmal.com/feeds/posts/default" },
  { name: "Cyberhades", url: "https://cyberhades.com/index.xml" }
];

async function updateFeeds() {
  let allEntries = [];

  for (const feedInfo of RSS_FEEDS) {
    console.log(`Leyendo: ${feedInfo.name}...`);
    try {
      const feed = await parser.parseURL(feedInfo.url);
      
      for (const item of feed.items) {
        // Normalizar la fecha de publicación
        const pubDateStr = item.pubDate || item.isoDate || item.updated || new Date().toISOString();
        const timestamp = new Date(pubDateStr).getTime();
        
        allEntries.push({
          source: feedInfo.name,
          title: item.title || "Sin título",
          link: item.link || "#",
          published: !isNaN(timestamp) ? new Date(timestamp).toISOString() : new Date().toISOString(),
          summary: item.contentSnippet || item.summary || item.content || ""
        });
      }
    } catch (error) {
      console.error(`Error leyendo ${feedInfo.name}:`, error.message);
    }
  }

  // Ordenar de más reciente a más antiguo
  allEntries.sort((a, b) => new Date(b.published) - new Date(a.published));

  const output = {
    updated_at: new Date().toISOString(),
    total_items: allEntries.length,
    items: allEntries
  };

  // Guardar en feeds.json con formato legible
  fs.writeFileSync('feeds.json', JSON.stringify(output, null, 2), 'utf-8');
  console.log("¡Archivo feeds.json generado con éxito!");
}

updateFeeds();