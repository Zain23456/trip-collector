import mongoose from 'mongoose'

const Schema = mongoose.Schema

const postSchema = new Schema({
  city: String,
  content: String,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}

})

const Post = mongoose.model('Post', postSchema)

export {
  Post
}