const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const facebookPostSchema = new Schema({
  _id: String,
  message: String,
  url: String,
  urlDescription: String,
  comments: [String],
  creationDate: Date
});


const FacebookPostModel = mongoose.model('FacebookPosts', facebookPostSchema);

exports.findById = async (id) => {
  let post = await FacebookPostModel.findById(id);
  if(post != null){
    post = post.toJSON();
    console.log('post is not null');
    delete post.__v;
  }
  return post;
};

exports.createPost = (facebookPost) => {
  const facebookPostDb = new FacebookPostModel(facebookPost);
  return facebookPostDb.save();
};

exports.list = () => {
  return new Promise((resolve, reject) => {
    FacebookPostModel.find()
      .exec(function(err, posts){
        if(err){
          reject(err);
        }
        else{
          resolve(posts);
        }
      });
  });
};