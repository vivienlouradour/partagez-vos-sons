const request = require('request-promise');
const FacebookPostModel = require('../models/facebookPost.model');

exports.getPosts = async () => {
  console.log('Getting posts');

  const options = {
    method: 'GET',
    uri: `https://graph.facebook.com/v7.0/${process.env.FB_GROUP_ID}/feed?access_token=${process.env.FB_ACCESS_TOKEN}&fields=created_time,caption,comments,attachments,description,from,updated_time,message`,
    json: true
  };

  return request(options);
}

exports.scrollNewPosts = async () => {
  console.log('Scrolling for new posts');

  const defaultUrl = `https://graph.facebook.com/v7.0/${process.env.FB_GROUP_ID}/feed?access_token=${process.env.FB_ACCESS_TOKEN}&fields=created_time,caption,comments,attachments,description,from,updated_time,message`;

  
  let cpt = { nbPostInserted: 0, nbPostAlreadyInserted: 0 };
  let result = await performApiRequest(defaultUrl);
  console.log('first result ' + JSON.stringify(result));
  cpt.nbPostInserted += result.nbPostInserted;
  cpt.nbPostAlreadyInserted += result.nbPostAlreadyInserted;
  
  while(result.cpt.nbPostInserted > 0){
    await sleep(5000); //Avoid reaching facebook api request limit
    result = await performApiRequest(result.nextUrl);
    console.log('next result ' + JSON.stringify(result));
    cpt.nbPostInserted += result.nbPostInserted;
    cpt.nbPostAlreadyInserted += result.nbPostAlreadyInserted;
  }
  
  return cpt;
}

function sleep(ms){
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const performApiRequest = async (url) => {
  const options = {
    method: 'GET',
    uri: url,
    json: true
  };

  let result = await request(options);
  let posts = result.data;
  let nextUrl = result.paging.next;

  let cpt = await insertPostDb(posts);
  console.log('cpt : ' + JSON.stringify(cpt));
  return { cpt, nextUrl};
};

const insertPostDb = async (posts) => {
  let nbPostInserted = 0;
  let nbPostAlreadyInserted = 0;

  await Promise.all(posts.map(async (post) => {
    let dbPost = {
      _id: post.id,
      message: post.message,
      creationDate: post.created_time,
      comments: new Array()
    };
    if(post.attachments && post.attachments.data.length > 0){
      let attachmentData = post.attachments.data[0];
      dbPost.url = attachmentData.target?.url;
      dbPost.urlDescription = attachmentData?.description;
    }
    if(post.comments && post.comments.data.length > 0){
      post.comments.data.forEach((comment) => {
        dbPost.comments.push(comment.message);
      });
    }

    let existingPost = await FacebookPostModel.findById(dbPost._id);
    if(existingPost == null){
      nbPostInserted++;
      await FacebookPostModel.createPost(dbPost);
    }
    else{
      nbPostAlreadyInserted++;
    }
  }));

  return { nbPostInserted, nbPostAlreadyInserted};
};