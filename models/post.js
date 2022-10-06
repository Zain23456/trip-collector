import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema ({
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  content: String,
}, {
  timestamps: true
})

const postSchema = new Schema({
  city: String,
  content: String,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  comments: [commentSchema],

})

const Post = mongoose.model('Post', postSchema)

export {
  Post
}