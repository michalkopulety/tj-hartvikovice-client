const queryParser = {};

queryParser.prepareValue = (value) => {
    let foramtedValue = "";
    if (value.includes("Timestamp")) {
        let a = value.split(/[()]/)[1];
        return new Date(parseInt(a));
    } else {
        return value.split(/['']/)[1];
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

        if (filterObjects.length === 1) {
            filter = {
                [filterObjects[0].property]: {
                    [filterObjects[0].operator]: filterObjects[0].value
                }
            }
        } else {
            filter.$and = filterObjects.map((a) => {
                return {
                    [a.property]: {
                        [a.operator]: a.value
                    }
                };
            })
        }

    }
    return {
        filter: filter
    };
};

queryParser.getSelect = (select) => {
    return select ? {
        select: select.split(",").join(" ")
    } : undefined;
};

queryParser.getSort = (sort) => {
    let normalizedSort;

    if (sort) {
        normalizedSort = sort.split(",").reduce((acc, query) => {
            let [field, type] = query.split(" ");
            return acc.concat({
                [field]: type
            });
        }, []);
    }

    return {
        sort: normalizedSort
    };
};

queryParser.getTop = (top) => {
    return top ? {
        top: parseInt(top)
    } : undefined;
};

queryParser.getExpand = (expand) => {
    return expand ? {
        expand: expand
    } : undefined;
}

queryParser.parseQuery = (query) => {
    return {
        ...queryParser.getFilters(query.$filter),
        ...queryParser.getSelect(query.$select),
        ...queryParser.getSort(query.$sort),
        ...queryParser.getTop(query.$top),
        ...queryParser.getExpand(query.$expand)
    }
};

module.exports = queryParser;