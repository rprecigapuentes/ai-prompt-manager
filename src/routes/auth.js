const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.render('login', { error: 'Please enter username and password.' });
  }
  // Fake auth: any non-empty credentials are accepted
  res.redirect('/');
});

router.get('/logout', (req, res) => {
  res.redirect('/login');
});

module.exports = router;
