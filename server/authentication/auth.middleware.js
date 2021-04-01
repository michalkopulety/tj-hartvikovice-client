var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

module.exports = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://hartal.eu.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://hartal-portal.herokuapp.com/api',
    issuer: 'https://hartal.eu.auth0.com/',
    algorithms: ['RS256']
});