const env = process.env;
module.exports = {
    db: `mongodb+srv://${env.MONGO_DB_USER}:${env.MONGO_DB_PASSWORD}@${env.MONGO_DB_HOST}/${env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
};