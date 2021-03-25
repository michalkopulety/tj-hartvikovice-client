export const SortType = {
    "ASCENDING": "asc",
    "DESCENDING": "desc"
};

export class Sort {
    constructor({sorts, property, type}) {
        this.sorts = sorts;
        this.property = property;
        this.type = type;
    }

    toQueryString() {
        let query = "";
        if (this.sorts) {
            query = this.sorts.map(sort => {
                return sort.toQueryString()
            }).join(",");
        } else {
            query= `${this.property} ${this.type}`;
        }

        return query;
    } 
}