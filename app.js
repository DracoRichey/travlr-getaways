// Mongo / Mongoose
require('dotenv').config();
require('./app_api/models/db');

// app.js
const cors = require('cors');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { engine } = require('express-handlebars');

const app = express();

// ---------- CORS FIX (IMPORTANT) ----------
app.use(
  cors({
    origin: 'http://localhost:4200',        // Angular client
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Handle OPTIONS preflight requests
app.options('*', cors());

// ---------- Body Parsers ----------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------- Handlebars Setup ----------
app.engine('.hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'app_server', 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'app_server', 'views', 'partials'),
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'app_server', 'views'));

// ---------- Middleware ----------
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// Make year available globally for templates
app.use((req, res, next) => {
  res.locals.year = new Date().getFullYear();
  next();
});

// ---------- Routes ----------
const indexRouter = require('./app_server/routes/index');
const travelRouter = require('./app_server/routes/travel');
const apiRouter = require('./app_api/routes/index');

app.use('/', indexRouter);
app.use('/travel', travelRouter);
app.use('/api', apiRouter);

// ---------- Start Server ----------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Travlr running at http://localhost:${PORT}`);
});
