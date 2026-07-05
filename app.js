const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();

const app = express();

// EJS Setup
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

// Connect Flash
app.use(flash());

const Setting = require('./models/Setting');

// Global cache for settings to avoid DB query on every request
let globalSettingsCache = null;

// Global Variables for views
app.use(async (req, res, next) => {
    try {
        if (!globalSettingsCache) {
            globalSettingsCache = await Setting.getAll();
        }
        res.locals.settings = globalSettingsCache;
    } catch (err) {
        console.error("Failed to load settings:", err);
        res.locals.settings = {};
    }

    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.session.user || null;
    res.locals.cartItemCount = req.session.cart ? req.session.cart.reduce((total, item) => total + item.quantity, 0) : 0;
    
    // Allow routes to invalidate cache
    req.invalidateSettingsCache = () => { globalSettingsCache = null; };
    
    next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/shop'));
app.use('/auth', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
