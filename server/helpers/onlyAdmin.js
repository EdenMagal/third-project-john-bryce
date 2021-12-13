const onlyAdmin = (req, res, next) => {
    if (req.session.user?.role == 'admin') { 
        return next();
    }

    return res.send({ err: "only admins can acsess !" });
}

module.exports = onlyAdmin;
