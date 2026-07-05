module.exports = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        req.flash('error_msg', 'Please log in to view that resource');
        res.redirect('/auth/login');
    }
};
