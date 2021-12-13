const onlyUsers = (req, res, next) => {
    if (req.session.user?.role == 'user') { 
        return next();
    }

    return res.send({ err: "only users can do that !" });
}

module.exports = onlyUsers;