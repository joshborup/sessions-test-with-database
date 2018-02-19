const app = require('express')();
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
require('dotenv').config();
var pgSession = require('connect-pg-simple')(session);
var pg = require('pg');
const middle = require('./middleware/setInitialSession');
pg.defaults.ssl = true;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING).then(db => {
    console.log('connection made')
    app.set('db', db);
})

app.use(session({
    store: new pgSession({
        conString : process.env.CONNECTION_STRING,
     }),
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 100000
    }

}))

app.post('/api/josh', middle.setInitialSession);

const port = 4000;
app.listen(port, ()=> console.log(`running on port ${port}`));
