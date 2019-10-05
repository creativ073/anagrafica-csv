const url = require('url');
const jwt = require('jsonwebtoken');

const withJwtAuth = (secret, whitelist, config = {}) => fn => {
    if (!secret) {
        throw Error('micro-jwt-auth must be initialized passing a secret to decode incoming JWT token')
    }

    if (!Array.isArray(whitelist)) {
        config = whitelist || {}
    }

    return (req, res) => {
        const bearerToken = req.headers.authorization;
        const pathname = url.parse(req.url).pathname;
        const whitelisted = Array.isArray(whitelist) && whitelist.indexOf(pathname) >= 0;

        console.log("req.headers.authorization", req.headers.authorization);
        console.log("bearerToken", bearerToken);

        if (!bearerToken && !whitelisted) {
            res.writeHead(401);
            res.end(config.resAuthMissing || 'missing Authorization header');
            return
        }

        try {
            const token = bearerToken.replace('Bearer ', '');
            console.log("token", token);
            req.jwt = jwt.verify(token, secret)
        } catch (err) {
            console.log("err", err);
            if (!whitelisted) {
                res.writeHead(401);
                res.end(config.resAuthInvalid || 'invalid token in Authorization header');
                return
            }
        }

        return fn(req, res)
    }
};

export default withJwtAuth;