const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')));

// Clean URL for /cotiza → cotiza.html
app.get('/cotiza', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cotiza.html'));
});

// Local development
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n  TECA Muebles`);
    console.log(`  Servidor en http://localhost:${PORT}\n`);
  });
}

module.exports = app;
