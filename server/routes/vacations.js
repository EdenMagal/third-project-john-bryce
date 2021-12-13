const { myQuery } = require('../config');
const onlyLogged = require('../helpers/onlyLogged');
const onlyUsers = require('../helpers/onlyUsers');

const router = require('express').Router();

router.use(onlyLogged);

router.get('/', async (req, res) => {
    try {
        const userId = req.session.user.id;

        const query1 = `SELECT * FROM likes INNER JOIN vacations ON likes.vacationId = vacations.id WHERE likes.userId = ${userId}`;
        const followed = await myQuery(query1);

        const query2 = `SELECT * FROM vacations`;
        const allVacations = await myQuery(query2);

        if (followed.length) {
            const followedId = followed.map(vacation => { return vacation.id });

            const notFollowed = allVacations.filter(vacation => !followedId.includes(vacation.id));

            const sorted = [...followed, ...notFollowed];
            return res.send(sorted);
        }
        else {
            return res.send(allVacations);
        }

    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

router.get('/isFollowing/:id', async (req, res) => {
    const userId = req.session.user.id;
    const vacationId = req.params.id;

    const query = `SELECT * FROM likes WHERE userId=${userId} AND vacationId = ${vacationId}`;
    const vacation = await myQuery(query);

    if (vacation.length) {
        return res.send({ following: true })
    }
    else {
        return res.send({ following: false });
    }

});

router.put('/follow/:id',onlyUsers, async (req, res) => {
    try {
        const userId = req.session.user.id;
        const vacationId = req.params.id;

        const query = `SELECT * FROM likes WHERE userId = ${userId} AND vacationId = ${vacationId}`;
        const like = await myQuery(query);

        if (!like.length) {
            const query1 = `UPDATE vacations SET followers = followers + 1 WHERE id = ${vacationId}`;
            await myQuery(query1);

            const query2 = `INSERT INTO likes(userId,vacationId) VALUES (${userId},${vacationId})`;
            await myQuery(query2);
        }
        else {
            const query1 = `UPDATE vacations SET followers = followers - 1 WHERE id = ${vacationId}`;
            await myQuery(query1);

            const query2 = `DELETE FROM likes WHERE userId = ${userId} AND vacationId = ${vacationId}`;
            await myQuery(query2);
        }

        const query1 = `SELECT * FROM likes INNER JOIN vacations ON likes.vacationId = vacations.id WHERE likes.userId = ${userId}`;
        const followed = await myQuery(query1);

        const query2 = `SELECT * FROM vacations`;
        const allVacations = await myQuery(query2);

        if (followed.length) {
            const followedId = followed.map(vacation => { return vacation.id });

            const notFollowed = allVacations.filter(vacation => !followedId.includes(vacation.id));

            const sorted = [...followed, ...notFollowed];
            return res.send(sorted);
        }
        else {
            return res.send(allVacations);
        }


    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

router.get('/search/:destination', async (req, res) => {
    try {
        const destination = req.params.destination;


        if (!destination) {
            return res.send({ err: "missing some info" });
        }

        const query = `SELECT * FROM vacations WHERE destination LIKE "%${destination}%"`;
        const vacation = await myQuery(query);


        if (vacation.length) {
            res.send(vacation);
        }
        else {
            return res.send({ err: "not found" });
        }
    } catch (err) {
        res.send(err);
    }
})


module.exports = router