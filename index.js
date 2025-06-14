const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const shopifyRoutes = require('./routes/shopify');

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
    return res.redirect('/');
  }
  res.redirect('/login?error=1');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

app.listen(PORT, () => {
  console.log(`🛒 Shopify Demo Running on http://localhost:${PORT}`);
});
