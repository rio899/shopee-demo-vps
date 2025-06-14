const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const shopifyRoutes = require('./routes/shopify');

// Simple helper to parse cookies from request headers
function parseCookies(cookieHeader = '') {
  return cookieHeader.split(';').reduce((acc, pair) => {
    const [key, ...v] = pair.trim().split('=');
    if (!key) return acc;
    acc[key] = decodeURIComponent(v.join('='));
    return acc;
  }, {});
}

function checkAuth(req, res, next) {
  const cookies = parseCookies(req.headers.cookie);
  if (cookies.loggedIn === 'true') {
    return next();
  }
  res.redirect('/login');
}

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/shopify', shopifyRoutes);

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'trial@neurolynx.ai' && password === 'test123') {
    res.cookie('loggedIn', 'true', { httpOnly: true });
    return res.redirect('/');
  }
  res.redirect('/login?error=1');
});

app.get('/logout', (req, res) => {
  res.cookie('loggedIn', '', { expires: new Date(0) });
  res.redirect('/login');
});

app.get('/', checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

app.listen(PORT, () => {
  console.log(`🛒 Shopify Demo Running on http://localhost:${PORT}`);
});
