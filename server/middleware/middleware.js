// uncomment this to use the middleware
const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
  if (!req.headers.authorization) {
    const error = {
      status: 401,
      error: 'Invalid authorization',
    };
    console.log(error.error);
    return res.status(401).json(error.error);
  }

  const [scheme, token] = req.headers.authorization.split(' ');

  console.log('[scheme, token]', scheme, ' ', token);

  if (scheme !== 'Bearer') {
    const error = {
      status: 401,
      error: 'Invalid authorization, invalid Bearer Token',
    };
    console.log(error.error);
    return res.status(401).json(error.error);
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_KEY);

    console.log('payload', payload);

    req.user = payload;
  } catch (err) {
    // if (
    //   err.message &&
    //   (err.message.toUpperCase() === 'INVALID TOKEN' ||
    //     err.message.toUpperCase() === 'JWT EXPIRED')
    // ) {
    //   req.status = err.status || 500;
    //   req.body = err.message;
    //   req.app.emit('jwt-error', err, req);
    // } else {
    //   throw (err.status || 500, err.message);
    // }
    console.log('Inavlid authorization', err.message);
    return res.status(err.status || 500).json(err.message);
  }

  await next();
  return true;
};
