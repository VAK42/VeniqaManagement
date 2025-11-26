export const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    console.log('Access Denied: No Token Provided!');
    return res.status(403).send({ message: 'No Token Provided!' });
  }
  req.user = { email: 'admin@veniqa.com', permissions: ['superAdmin'] };
  next();
};
export const hasPermission = (permission) => {
  return (req, res, next) => {
    if (req.user.permissions.includes(permission) || req.user.permissions.includes('superAdmin')) {
      next();
    } else {
      console.log('Access Denied: Insufficient Permissions!');
      res.status(403).send({ message: 'Insufficient Permissions!' });
    }
  };
};