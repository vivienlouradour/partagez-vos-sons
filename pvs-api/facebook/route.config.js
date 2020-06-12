const FacebookController = require('./controllers/facebook.controller');
const PvsController = require('./controllers/pvs.controller');

exports.routesConfig = function (app) {
  app.route('/')
    .get(function (req, res) {
      res.json({ message: 'Default route not implemented' });
    });

    //TODO: protect this route or make cron task
  app.route('/scrollnewposts')
    .get(FacebookController.scrollNewPosts);

  app.route('/posts')
    .post(PvsController.list);

  app.route('/posts/:postId')
    .get(PvsController.getById);  

  // app.route('/tasks/:taskId')
  //   .get(todoList.read_a_task)
  //   .put(todoList.update_a_task)
  //   .delete(todoList.delete_a_task);
};
