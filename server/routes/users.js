const { myQuery } = require('../config');

const router = require('express').Router();

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.send({ err: "missing some info" })
        }

        const query = `SELECT * FROM  users WHERE username = "${username}" AND password= "${password}"`;
        const user = await myQuery(query);

        if (user.length) {
            req.session.user = user[0];
            return res.send({ user: user[0] });
        }

        return res.status(400).send({ err: "wrong username or password" })

    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, username, password } = req.body;
        if (!firstName || !lastName || !username || !password) {
            return res.send({ err: "miissing some info" });
        }

        const query = `SELECT * FROM  users WHERE username = "${username}" AND password= "${password}"`;
        const user = await myQuery(query);

        if (user.length) {
            return res.send({ err: "username already exists, pick another one!" });
        }

        const query1 = `INSERT INTO users(firstName,lastName,username,password) VALUES ("${firstName}","${lastName}","${username}","${password}")`;
        await myQuery(query1);

        return res.send({ msg: "registered!" });

    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

router.delete('/logout', async (req, res) => {
    try {
        req.session.destroy();
        res.send({ msg: "logged out" });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

module.exports = router