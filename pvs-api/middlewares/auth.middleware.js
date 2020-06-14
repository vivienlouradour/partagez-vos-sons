const adminToken = process.env.API_ADMIN_TOKEN;

exports.adminPermissionRequired = (req, res, next) => {
  let reqToken = req.body?.auth_token;
  if(!reqToken || reqToken !== adminToken){
    console.log('unauthorized admin access');
    return res.status(403).send();
  }
  console.log('authorized admin access');
  return next();
};