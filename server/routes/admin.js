const { myQuery } = require('../config');
const onlyAdmin = require('../helpers/onlyAdmin');


const router = require('express').Router();

router.use(onlyAdmin);

router.put('/add', async (req, res) => {
    try {
        const { description, destination, fronDate, toDate, imgUrl, price } = req.body;

        if (!description || !destination || !fronDate || !toDate || !imgUrl || !price) {
            return res.send({ err: "missing some info" });
        }

        const query = `INSERT INTO vacations(description,destination,fronDate,toDate,imgUrl,price)
         VALUES("${description}","${destination}","${fronDate}","${toDate}","${imgUrl}",${price})`;

        await myQuery(query);

        const query1 = `SELECT * FROM vacations`;
        const vacations = await myQuery(query1);

        res.send(vacations);

    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

router.put('/edit/:id', async (req, res) => {
    try {
        const vacationId = req.params.id;

        const { description, destination, fronDate, toDate, imgUrl, price } = req.body;

        if (!description || !destination || !fronDate || !toDate || !imgUrl || !price) {
            return res.send({ err: "missing some info" });
        }

        const query = `UPDATE vacations
         SET
          description = "${description}",
          destination = "${destination}",
          fronDate = "${fronDate}",
          toDate = "${toDate}",
          imgUrl = "${imgUrl}",
          price = ${price}
          WHERE id = ${vacationId}`;

        await myQuery(query);


        const query1 = `SELECT * FROM vacations`;
        const vacations = await myQuery(query1);

        res.send(vacations);

    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {

        const vacationId = req.params.id;

        const query2 = `DELETE FROM likes WHERE vacationId = ${vacationId}`;
        await myQuery(query2);

        const query = `DELETE FROM vacations WHERE id = ${vacationId}`;
        await myQuery(query);

        const query1 = `SELECT * FROM vacations`;
        const vacations = await myQuery(query1);


        res.send(vacations);

    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

router.get('/reports', async (req, res) => {
    try {
        const query = `SELECT * FROM vacations WHERE followers > 0`;
        const vacations = await myQuery(query);

        if (!vacations.length) {
            return res.send({ msg: "no available vacations" });
        }
        else {
            return res.send(vacations);
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

module.exports = router