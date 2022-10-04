import { Post } from '../models/post.js'
import { Profile } from '../models/profile.js'

function newPost(req, res) {
  res.render('posts/new', {
  title: 'Add Post'
  })
}

function createPost(req, res) {
  console.log(req.user)
  req.body.owner = req.user.profile._id
  Post.create(req.body)
  .then(post => {
    console.log(post)
    res.redirect('/posts')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/posts/new')
  })
}

function index(req, res) {
  Post.find({})
  .then(posts => {
    res.render('posts/index', {
      posts,
      title: 'Feed',
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/posts')
  })
}

export {
newPost as new,
createPost as create,
index
}