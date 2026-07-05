module.exports = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        next();
    } else {
        req.flash('error_msg', 'Access denied');
        res.redirect('/');
    }
};
