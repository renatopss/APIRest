const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//confirmação se sistema esta acessando a porta
/*app.get('/', (req, res) => {
    res.send('ok')
})*/


require('./controllers/authController')(app);
require('./controllers/projectController')(app);

app.listen(3000, () => console.log('Online...'));