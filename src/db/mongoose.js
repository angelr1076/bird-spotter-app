dbPassword =
    process.env.MONGODB_URL;

module.exports = {
    mongoURI: dbPassword,
};