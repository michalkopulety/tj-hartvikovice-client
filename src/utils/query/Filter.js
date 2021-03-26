export const FilterOperator = {
    "LTE": "$lte",
    "GTE": "$gte"
};

export class Filter {
    constructor({
        property,
        operator,
        value,
        filters,
        and
    }) {
        this.property = property;
        this.operator = operator;
        this.value = value;
        this.filters = filters;
        this.and = and || true;
    }

    toQueryString() {
        let query = "";

        if (this.filters) {
            query = this.filters.map(filter => filter.toQueryString()).join(this.and ? " and " : " or ");
        } else {
            query = `${this.property} ${this.operator} ${this.value}`
        }

        return query;
    }
}