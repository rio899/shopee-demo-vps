const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const shopifyRoutes = require('./routes/shopify');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const DEMO_USER = { username: 'demo', password: 'demo123' };
let isLoggedIn = false;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/shopify', shopifyRoutes);

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === DEMO_USER.username && password === DEMO_USER.password) {
    isLoggedIn = true;
    return res.redirect('/');
  }
  res.redirect('/login?error=1');
});

app.get('/', (req, res) => {
  if (!isLoggedIn) {
    return res.redirect('/login');
  }
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

app.listen(PORT, () => {
  console.log(`🛒 Shopify Demo Running on http://localhost:${PORT}`);
});
