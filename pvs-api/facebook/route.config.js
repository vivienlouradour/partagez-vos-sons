const FacebookController = require('./controllers/facebook.controller');

exports.routesConfig = function (app) {
  // var todoList = require('../controllers/todoListController');

  // todoList Routes
  app.route('/')
    //   .get(todoList.list_all_tasks)
    .get(function (req, res) {
      res.json({ message: 'Coucou ! Je suis la route mère via le router' });
    });

  app.route('/test')
    .get(FacebookController.test);

  app.route('/getposts')
    .get(FacebookController.getPosts);

  app.route('/addpost')
    .get(FacebookController.addPost);

  app.route('/scrollnewposts')
    .get(FacebookController.scrollNewPosts);




  // app.route('/tasks/:taskId')
  //   .get(todoList.read_a_task)
  //   .put(todoList.update_a_task)
  //   .delete(todoList.delete_a_task);
};
