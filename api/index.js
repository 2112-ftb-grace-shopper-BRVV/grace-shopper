const apiRouter = require('express').Router();

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  console.log("is it healthy?")
  res.send({
    healthy: true,
  });
});

apiRouter.use('/cart', require('./cart'));

apiRouter.use('/user', require('./user'))
// place your routers here

module.exports = apiRouter;
