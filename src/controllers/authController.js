const express = require('express');

const User = require('../models/user');

const router = express.Router();

router.post('/register', async(req, res) =>{
   const {email} = req.body;
   
    try{
        if (await User.findOne({email}))//if informando validação de email para usuario.
            return res.status(400).send({error: 'Email ja Cadastrado!'});

        const user = await User.create(req.body);

        user.password = undefined;//retira visual de senha ao enviar o post ao BD

        return res.send({ User })
    } catch (err) {
        return res.status(400).send({ error: 'falha de registro! '});
    }
});

module.exports = app => app.use('/auth', router);