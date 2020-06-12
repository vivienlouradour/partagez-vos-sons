const FacebookService = require('../../services/facebook.service');
const FacebookPostModel = require('../models/facebookPost.model');

exports.scrollNewPosts = (req, res) => {
  FacebookService.scrollNewPosts()
    .then((result) => {
      console.log(`Posts inserted : ${result.nbPostInserted} ; Posts already insterted : ${result.nbPostAlreadyInserted}`);
    })
    .catch(console.error);
    
    res.status(200).send('command submitted, facebook group will be scrolled.');
}