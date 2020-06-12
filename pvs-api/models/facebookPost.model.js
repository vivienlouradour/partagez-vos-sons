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

// schema.index({message: 'text', urlDescription: 'text'});


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

exports.list = (limit, skip, message) => {
  let query;
  if(message){
    query = FacebookPostModel
    .find({ message: { "$regex": message, "$options": "i" }});
  }
  else{
    query = FacebookPostModel
    .find();
  }
  return query
    .limit(limit)
    .skip(skip)
    .lean()
    .exec();
};

exports.count = (message) => {
  let query;
  if(message){
    query = FacebookPostModel
    .count({ message: { "$regex": message, "$options": "i" }});
  }
  else{
    query = FacebookPostModel
    .count();
  }
  return query;
};