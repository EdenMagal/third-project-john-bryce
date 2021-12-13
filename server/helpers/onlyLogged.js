const onlyLogged = (req, res, next) => {
    if (req.session.user) {
        return next();
    }

    return res.send({ err: "only logged users can acsess !" });
}

module.exports = onlyLogged;