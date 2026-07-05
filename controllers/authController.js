const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res) => {
    if (req.session.user) return res.redirect('/');
    res.render('auth/login', { title: 'Login - OLM SUYARI' });
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByEmail(email);
        if (!user) {
            req.flash('error_msg', 'Invalid credentials');
            return res.redirect('/auth/login');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            req.flash('error_msg', 'Invalid credentials');
            return res.redirect('/auth/login');
        }

        req.session.user = {
            id: user.id,
            name: user.name,
            role: user.role,
            email: user.email
        };

        req.flash('success_msg', 'You are now logged in');
        if (user.role === 'admin') {
            res.redirect('/admin');
        } else {
            res.redirect('/');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getRegister = (req, res) => {
    if (req.session.user) return res.redirect('/');
    res.render('auth/register', { title: 'Register - OLM SUYARI' });
};

exports.postRegister = async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    
    if (password !== confirm_password) {
        req.flash('error_msg', 'Passwords do not match');
        return res.redirect('/auth/register');
    }

    try {
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            req.flash('error_msg', 'Email already registered');
            return res.redirect('/auth/register');
        }

        await User.create(name, email, password, 'customer');
        req.flash('success_msg', 'Registration successful. You can now log in.');
        res.redirect('/auth/login');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};
