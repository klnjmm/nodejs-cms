const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');

router.all('/*', (request, response, next) => {
    request.app.locals.layout = 'admin';
    next();
});

router.get('/', (request, response) => {

    Post.find().then(posts => {
        response.render('admin/posts', {posts}); 
    });
});

module.exports = router;