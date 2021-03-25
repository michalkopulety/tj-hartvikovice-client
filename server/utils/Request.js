const {
    parseQuery
} = require("./parseQuery");

function DbConnectt(schema) {
    this.schema = schema;
};
DbConnectt.prototype.operation = function (context, operation) {
    this.schema.find({});
};

class DbConnect {
    constructor(schema) {
        this.schema = schema;
    }

    operation(context, fnName) {
        this.query = this.schema[fnName].call(context, {});
    }

    applyQuery(query, queryParameters) {
        let normalizedQueries = parseQuery(queryParameters);

        if (normalizedQueries.filter) {
            query.where(normalizedQueries.filter);
        }

        if (normalizedQueries.select) {
            query.select(normalizedQueries.select);
        }

        if (normalizedQueries.sort) {
            query.sort(normalizedQueries.sort);
        }

        if (normalizedQueries.top) {
            query.limit(normalizedQueries.top);
        }

        return new Promise((resolve, reject) => {
            query.exec((err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        });
    }
}

module.exports = DbConnect;