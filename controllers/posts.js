import { Post } from '../models/post.js'
import { Profile } from '../models/profile.js'

function newPost(req, res) {
  res.render('posts/new', {
  title: 'Add Post'
  })
}

function createPost(req, res) {
  
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
  .populate('owner')
  .then(posts => {
    res.render('posts/index', {
      posts,
      title: 'Posts',
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function showPost(req, res) {
  console.log(req.params.id)
  Post.findById(req.params.id)
  .populate([{
    path: 'owner'
  }, {
    path: 'comments',
    populate: { path: 'owner'}
  }
])
  .then(post => {
    res.render('posts/show', {
      title: 'Post Details',
      post
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/posts')
  })
}

function createComment(req, res) {
  Post.findById(req.params.id)
  .populate('owner')
  .then(post => {
    req.body.owner = req.user.profile._id
    post.comments.push(req.body)
    post.save()
    .then(() => {
      res.redirect('/posts')
    })
    .catch(error => {
      console.log(error)
      res.redirect('/posts')
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/posts')
  })
}

function editPost(req, res) {
  Post.findById(req.params.id)
  .then(post => {
    res.render('posts/edit', {
      post,
      title: "Edit Post"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function updatePost(req, res) {
  Post.findByIdAndUpdate(req.params.id, req.body)
  .then(post => {
    if(post.owner.equals(req.user.profile._id)) {post.updateOne(req.body)
      .then(() => {
        res.redirect(`/posts/${post._id}`)
      })
    } else {
      throw new Error ('USER is UNAUTHORIZED')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deletePost(req, res) {
  Post.findById(req.params.id)
  .then(post => {
    if (post.owner.equals(req.user.profile._id)) {
      post.delete()
      .then(() => {
        res.redirect('/posts')
      })
    } else {
      throw new Error ('🚫 Not authorized 🚫')
    }   
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
newPost as new,
createPost as create,
index,
showPost as show,
editPost as edit,
updatePost as update,
deletePost as delete,
createComment
}