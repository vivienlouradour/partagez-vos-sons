const FacebookController = require('./controllers/facebook.controller');
const PvsController = require('./controllers/pvs.controller');
const paginate = require('express-paginate');
const PaginationMiddleware = require('./middlewares/pagination.middleware');

exports.routesConfig = function (app) {
  app.use(paginate.middleware(10, 50));

  app.route('/')
    .get(function (req, res) {
      res.json({ message: 'Default route not implemented' });
    });

    //TODO: protect this route or make cron task
  app.get('/scrollnewposts', 
    FacebookController.scrollNewPosts
  );
    
  app.get('/posts', [
    PaginationMiddleware.ensurePaginationLimit,
    PvsController.list
  ]);
    

  app.route('/posts/:postId')
    .get(PvsController.getById);  

  // app.route('/tasks/:taskId')
  //   .get(todoList.read_a_task)
  //   .put(todoList.update_a_task)
  //   .delete(todoList.delete_a_task);
};
