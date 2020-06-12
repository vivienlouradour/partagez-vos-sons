const FacebookService = require('../../services/facebook.service');
const FacebookPostModel = require('../models/facebookPost.model');

exports.test = (req, res) => {
  FacebookService.getPosts()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(console.error);
};

exports.scrollNewPosts = (req, res) => {
  FacebookService.scrollNewPosts()
    .then((result) => {
      console.log(`Posts inserted : ${result.nbPostInserted} ; Posts already insterted : ${result.nbPostAlreadyInserted}`);
    })
    .catch(console.error);
    res.status(200).send('command submitted')
}

exports.getPosts = (req, res) => {
  FacebookPostModel.list()
    .then((result) => {
      res.status(200).send(result);
    });
};

exports.addPost = (req, res) => {
  const post = createRandomPost();

  FacebookPostModel.createPost(post)
    .then((result) => {
      res.status(201).send({status: 'created', id: result.id});
    });
}

const createRandomPost = () => {
  return {
    _id: makeid(10),
    message: 'testPost ' + makeid(2),
    url: 'https://google.com',
    creationDate: '2020-01-01'
  };
  
  function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}


