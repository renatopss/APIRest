const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send({ error: 'Token não informado' });

    //formato de token = Bearer HEX
    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return res.status(401).send({ error: 'Erro no token' });

    const [ scheme, token ] = parts;

    if(!/^bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token sem formatação.' });

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) 
            return res.status(401).send({ erro: 'Token Inválido' });
        
        req.userId = decoded.id;
        return next();
    });
};
