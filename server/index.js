const express = require('express');
const session = require('express-session');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(session({
    secret: 'project3',
    cookie: {
        maxAge: 60 * 1000 * 60
    }
}));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use('/users', require('./routes/users'));

app.use('/vacations', require('./routes/vacations'));

app.use('/admin', require('./routes/admin'));

app.listen(1000, (() => {
    console.log('up n runnin');
}));
