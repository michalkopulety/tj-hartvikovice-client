const queryParser = {};

queryParser.prepareValue = (value) => {
    let foramtedValue = "";
    if (value.includes("Timestamp")) {
        let a = value.split(/[()]/)[1];
        return new Date(parseInt(a));
    }
};

queryParser.getFilters = (filters) => {
    let filter = {};

    if (filters) {
        let parts = filters.split(" and ");
        let filterObjects = parts.map((part) => {
            let [property, operator, value] = part.split(" ");
            return {
                property,
                operator,
                value: queryParser.prepareValue(value)
            };
        });
        filter.$and = filterObjects.map((a) => {
            return {
                [a.property]: {
                    [a.operator]: a.value
                }
            };
        })
    }
    return filter;
}

queryParser.getSelect = (select) => {
    return select ? {
        select: select.split(",").join(" ")
    } : undefined;
}

queryParser.parseQuery = (query) => {
    return {
        ...queryParser.getFilters(query.$filter),
        ...queryParser.getSelect(query.$select)
    }
};

module.exports = queryParser;