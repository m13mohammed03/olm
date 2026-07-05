<%- include('layouts/main') %>

<!-- The body parameter needs to be handled if we use EJS includes properly. 
Wait, if I use `res.render('home', { layout: 'layouts/main' })` with `express-ejs-layouts`, it works that way.
But I didn't install `express-ejs-layouts`. Let me rewrite the templates to just include header and footer explicitly. -->
