module.exports.isAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
        next();
    } else {
        res.sendStatus(401);
    }
}