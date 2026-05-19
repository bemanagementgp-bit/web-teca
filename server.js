const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')));

// Serve root-level media files
const rootMedia = ['taller.mp4', 'Tienda.mp4', 'muebleblanco.jpg', 'logo-teca.webp', 'hero.jpg', 'hero.png'];
rootMedia.forEach(file => {
  app.get(`/media/${file}`, (req, res) => {
    res.sendFile(path.join(__dirname, file));
  });
});

// Serve imagenes folder (furniture color variant images)
const imagenesPath = path.join(__dirname, 'imagenes');
if (fs.existsSync(imagenesPath)) {
  app.use('/imagenes', express.static(imagenesPath));
}

// Local development
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n  TECA Muebles`);
    console.log(`  Servidor en http://localhost:${PORT}\n`);
  });
}

module.exports = app;
