const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');

router.all('/*', (request, response, next) => {
    request.app.locals.layout = 'admin';
    next();
});

router.get('/', (request, response) => {

    Post.find().lean().then(posts => {
        response.render('admin/posts', {posts}); 
    });
});

router.get('/create', (request, response) => {
    response.render('admin/posts-create');
})

router.post('/create', (request, response) => {
    
    request.body.allowComments = !!request.body.allowComments && request.body.allowComments === 'on';
    const newPost = new Post(request.body);

    newPost.save().then(() => response.redirect('/admin/posts'));
})

module.exports = router;