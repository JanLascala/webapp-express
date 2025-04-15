function notFound(req, res, next) {
    res.status(404).json({
        error: "not found",
        message: "request not present in this server"
    });
}
module.exports = notFound;