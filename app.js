const express = require('express');
const path = require('path');

const authRoutes = require('./src/routes/auth');
const promptRoutes = require('./src/routes/prompts');
const aiRoutes = require('./src/routes/ai');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/', authRoutes);
app.use('/', promptRoutes);
app.use('/', aiRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
