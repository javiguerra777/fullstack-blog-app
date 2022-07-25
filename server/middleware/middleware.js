// uncomment this to use the middleware

// app.use(async function verifyJwt(req, res, next) {
//   if (!req.headers.authorization) {
//     throw (401, {error: 'Invalid authorization'});
//   }

//   const [scheme, token] = req.headers.authorization.split(' ');

//   console.log('[scheme, token]', scheme, ' ', token);

//   if (scheme !== 'Bearer') {
//     throw (401, { error: 'Invalid authorization, invalid Bearer Token' })};
//   }

//   try {
//     const payload = jwt.verify(token, process.env.JWT_KEY);

//     console.log('payload', payload);

//     req.user = payload;
//   } catch (err) {
//     if (
//       err.message &&
//       (err.message.toUpperCase() === 'INVALID TOKEN' ||
//         err.message.toUpperCase() === 'JWT EXPIRED')
//     ) {
//       req.status = err.status || 500;
//       req.body = err.message;
//       req.app.emit('jwt-error', err, req);
//     } else {
//       throw (err.status || 500, err.message);
//     }
//     console.log(err);
//   }

//   await next();
// });
