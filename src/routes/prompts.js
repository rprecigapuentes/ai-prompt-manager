const express = require('express');
const router = express.Router();
const db = require('../db');

// List prompts with optional search and tag filter
router.get('/', (req, res) => {
  const { search, tag } = req.query;
  let prompts;

  if (search && tag) {
    // Both filters active: match keyword AND exact tag
    prompts = db.prepare(
      `SELECT * FROM prompts
       WHERE (title LIKE ? OR body LIKE ?)
         AND (',' || REPLACE(tags, ' ', '') || ',') LIKE ('%,' || ? || ',%')
       ORDER BY created_at DESC`
    ).all(`%${search}%`, `%${search}%`, tag);
  } else if (search) {
    prompts = db.prepare(
      'SELECT * FROM prompts WHERE title LIKE ? OR body LIKE ? ORDER BY created_at DESC'
    ).all(`%${search}%`, `%${search}%`);
  } else if (tag) {
    // Exact whole-word tag match using comma wrapping
    prompts = db.prepare(
      `SELECT * FROM prompts
       WHERE (',' || REPLACE(tags, ' ', '') || ',') LIKE ('%,' || ? || ',%')
       ORDER BY created_at DESC`
    ).all(tag);
  } else {
    prompts = db.prepare('SELECT * FROM prompts ORDER BY created_at DESC').all();
  }

  // Collect all unique tags for the tag cloud
  const allPrompts = db.prepare('SELECT tags FROM prompts').all();
  const tagSet = new Set();
  allPrompts.forEach(p => {
    p.tags.split(',').map(t => t.trim()).filter(Boolean).forEach(t => tagSet.add(t));
  });

  res.render('index', {
    prompts,
    search: search || '',
    activeTag: tag || '',
    allTags: [...tagSet]
  });
});

// Show create form
router.get('/prompts/new', (req, res) => {
  res.render('create', { error: null });
});

// Handle create
router.post('/prompts', (req, res) => {
  const { title, body, tags } = req.body;
  if (!title || !body) {
    return res.render('create', { error: 'Title and body are required.' });
  }
  const normalizedTags = (tags || '').split(',').map(t => t.trim()).filter(Boolean).join(',');
  db.prepare('INSERT INTO prompts (title, body, tags) VALUES (?, ?, ?)').run(
    title.trim(), body.trim(), normalizedTags
  );
  res.redirect('/');
});

// Show single prompt
router.get('/prompts/:id', (req, res) => {
  const prompt = db.prepare('SELECT * FROM prompts WHERE id = ?').get(req.params.id);
  if (!prompt) return res.status(404).render('404');
  res.render('detail', { prompt, aiResponse: null });
});

// Show edit form
router.get('/prompts/:id/edit', (req, res) => {
  const prompt = db.prepare('SELECT * FROM prompts WHERE id = ?').get(req.params.id);
  if (!prompt) return res.status(404).render('404');
  res.render('edit', { prompt, error: null });
});

// Handle edit
router.post('/prompts/:id/edit', (req, res) => {
  const { title, body, tags } = req.body;
  if (!title || !body) {
    const prompt = db.prepare('SELECT * FROM prompts WHERE id = ?').get(req.params.id);
    return res.render('edit', { prompt, error: 'Title and body are required.' });
  }
  const normalizedTags = (tags || '').split(',').map(t => t.trim()).filter(Boolean).join(',');
  db.prepare('UPDATE prompts SET title = ?, body = ?, tags = ? WHERE id = ?').run(
    title.trim(), body.trim(), normalizedTags, req.params.id
  );
  res.redirect(`/prompts/${req.params.id}`);
});

// Handle delete
router.post('/prompts/:id/delete', (req, res) => {
  db.prepare('DELETE FROM prompts WHERE id = ?').run(req.params.id);
  res.redirect('/');
});

module.exports = router;
